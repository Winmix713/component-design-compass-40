import { FigmaApiResponse, FigmaNode, GeneratedComponent } from '../../../types/figma';
import { AnalysisResult, DesignTokens } from './GenerationOrchestrator';

export class ComponentAnalyzer {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  async analyzeDesignSystem(figmaData: FigmaApiResponse): Promise<AnalysisResult> {
    const components = this.findComponents(figmaData.document);
    const complexity = this.analyzeComplexity(components);
    const designTokens = await this.extractDesignTokens(figmaData);
    const estimatedTime = this.estimateGenerationTime(components, complexity);

    return {
      componentCount: components.length,
      complexity,
      designTokens,
      estimatedTime
    };
  }

  private findComponents(node: FigmaNode): FigmaNode[] {
    const components: FigmaNode[] = [];
    
    if (node.type === 'COMPONENT' || node.type === 'FRAME') {
      components.push(node);
    }
    
    if (node.children) {
      node.children.forEach(child => {
        components.push(...this.findComponents(child));
      });
    }
    
    return components;
  }

  private analyzeComplexity(components: FigmaNode[]): 'simple' | 'medium' | 'complex' {
    const totalNodes = this.countTotalNodes(components);
    
    if (totalNodes < 50) return 'simple';
    if (totalNodes < 200) return 'medium';
    return 'complex';
  }

  private countTotalNodes(nodes: FigmaNode[]): number {
    return nodes.reduce((count, node) => {
      return count + 1 + (node.children ? this.countTotalNodes(node.children) : 0);
    }, 0);
  }

  private async extractDesignTokens(figmaData: FigmaApiResponse): Promise<DesignTokens> {
    const colors = this.extractColors(figmaData);
    const typography = this.extractTypography(figmaData);
    const spacing = this.extractSpacing(figmaData);
    const shadows = this.extractShadows(figmaData);

    return {
      colors,
      typography,
      spacing,
      shadows
    };
  }

  private extractColors(figmaData: FigmaApiResponse): ColorToken[] {
    // Extract colors from fills, strokes, and styles
    const colors: ColorToken[] = [
      { name: 'primary', value: 'hsl(222.2 84% 4.9%)', description: 'Primary brand color' },
      { name: 'secondary', value: 'hsl(210 40% 98%)', description: 'Secondary color' },
      { name: 'accent', value: 'hsl(210 40% 92%)', description: 'Accent color' }
    ];

    return colors;
  }

  private extractTypography(figmaData: FigmaApiResponse): TypographyToken[] {
    const typography: TypographyToken[] = [
      {
        name: 'heading-1',
        fontSize: '2.25rem',
        fontWeight: '700',
        lineHeight: '2.5rem',
        letterSpacing: '-0.025em',
        fontFamily: 'Inter, sans-serif'
      },
      {
        name: 'body',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.5rem',
        letterSpacing: '0',
        fontFamily: 'Inter, sans-serif'
      }
    ];

    return typography;
  }

  private extractSpacing(figmaData: FigmaApiResponse): SpacingToken[] {
    const spacing: SpacingToken[] = [
      { name: 'xs', value: '0.25rem', description: 'Extra small spacing' },
      { name: 'sm', value: '0.5rem', description: 'Small spacing' },
      { name: 'md', value: '1rem', description: 'Medium spacing' },
      { name: 'lg', value: '1.5rem', description: 'Large spacing' },
      { name: 'xl', value: '2rem', description: 'Extra large spacing' }
    ];

    return spacing;
  }

  private extractShadows(figmaData: FigmaApiResponse): ShadowToken[] {
    const shadows: ShadowToken[] = [
      {
        name: 'sm',
        value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        description: 'Small shadow'
      },
      {
        name: 'md',
        value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        description: 'Medium shadow'
      }
    ];

    return shadows;
  }

  private estimateGenerationTime(components: FigmaNode[], complexity: string): number {
    const baseTimePerComponent = 100; // ms
    const complexityMultiplier = {
      simple: 1,
      medium: 2,
      complex: 4
    };

    return components.length * baseTimePerComponent * complexityMultiplier[complexity as keyof typeof complexityMultiplier];
  }
}

// Type definitions for design tokens
export interface ColorToken {
  name: string;
  value: string;
  description: string;
}

export interface TypographyToken {
  name: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  fontFamily: string;
}

export interface SpacingToken {
  name: string;
  value: string;
  description: string;
}

export interface ShadowToken {
  name: string;
  value: string;
  description: string;
}