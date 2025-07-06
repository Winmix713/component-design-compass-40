import { FigmaApiResponse, GeneratedComponent } from '../../../types/figma';
import { ComponentAnalyzer } from './ComponentAnalyzer';
import { ConfigurationManager } from './ConfigurationManager';
import { FrameworkGeneratorFactory } from '../generators/FrameworkGeneratorFactory';
import { OptimizationEngine } from '../optimization/OptimizationEngine';
import { QualityAssurance } from '../quality/QualityAssurance';
import { DocumentationGenerator } from '../generators/DocumentationGenerator';
import { TestGenerator } from '../generators/TestGenerator';
import { MetricsCollector } from '../utils/MetricsCollector';
import { ErrorHandler } from '../utils/ErrorHandler';

export interface GenerationPipeline {
  analyze: () => Promise<AnalysisResult>;
  generate: () => Promise<GeneratedComponent[]>;
  optimize: () => Promise<GeneratedComponent[]>;
  validate: () => Promise<QualityReport>;
  document: () => Promise<DocumentationOutput>;
  test: () => Promise<TestOutput>;
  package: () => Promise<GenerationResult>;
}

export interface AnalysisResult {
  componentCount: number;
  complexity: 'simple' | 'medium' | 'complex';
  designTokens: DesignTokens;
  estimatedTime: number;
}

export interface DesignTokens {
  colors: ColorToken[];
  typography: TypographyToken[];
  spacing: SpacingToken[];
  shadows: ShadowToken[];
}

export interface GenerationResult {
  components: GeneratedComponent[];
  designSystem: DesignSystemOutput;
  documentation: DocumentationOutput;
  tests: TestOutput;
  performance: PerformanceReport;
  quality: QualityReport;
}

export class GenerationOrchestrator {
  private analyzer: ComponentAnalyzer;
  private configManager: ConfigurationManager;
  private generatorFactory: FrameworkGeneratorFactory;
  private optimizer: OptimizationEngine;
  private qualityAssurance: QualityAssurance;
  private docGenerator: DocumentationGenerator;
  private testGenerator: TestGenerator;
  private metrics: MetricsCollector;
  private errorHandler: ErrorHandler;

  constructor(config: EnterpriseGenerationConfig) {
    this.configManager = new ConfigurationManager(config);
    this.analyzer = new ComponentAnalyzer(config);
    this.generatorFactory = new FrameworkGeneratorFactory(config);
    this.optimizer = new OptimizationEngine(config.optimization);
    this.qualityAssurance = new QualityAssurance(config);
    this.docGenerator = new DocumentationGenerator(config);
    this.testGenerator = new TestGenerator(config);
    this.metrics = new MetricsCollector();
    this.errorHandler = new ErrorHandler();
  }

  async generateEnterprise(figmaData: FigmaApiResponse): Promise<GenerationResult> {
    const startTime = Date.now();
    
    try {
      console.log('🚀 Starting Enterprise Code Generation Pipeline...');
      
      const pipeline = this.createPipeline(figmaData);
      
      // Phase 1: Analysis
      const analysis = await this.executePhase('Analysis', () => pipeline.analyze());
      
      // Phase 2: Generation
      const components = await this.executePhase('Generation', () => pipeline.generate());
      
      // Phase 3: Optimization
      const optimizedComponents = await this.executePhase('Optimization', () => pipeline.optimize());
      
      // Phase 4: Quality Validation
      const quality = await this.executePhase('Quality Validation', () => pipeline.validate());
      
      // Phase 5: Documentation
      const documentation = await this.executePhase('Documentation', () => pipeline.document());
      
      // Phase 6: Testing
      const tests = await this.executePhase('Testing', () => pipeline.test());
      
      // Phase 7: Final Packaging
      const result = await this.executePhase('Packaging', () => pipeline.package());
      
      const totalTime = Date.now() - startTime;
      console.log(`✅ Enterprise Generation Complete in ${totalTime}ms`);
      
      return result;
      
    } catch (error) {
      return this.errorHandler.handleGenerationError(error);
    }
  }

  private createPipeline(figmaData: FigmaApiResponse): GenerationPipeline {
    let analysisResult: AnalysisResult;
    let components: GeneratedComponent[];
    let optimizedComponents: GeneratedComponent[];

    return {
      analyze: async () => {
        analysisResult = await this.analyzer.analyzeDesignSystem(figmaData);
        return analysisResult;
      },

      generate: async () => {
        const generator = this.generatorFactory.createGenerator();
        components = await generator.generateComponents(figmaData, analysisResult);
        return components;
      },

      optimize: async () => {
        optimizedComponents = await this.optimizer.optimizeComponents(components);
        return optimizedComponents;
      },

      validate: async () => {
        return await this.qualityAssurance.analyzeQuality(optimizedComponents);
      },

      document: async () => {
        return await this.docGenerator.generateDocumentation(optimizedComponents, analysisResult.designTokens);
      },

      test: async () => {
        return await this.testGenerator.generateTests(optimizedComponents);
      },

      package: async (): Promise<GenerationResult> => {
        const [quality, documentation, tests] = await Promise.all([
          this.qualityAssurance.analyzeQuality(optimizedComponents),
          this.docGenerator.generateDocumentation(optimizedComponents, analysisResult.designTokens),
          this.testGenerator.generateTests(optimizedComponents)
        ]);

        const designSystem = await this.generateDesignSystem(analysisResult.designTokens);
        const performance = this.generatePerformanceReport(optimizedComponents);

        return {
          components: optimizedComponents,
          designSystem,
          documentation,
          tests,
          performance,
          quality
        };
      }
    };
  }

  private async executePhase<T>(phaseName: string, operation: () => Promise<T>): Promise<T> {
    const startTime = Date.now();
    console.log(`🔄 Starting ${phaseName} phase...`);
    
    try {
      const result = await operation();
      const duration = Date.now() - startTime;
      console.log(`✅ ${phaseName} completed in ${duration}ms`);
      this.metrics.recordPhase(phaseName, duration);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ ${phaseName} failed after ${duration}ms:`, error);
      this.metrics.recordPhaseError(phaseName, duration, error);
      throw error;
    }
  }

  private async generateDesignSystem(tokens: DesignTokens): Promise<DesignSystemOutput> {
    // Implementation moved to DesignSystemGenerator
    return {
      tokens: JSON.stringify(tokens, null, 2),
      themes: { light: '', dark: '' },
      utilities: '',
      components: ''
    };
  }

  private generatePerformanceReport(components: GeneratedComponent[]): PerformanceReport {
    const bundleSize = this.calculateBundleSize(components);
    
    return {
      bundleSize,
      renderTime: 0,
      memoryUsage: 0,
      optimizationSavings: 0,
      recommendations: [],
      generationTime: Date.now()
    };
  }

  private calculateBundleSize(components: GeneratedComponent[]): number {
    return components.reduce((total, component) => {
      return total + 
        new Blob([component.jsx]).size + 
        new Blob([component.css]).size;
    }, 0) / 1024; // Convert to KB
  }
}

// Re-export types that are needed elsewhere
export type { EnterpriseGenerationConfig } from '../../../types/figma';
export type { DesignSystemOutput, DocumentationOutput, TestOutput, PerformanceReport, QualityReport } from '../../../types/figma';
export type { ColorToken, TypographyToken, SpacingToken, ShadowToken } from '../types/DesignTokens';