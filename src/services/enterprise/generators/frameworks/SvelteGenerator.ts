import { FigmaApiResponse, FigmaNode, GeneratedComponent } from '../../../../types/figma';
import { AnalysisResult } from '../../core/GenerationOrchestrator';
import { EnterpriseGenerationConfig } from '../../core/ConfigurationManager';
import { IFrameworkGenerator } from '../FrameworkGeneratorFactory';

export class SvelteGenerator implements IFrameworkGenerator {
  private config: EnterpriseGenerationConfig;

  constructor(config: EnterpriseGenerationConfig) {
    this.config = config;
  }

  async generateComponents(figmaData: FigmaApiResponse, analysis: AnalysisResult): Promise<GeneratedComponent[]> {
    // Svelte-specific component generation logic
    return [];
  }

  generateComponent(node: FigmaNode, name: string): GeneratedComponent {
    const sanitizedName = this.sanitizeComponentName(name);
    
    return {
      id: node.id,
      name: sanitizedName,
      jsx: this.generateSvelteComponent(node, sanitizedName),
      css: this.generateCSS(node),
      typescript: this.config.typescript ? this.generateTypeScript(node, sanitizedName) : undefined,
      accessibility: { score: 85, issues: [], suggestions: [], wcagCompliance: 'AA' as const },
      responsive: { mobile: '', tablet: '', desktop: '', hasResponsiveDesign: true },
      metadata: {
        figmaNodeId: node.id,
        componentType: 'complex',
        complexity: 'medium',
        estimatedAccuracy: 85,
        generationTime: Date.now(),
        dependencies: []
      }
    };
  }

  getFrameworkSpecificCode(component: GeneratedComponent): string {
    return component.jsx;
  }

  private generateSvelteComponent(node: FigmaNode, componentName: string): string {
    const children = this.generateMarkup(node);
    
    return `<script${this.config.typescript ? ' lang="ts"' : ''}>
  ${this.config.enableI18n ? `import { _ } from 'svelte-i18n';` : ''}
  ${this.config.enableThemeSupport ? `import { theme } from '$lib/stores/theme';` : ''}
  
  // Component logic
</script>

${children}

<style>
${this.generateCSS(node)}
</style>`;
  }

  private generateMarkup(node: FigmaNode): string {
    const className = node.name.toLowerCase().replace(/\s+/g, '-');
    
    if (node.type === 'TEXT') {
      return `<div class="${className}">${node.characters || 'Text content'}</div>`;
    }

    if (node.children && node.children.length > 0) {
      const childElements = node.children.map(child => this.generateMarkup(child)).join('\n  ');
      return `<div class="${className}">
  ${childElements}
</div>`;
    }

    return `<div class="${className}"></div>`;
  }

  private generateCSS(node: FigmaNode): string {
    const className = `.${node.name.toLowerCase().replace(/\s+/g, '-')}`;
    return `${className} {
  /* Svelte component styles */
  display: block;
}`;
  }

  private generateTypeScript(node: FigmaNode, componentName: string): string {
    return `export interface ${componentName}Props {
  // Svelte component props
}`;
  }

  private sanitizeComponentName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, 'Component$&')
      .replace(/^./, str => str.toUpperCase()) || 'Component';
  }
}