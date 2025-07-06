export interface EnterpriseGenerationConfig {
  // Performance Settings
  optimization: OptimizationConfig;
  
  // Code Generation Settings
  framework: 'react' | 'vue' | 'angular' | 'svelte';
  styling: 'tailwind' | 'css-modules' | 'styled-components' | 'emotion' | 'vanilla-extract';
  typescript: boolean;
  
  // Architecture Settings
  componentArchitecture: 'atomic' | 'feature-based' | 'domain-driven';
  cssArchitecture: 'bem' | 'smacss' | 'itcss' | 'cube-css';
  
  // Enterprise Features
  enableDesignSystem: boolean;
  enableComponentLibrary: boolean;
  enableThemeSupport: boolean;
  enableI18n: boolean;
  enableTesting: boolean;
  enableStorybook: boolean;
  enableDocumentation: boolean;
  
  // Quality Assurance
  enforceAccessibility: boolean;
  enforcePerformance: boolean;
  enforceCodeStandards: boolean;
  
  // Scalability
  maxComponentsPerBundle: number;
  enableCodeSplitting: boolean;
  enableTreeShaking: boolean;
  enableLazyLoading: boolean;
}

export interface OptimizationConfig {
  enableCSSMinification: boolean;
  enableTreeShaking: boolean;
  enableComponentDeduplication: boolean;
  enableAssetOptimization: boolean;
  enableLazyLoading: boolean;
  maxBundleSize: number; // in KB
  targetPerformanceScore: number; // 0-100
}

export class ConfigurationManager {
  private config: EnterpriseGenerationConfig;
  private defaultConfig: EnterpriseGenerationConfig;

  constructor(config: Partial<EnterpriseGenerationConfig> = {}) {
    this.defaultConfig = this.createDefaultConfig();
    this.config = this.mergeConfigurations(this.defaultConfig, config);
  }

  getConfig(): EnterpriseGenerationConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<EnterpriseGenerationConfig>): void {
    this.config = this.mergeConfigurations(this.config, updates);
  }

  validateConfig(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate framework
    const validFrameworks = ['react', 'vue', 'angular', 'svelte'];
    if (!validFrameworks.includes(this.config.framework)) {
      errors.push(`Invalid framework: ${this.config.framework}`);
    }

    // Validate styling
    const validStyling = ['tailwind', 'css-modules', 'styled-components', 'emotion', 'vanilla-extract'];
    if (!validStyling.includes(this.config.styling)) {
      errors.push(`Invalid styling: ${this.config.styling}`);
    }

    // Validate bundle size
    if (this.config.optimization.maxBundleSize <= 0) {
      errors.push('Max bundle size must be greater than 0');
    }

    // Validate performance score
    if (this.config.optimization.targetPerformanceScore < 0 || this.config.optimization.targetPerformanceScore > 100) {
      errors.push('Target performance score must be between 0 and 100');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  getPreset(name: 'minimal' | 'standard' | 'enterprise'): EnterpriseGenerationConfig {
    const presets = {
      minimal: this.createMinimalPreset(),
      standard: this.createStandardPreset(),
      enterprise: this.createEnterprisePreset()
    };

    return presets[name];
  }

  private createDefaultConfig(): EnterpriseGenerationConfig {
    return {
      optimization: {
        enableCSSMinification: true,
        enableTreeShaking: true,
        enableComponentDeduplication: true,
        enableAssetOptimization: true,
        enableLazyLoading: true,
        maxBundleSize: 500,
        targetPerformanceScore: 90
      },
      framework: 'react',
      styling: 'tailwind',
      typescript: true,
      componentArchitecture: 'atomic',
      cssArchitecture: 'bem',
      enableDesignSystem: true,
      enableComponentLibrary: true,
      enableThemeSupport: true,
      enableI18n: false,
      enableTesting: true,
      enableStorybook: true,
      enableDocumentation: true,
      enforceAccessibility: true,
      enforcePerformance: true,
      enforceCodeStandards: true,
      maxComponentsPerBundle: 50,
      enableCodeSplitting: true,
      enableTreeShaking: true,
      enableLazyLoading: true
    };
  }

  private createMinimalPreset(): EnterpriseGenerationConfig {
    return {
      ...this.defaultConfig,
      enableDesignSystem: false,
      enableComponentLibrary: false,
      enableThemeSupport: false,
      enableTesting: false,
      enableStorybook: false,
      enableDocumentation: false,
      optimization: {
        ...this.defaultConfig.optimization,
        enableCSSMinification: false,
        enableComponentDeduplication: false,
        enableAssetOptimization: false
      }
    };
  }

  private createStandardPreset(): EnterpriseGenerationConfig {
    return {
      ...this.defaultConfig,
      enableI18n: false,
      enableThemeSupport: false
    };
  }

  private createEnterprisePreset(): EnterpriseGenerationConfig {
    return {
      ...this.defaultConfig,
      enableI18n: true,
      enableThemeSupport: true,
      optimization: {
        ...this.defaultConfig.optimization,
        targetPerformanceScore: 95,
        maxBundleSize: 300
      }
    };
  }

  private mergeConfigurations(
    base: EnterpriseGenerationConfig,
    override: Partial<EnterpriseGenerationConfig>
  ): EnterpriseGenerationConfig {
    return {
      ...base,
      ...override,
      optimization: {
        ...base.optimization,
        ...(override.optimization || {})
      }
    };
  }

  exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  importConfig(configJson: string): void {
    try {
      const importedConfig = JSON.parse(configJson);
      const validation = this.validateImportedConfig(importedConfig);
      
      if (validation.isValid) {
        this.config = this.mergeConfigurations(this.defaultConfig, importedConfig);
      } else {
        throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
      }
    } catch (error) {
      throw new Error(`Failed to import configuration: ${error}`);
    }
  }

  private validateImportedConfig(config: any): { isValid: boolean; errors: string[] } {
    // Implementation would validate the imported configuration
    return { isValid: true, errors: [] };
  }
}