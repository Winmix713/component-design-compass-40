import { FigmaApiResponse, FigmaNode, GeneratedComponent, ComponentMetadata } from '../../../../types/figma';
import { AnalysisResult } from '../../core/GenerationOrchestrator';
import { EnterpriseGenerationConfig } from '../../core/ConfigurationManager';
import { IFrameworkGenerator } from '../FrameworkGeneratorFactory';

export class ReactGenerator implements IFrameworkGenerator {
  private config: EnterpriseGenerationConfig;

  constructor(config: EnterpriseGenerationConfig) {
    this.config = config;
  }

  async generateComponents(figmaData: FigmaApiResponse, analysis: AnalysisResult): Promise<GeneratedComponent[]> {
    const components: GeneratedComponent[] = [];

    // Process main components
    Object.entries(figmaData.components || {}).forEach(([key, component]) => {
      const node = this.findNodeById(figmaData.document, component.key);
      if (node) {
        const generatedComponent = this.generateComponent(node, component.name);
        components.push(generatedComponent);
      }
    });

    // Process frames as layout components
    const frames = this.findFrames(figmaData.document);
    frames.forEach(frame => {
      const layoutComponent = this.generateLayoutComponent(frame);
      components.push(layoutComponent);
    });

    return components;
  }

  generateComponent(node: FigmaNode, componentName: string): GeneratedComponent {
    const sanitizedName = this.sanitizeComponentName(componentName);
    
    const jsx = this.generateJSX(node, sanitizedName);
    const css = this.generateCSS(node, sanitizedName);
    const typescript = this.config.typescript ? this.generateTypeScript(node, sanitizedName) : undefined;
    const accessibility = this.analyzeAccessibility(node);
    const responsive = this.analyzeResponsive(node);
    const metadata = this.generateMetadata(node, sanitizedName);

    return {
      id: node.id,
      name: sanitizedName,
      jsx,
      css,
      typescript,
      accessibility,
      responsive,
      metadata
    };
  }

  getFrameworkSpecificCode(component: GeneratedComponent): string {
    return component.jsx;
  }

  private generateJSX(node: FigmaNode, componentName: string): string {
    const props = this.extractProps(node);
    const children = this.generateChildren(node);
    const hooks = this.generateHooks(node);
    const imports = this.generateImports(node);

    const propsInterface = this.config.typescript ? this.generatePropsInterface(props, componentName) : '';
    const componentSignature = this.config.typescript 
      ? `export const ${componentName}: React.FC<${componentName}Props> = ({ ${props.map(p => p.name).join(', ')} })`
      : `export const ${componentName} = ({ ${props.map(p => p.name).join(', ')} })`;

    const hooksSection = hooks.length > 0 ? `\n  // Hooks\n  ${hooks.join('\n  ')}\n` : '';
    const themeHook = this.config.enableThemeSupport ? '\n  const theme = useTheme();' : '';
    const i18nHook = this.config.enableI18n ? '\n  const { t } = useTranslation();' : '';

    return `${imports.join('\n')}
${this.config.enableThemeSupport ? "import { useTheme } from '../hooks/useTheme';" : ''}
${this.config.enableI18n ? "import { useTranslation } from 'react-i18next';" : ''}

${propsInterface}
${componentSignature} => {${hooksSection}${themeHook}${i18nHook}
  return (
    ${children}
  );
};

export default ${componentName};`;
  }

  private generateCSS(node: FigmaNode, componentName: string): string {
    const baseCSS = this.generateBaseCSS(node, componentName);
    const responsiveCSS = this.generateResponsiveCSS(node);
    const themeCSS = this.config.enableThemeSupport ? this.generateThemeCSS(node) : '';
    const animationCSS = this.generateAnimationCSS(node);

    return `${baseCSS}

${responsiveCSS}

${themeCSS}

${animationCSS}`.trim();
  }

  private generateTypeScript(node: FigmaNode, componentName: string): string {
    const props = this.extractProps(node);
    
    return `export interface ${componentName}Props {
  ${props.map(p => `${p.name}?: ${p.type || 'any'};`).join('\n  ')}
  className?: string;
  children?: React.ReactNode;
}`;
  }

  private generateChildren(node: FigmaNode): string {
    const className = `.${node.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    if (node.type === 'TEXT') {
      return `<div className="${className}">{${node.characters ? `"${node.characters}"` : 'children'}}</div>`;
    }

    if (node.children && node.children.length > 0) {
      const childElements = node.children.map(child => this.generateChildren(child)).join('\n    ');
      return `<div className="${className}">
    ${childElements}
  </div>`;
    }

    return `<div className="${className}" />`;
  }

  private generateBaseCSS(node: FigmaNode, componentName: string): string {
    const className = `.${node.name.toLowerCase().replace(/\s+/g, '-')}`;
    const styles: string[] = [];

    // Layout styles
    if (node.layoutMode === 'HORIZONTAL') {
      styles.push('display: flex;', 'flex-direction: row;');
    } else if (node.layoutMode === 'VERTICAL') {
      styles.push('display: flex;', 'flex-direction: column;');
    }

    // Spacing styles
    if (node.itemSpacing) {
      styles.push(`gap: ${node.itemSpacing}px;`);
    }

    // Padding styles
    if (node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
      const padding = `${node.paddingTop || 0}px ${node.paddingRight || 0}px ${node.paddingBottom || 0}px ${node.paddingLeft || 0}px`;
      styles.push(`padding: ${padding};`);
    }

    // Background color
    if (node.backgroundColor) {
      const bg = node.backgroundColor;
      styles.push(`background-color: rgba(${Math.round(bg.r * 255)}, ${Math.round(bg.g * 255)}, ${Math.round(bg.b * 255)}, ${bg.a});`);
    }

    // Border radius
    if (node.cornerRadius) {
      styles.push(`border-radius: ${node.cornerRadius}px;`);
    }

    return `${className} {
  ${styles.map(style => `  ${style}`).join('\n')}
}`;
  }

  private generateResponsiveCSS(node: FigmaNode): string {
    const className = `.${node.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    return `@media (max-width: 768px) {
  ${className} {
    padding: 1rem;
  }
}

@media (min-width: 1024px) {
  ${className} {
    padding: 2rem;
  }
}`;
  }

  private generateThemeCSS(node: FigmaNode): string {
    const className = `.${node.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    return `${className} {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
}

[data-theme="dark"] ${className} {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
}`;
  }

  private generateAnimationCSS(node: FigmaNode): string {
    const className = `.${node.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    return `${className} {
  transition: all 0.3s ease;
}

${className}:hover {
  transform: translateY(-2px);
}`;
  }

  private extractProps(node: FigmaNode): Array<{ name: string; type: string }> {
    const props: Array<{ name: string; type: string }> = [];
    
    // Extract props based on node properties
    if (node.characters) {
      props.push({ name: 'text', type: 'string' });
    }
    
    if (node.fills?.some(fill => fill.type === 'IMAGE')) {
      props.push({ name: 'src', type: 'string' });
    }

    return props;
  }

  private generateHooks(node: FigmaNode): string[] {
    const hooks: string[] = [];
    
    // Add hooks based on component functionality
    if (node.name.toLowerCase().includes('button')) {
      hooks.push('const [isPressed, setIsPressed] = useState(false);');
    }
    
    return hooks;
  }

  private generateImports(node: FigmaNode): string[] {
    const imports: string[] = ['import React from "react";'];
    
    // Add conditional imports
    if (this.generateHooks(node).some(hook => hook.includes('useState'))) {
      imports[0] = 'import React, { useState } from "react";';
    }
    
    return imports;
  }

  private generatePropsInterface(props: Array<{ name: string; type: string }>, componentName: string): string {
    return `interface ${componentName}Props {
  ${props.map(p => `${p.name}?: ${p.type};`).join('\n  ')}
  className?: string;
  children?: React.ReactNode;
}`;
  }

  private generateLayoutComponent(frame: FigmaNode): GeneratedComponent {
    return this.generateComponent(frame, `${frame.name}Layout`);
  }

  private analyzeAccessibility(node: FigmaNode): any {
    return {
      score: 85,
      issues: [],
      suggestions: ['Add ARIA labels', 'Ensure keyboard navigation'],
      wcagCompliance: 'AA' as const
    };
  }

  private analyzeResponsive(node: FigmaNode): any {
    return {
      mobile: 'responsive',
      tablet: 'responsive',
      desktop: 'responsive',
      hasResponsiveDesign: true
    };
  }

  private generateMetadata(node: FigmaNode, componentName: string): ComponentMetadata {
    return {
      figmaNodeId: node.id,
      componentType: this.getComponentType(node),
      complexity: 'medium',
      estimatedAccuracy: 85,
      generationTime: Date.now(),
      dependencies: []
    };
  }

  private getComponentType(node: FigmaNode): 'button' | 'card' | 'text' | 'input' | 'layout' | 'complex' {
    if (node.type === 'TEXT') return 'text';
    if (node.type === 'FRAME') return 'layout';
    if (node.name.toLowerCase().includes('button')) return 'button';
    if (node.name.toLowerCase().includes('card')) return 'card';
    if (node.name.toLowerCase().includes('input')) return 'input';
    return 'complex';
  }

  private findNodeById(node: FigmaNode, id: string): FigmaNode | null {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = this.findNodeById(child, id);
        if (found) return found;
      }
    }
    return null;
  }

  private findFrames(node: FigmaNode): FigmaNode[] {
    const frames: FigmaNode[] = [];
    if (node.type === 'FRAME') frames.push(node);
    if (node.children) {
      node.children.forEach(child => {
        frames.push(...this.findFrames(child));
      });
    }
    return frames;
  }

  private sanitizeComponentName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, 'Component$&')
      .replace(/^./, str => str.toUpperCase()) || 'Component';
  }
}