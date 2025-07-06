import { GeneratedComponent, TestOutput } from '../../../types/figma';
import { EnterpriseGenerationConfig } from '../core/ConfigurationManager';

export class TestGenerator {
  private config: EnterpriseGenerationConfig;

  constructor(config: EnterpriseGenerationConfig) {
    this.config = config;
  }

  async generateTests(components: GeneratedComponent[]): Promise<TestOutput> {
    if (!this.config.enableTesting) {
      return {
        unitTests: {},
        integrationTests: {},
        e2eTests: {},
        accessibilityTests: {}
      };
    }

    const unitTests = this.generateUnitTests(components);
    const integrationTests = this.generateIntegrationTests(components);
    const e2eTests = this.generateE2ETests(components);
    const accessibilityTests = this.generateAccessibilityTests(components);

    return {
      unitTests,
      integrationTests,
      e2eTests,
      accessibilityTests
    };
  }

  private generateUnitTests(components: GeneratedComponent[]): Record<string, string> {
    const tests: Record<string, string> = {};
    
    components.forEach(component => {
      if (this.config.framework === 'react') {
        tests[`${component.name}.test.tsx`] = this.generateReactUnitTest(component);
      } else if (this.config.framework === 'vue') {
        tests[`${component.name}.test.ts`] = this.generateVueUnitTest(component);
      } else if (this.config.framework === 'angular') {
        tests[`${component.name.toLowerCase()}.component.spec.ts`] = this.generateAngularUnitTest(component);
      }
    });

    return tests;
  }

  private generateReactUnitTest(component: GeneratedComponent): string {
    return `import { render, screen } from '@testing-library/react';
import { ${component.name} } from './${component.name}';

describe('${component.name}', () => {
  it('renders without crashing', () => {
    render(<${component.name} />);
  });

  it('has correct accessibility attributes', () => {
    render(<${component.name} />);
    // Add specific accessibility tests based on component type
  });

  ${this.generateComponentSpecificTests(component)}

  it('matches snapshot', () => {
    const { container } = render(<${component.name} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});`;
  }

  private generateVueUnitTest(component: GeneratedComponent): string {
    return `import { mount } from '@vue/test-utils';
import ${component.name} from './${component.name}.vue';

describe('${component.name}', () => {
  it('renders properly', () => {
    const wrapper = mount(${component.name});
    expect(wrapper.text()).toBeTruthy();
  });

  it('has correct structure', () => {
    const wrapper = mount(${component.name});
    expect(wrapper.find('.${component.name.toLowerCase()}')).toBeTruthy();
  });
});`;
  }

  private generateAngularUnitTest(component: GeneratedComponent): string {
    return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${component.name}Component } from './${component.name.toLowerCase()}.component';

describe('${component.name}Component', () => {
  let component: ${component.name}Component;
  let fixture: ComponentFixture<${component.name}Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ${component.name}Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(${component.name}Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});`;
  }

  private generateComponentSpecificTests(component: GeneratedComponent): string {
    switch (component.metadata.componentType) {
      case 'button':
        return `
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<${component.name} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports disabled state', () => {
    render(<${component.name} disabled />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });`;

      case 'input':
        return `
  it('accepts user input', () => {
    render(<${component.name} />);
    
    const input = screen.getByRole('textbox');
    input.type('test input');
    
    expect(input.value).toBe('test input');
  });`;

      case 'card':
        return `
  it('displays content correctly', () => {
    const testContent = 'Test card content';
    render(<${component.name}>{testContent}</${component.name}>);
    
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });`;

      default:
        return `
  it('displays correctly', () => {
    render(<${component.name} />);
    expect(screen.getByTestId('${component.name.toLowerCase()}')).toBeInTheDocument();
  });`;
    }
  }

  private generateIntegrationTests(components: GeneratedComponent[]): Record<string, string> {
    return {
      'components.integration.test.tsx': `import { render, screen } from '@testing-library/react';
${components.map(c => `import { ${c.name} } from './${c.name}';`).join('\n')}

describe('Component Integration Tests', () => {
  it('components render together without conflicts', () => {
    render(
      <div>
        ${components.slice(0, 3).map(c => `<${c.name} />`).join('\n        ')}
      </div>
    );
    
    // Verify all components rendered
    ${components.slice(0, 3).map(c => `expect(screen.getByTestId('${c.name.toLowerCase()}')).toBeInTheDocument();`).join('\n    ')}
  });

  it('maintains consistent styling across components', () => {
    // Add integration tests for styling consistency
  });
});`
    };
  }

  private generateE2ETests(components: GeneratedComponent[]): Record<string, string> {
    if (this.config.framework === 'react') {
      return {
        'components.e2e.spec.ts': `import { test, expect } from '@playwright/test';

test.describe('Component E2E Tests', () => {
  test('components load and function correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test component interactions
    ${components.filter(c => c.metadata.componentType === 'button').map(c => `
    await page.click('[data-testid="${c.name.toLowerCase()}"]');
    await expect(page.locator('[data-testid="${c.name.toLowerCase()}"]')).toBeVisible();`).join('')}
  });

  test('responsive design works correctly', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verify mobile layout
    ${components.slice(0, 2).map(c => `await expect(page.locator('[data-testid="${c.name.toLowerCase()}"]')).toBeVisible();`).join('\n    ')}
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Verify desktop layout
    ${components.slice(0, 2).map(c => `await expect(page.locator('[data-testid="${c.name.toLowerCase()}"]')).toBeVisible();`).join('\n    ')}
  });
});`
      };
    }

    return {};
  }

  private generateAccessibilityTests(components: GeneratedComponent[]): Record<string, string> {
    if (!this.config.enforceAccessibility) {
      return {};
    }

    return {
      'accessibility.test.tsx': `import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
${components.map(c => `import { ${c.name} } from './${c.name}';`).join('\n')}

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  ${components.map(component => `
  it('${component.name} has no accessibility violations', async () => {
    const { container } = render(<${component.name} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });`).join('\n')}

  it('all components support keyboard navigation', async () => {
    const { container } = render(
      <div>
        ${components.slice(0, 3).map(c => `<${c.name} />`).join('\n        ')}
      </div>
    );
    
    const results = await axe(container, {
      rules: {
        'keyboard': { enabled: true }
      }
    });
    
    expect(results).toHaveNoViolations();
  });
});`
    };
  }
}