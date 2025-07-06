import { GeneratedComponent, DocumentationOutput } from '../../../types/figma';
import { DesignTokens } from '../core/GenerationOrchestrator';
import { EnterpriseGenerationConfig } from '../core/ConfigurationManager';

export class DocumentationGenerator {
  private config: EnterpriseGenerationConfig;

  constructor(config: EnterpriseGenerationConfig) {
    this.config = config;
  }

  async generateDocumentation(components: GeneratedComponent[], designTokens: DesignTokens): Promise<DocumentationOutput> {
    const readme = this.generateReadme(components, designTokens);
    const componentDocs = this.generateComponentDocumentation(components);
    const designGuidelines = this.generateDesignGuidelines(designTokens);
    const usageExamples = this.generateUsageExamples(components);

    return {
      readme,
      componentDocs,
      designGuidelines,
      usageExamples
    };
  }

  private generateReadme(components: GeneratedComponent[], designTokens: DesignTokens): string {
    return `# Generated Component Library

## Overview
This component library was generated from Figma designs using the Enterprise Figma-to-Code Generator.

## Components
${components.map(c => `- **${c.name}**: ${this.getComponentDescription(c)}`).join('\n')}

## Design System
- **Colors**: ${designTokens.colors.length} tokens
- **Typography**: ${designTokens.typography.length} tokens  
- **Spacing**: ${designTokens.spacing.length} tokens
- **Shadows**: ${designTokens.shadows.length} tokens

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`${this.config.framework === 'react' ? 'jsx' : 'html'}
${this.generateQuickStartExample(components[0])}
\`\`\`

## Framework
- **Framework**: ${this.config.framework}
- **Styling**: ${this.config.styling}
- **TypeScript**: ${this.config.typescript ? 'Enabled' : 'Disabled'}

## Features
- ✅ Responsive design
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Performance optimized
- ✅ TypeScript support
${this.config.enableThemeSupport ? '- ✅ Theme support' : ''}
${this.config.enableI18n ? '- ✅ Internationalization' : ''}
${this.config.enableTesting ? '- ✅ Unit tests included' : ''}
${this.config.enableStorybook ? '- ✅ Storybook stories' : ''}
`;
  }

  private generateComponentDocumentation(components: GeneratedComponent[]): Record<string, string> {
    const docs: Record<string, string> = {};
    
    components.forEach(component => {
      docs[component.name] = `# ${component.name}

## Description
${this.getComponentDescription(component)}

## Props
${this.generatePropsDocumentation(component)}

## Usage
\`\`\`${this.config.framework === 'react' ? 'jsx' : 'html'}
${this.generateComponentUsageExample(component)}
\`\`\`

## Accessibility
- **Score**: ${component.accessibility.score}/100
- **WCAG Compliance**: ${component.accessibility.wcagCompliance}
${component.accessibility.suggestions.map(s => `- ${s}`).join('\n')}

## Responsive Design
- **Mobile**: ${component.responsive.mobile || 'Responsive'}
- **Tablet**: ${component.responsive.tablet || 'Responsive'}
- **Desktop**: ${component.responsive.desktop || 'Responsive'}

## Generated Info
- **Figma Node ID**: ${component.metadata.figmaNodeId}
- **Component Type**: ${component.metadata.componentType}
- **Complexity**: ${component.metadata.complexity}
- **Estimated Accuracy**: ${component.metadata.estimatedAccuracy}%
`;
    });

    return docs;
  }

  private generateDesignGuidelines(designTokens: DesignTokens): string {
    return `# Design Guidelines

## Color Palette
${designTokens.colors.map(color => `- **${color.name}**: \`${color.value}\` - ${color.description}`).join('\n')}

## Typography Scale
${designTokens.typography.map(typo => `- **${typo.name}**: ${typo.fontSize}, ${typo.fontWeight}, ${typo.fontFamily}`).join('\n')}

## Spacing System
${designTokens.spacing.map(spacing => `- **${spacing.name}**: \`${spacing.value}\` - ${spacing.description}`).join('\n')}

## Shadow System
${designTokens.shadows.map(shadow => `- **${shadow.name}**: \`${shadow.value}\` - ${shadow.description}`).join('\n')}

## Usage Guidelines
1. **Colors**: Always use semantic color tokens instead of hardcoded values
2. **Typography**: Follow the established type scale for consistency
3. **Spacing**: Use the spacing system for margins, padding, and gaps
4. **Shadows**: Apply shadows consistently using the defined tokens

## Best Practices
- Use HSL color values for better theme support
- Implement proper semantic HTML structure
- Ensure keyboard navigation is available
- Test with screen readers for accessibility
- Follow the component composition patterns
`;
  }

  private generateUsageExamples(components: GeneratedComponent[]): string {
    const examples = components.slice(0, 5).map(component => {
      return `## ${component.name}
\`\`\`${this.config.framework === 'react' ? 'jsx' : 'html'}
${this.generateComponentUsageExample(component)}
\`\`\``;
    }).join('\n\n');

    return `# Usage Examples

${examples}

## Composition Examples
\`\`\`${this.config.framework === 'react' ? 'jsx' : 'html'}
${this.generateCompositionExample(components)}
\`\`\`
`;
  }

  private getComponentDescription(component: GeneratedComponent): string {
    const typeDescriptions = {
      button: 'Interactive button component',
      card: 'Card container component',
      text: 'Text display component',
      input: 'Form input component',
      layout: 'Layout container component',
      complex: 'Complex UI component'
    };

    return typeDescriptions[component.metadata.componentType] || 'UI component';
  }

  private generatePropsDocumentation(component: GeneratedComponent): string {
    if (!component.typescript) {
      return 'No TypeScript definitions available.';
    }

    // Extract props from TypeScript interface
    const interfaceMatch = component.typescript.match(/interface.*Props\s*{([^}]*)}/s);
    if (interfaceMatch) {
      const propsContent = interfaceMatch[1];
      const props = propsContent
        .split('\n')
        .filter(line => line.trim() && !line.trim().startsWith('//'))
        .map(line => {
          const match = line.match(/(\w+)\??\s*:\s*([^;]+)/);
          if (match) {
            const [, name, type] = match;
            const isOptional = line.includes('?');
            return `| ${name} | \`${type.trim()}\` | ${isOptional ? 'Optional' : 'Required'} |`;
          }
          return '';
        })
        .filter(Boolean);

      if (props.length > 0) {
        return `| Prop | Type | Required |
|------|------|----------|
${props.join('\n')}`;
      }
    }

    return 'No props defined.';
  }

  private generateComponentUsageExample(component: GeneratedComponent): string {
    if (this.config.framework === 'react') {
      return `<${component.name} />`;
    } else if (this.config.framework === 'vue') {
      return `<${component.name} />`;
    } else {
      return `<app-${component.name.toLowerCase()}></app-${component.name.toLowerCase()}>`;
    }
  }

  private generateQuickStartExample(component: GeneratedComponent): string {
    if (!component) return '';
    return this.generateComponentUsageExample(component);
  }

  private generateCompositionExample(components: GeneratedComponent[]): string {
    if (components.length === 0) return '';
    
    const layoutComponent = components.find(c => c.metadata.componentType === 'layout');
    const buttonComponent = components.find(c => c.metadata.componentType === 'button');
    const cardComponent = components.find(c => c.metadata.componentType === 'card');

    if (this.config.framework === 'react') {
      return `<${layoutComponent?.name || 'Layout'}>
  <${cardComponent?.name || 'Card'}>
    <h2>Component Composition</h2>
    <p>This example shows how components work together.</p>
    <${buttonComponent?.name || 'Button'}>Click me</Button>
  </${cardComponent?.name || 'Card'}>
</${layoutComponent?.name || 'Layout'}>`;
    }

    return 'Composition example not available for this framework.';
  }
}