import { FigmaApiResponse, GeneratedComponent } from '../../../types/figma';
import { AnalysisResult } from '../core/GenerationOrchestrator';
import { EnterpriseGenerationConfig } from '../core/ConfigurationManager';
import { ReactGenerator } from './frameworks/ReactGenerator';
import { VueGenerator } from './frameworks/VueGenerator';
import { AngularGenerator } from './frameworks/AngularGenerator';
import { SvelteGenerator } from './frameworks/SvelteGenerator';

export interface IFrameworkGenerator {
  generateComponents(figmaData: FigmaApiResponse, analysis: AnalysisResult): Promise<GeneratedComponent[]>;
  generateComponent(node: any, name: string): GeneratedComponent;
  getFrameworkSpecificCode(component: GeneratedComponent): string;
}

export class FrameworkGeneratorFactory {
  private config: EnterpriseGenerationConfig;

  constructor(config: EnterpriseGenerationConfig) {
    this.config = config;
  }

  createGenerator(): IFrameworkGenerator {
    switch (this.config.framework) {
      case 'react':
        return new ReactGenerator(this.config);
      case 'vue':
        return new VueGenerator(this.config);
      case 'angular':
        return new AngularGenerator(this.config);
      case 'svelte':
        return new SvelteGenerator(this.config);
      default:
        throw new Error(`Unsupported framework: ${this.config.framework}`);
    }
  }

  getSupportedFrameworks(): string[] {
    return ['react', 'vue', 'angular', 'svelte'];
  }

  getFrameworkFeatures(framework: string): FrameworkFeatures {
    const features: Record<string, FrameworkFeatures> = {
      react: {
        hasTypeScript: true,
        hasJSX: true,
        hasCSS: true,
        hasStorybook: true,
        hasTesting: true,
        hasStateManagement: true,
        hasRouting: true
      },
      vue: {
        hasTypeScript: true,
        hasJSX: false,
        hasCSS: true,
        hasStorybook: true,
        hasTesting: true,
        hasStateManagement: true,
        hasRouting: true
      },
      angular: {
        hasTypeScript: true,
        hasJSX: false,
        hasCSS: true,
        hasStorybook: false,
        hasTesting: true,
        hasStateManagement: true,
        hasRouting: true
      },
      svelte: {
        hasTypeScript: true,
        hasJSX: false,
        hasCSS: true,
        hasStorybook: true,
        hasTesting: true,
        hasStateManagement: true,
        hasRouting: true
      }
    };

    return features[framework] || features.react;
  }
}

export interface FrameworkFeatures {
  hasTypeScript: boolean;
  hasJSX: boolean;
  hasCSS: boolean;
  hasStorybook: boolean;
  hasTesting: boolean;
  hasStateManagement: boolean;
  hasRouting: boolean;
}