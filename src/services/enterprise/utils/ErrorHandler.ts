import { GenerationResult } from '../core/GenerationOrchestrator';

export interface ErrorContext {
  phase?: string;
  component?: string;
  operation?: string;
  figmaNodeId?: string;
  timestamp: number;
  stackTrace?: string;
}

export interface HandledError {
  message: string;
  code: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context: ErrorContext;
  suggestion?: string;
  recoverable: boolean;
}

export class ErrorHandler {
  private errors: HandledError[] = [];

  handleGenerationError(error: any): GenerationResult {
    const handledError = this.processError(error);
    this.errors.push(handledError);

    // Log error for debugging
    console.error('Generation Error:', handledError);

    // Return fallback result
    return this.createFallbackResult(handledError);
  }

  handleComponentError(error: any, context: Partial<ErrorContext> = {}): HandledError {
    const handledError = this.processError(error, context);
    this.errors.push(handledError);
    
    console.warn('Component Error:', handledError);
    
    return handledError;
  }

  handlePhaseError(error: any, phase: string): HandledError {
    const handledError = this.processError(error, { phase });
    this.errors.push(handledError);
    
    console.error(`Phase Error [${phase}]:`, handledError);
    
    return handledError;
  }

  private processError(error: any, context: Partial<ErrorContext> = {}): HandledError {
    const fullContext: ErrorContext = {
      ...context,
      timestamp: Date.now(),
      stackTrace: error.stack
    };

    // Categorize error
    if (error.name === 'TypeError') {
      return {
        message: error.message,
        code: 'TYPE_ERROR',
        severity: 'medium',
        context: fullContext,
        suggestion: 'Check type definitions and ensure proper data flow',
        recoverable: true
      };
    }

    if (error.name === 'NetworkError' || error.message?.includes('fetch')) {
      return {
        message: 'Network request failed',
        code: 'NETWORK_ERROR',
        severity: 'high',
        context: fullContext,
        suggestion: 'Check internet connection and API endpoints',
        recoverable: true
      };
    }

    if (error.message?.includes('Figma')) {
      return {
        message: error.message,
        code: 'FIGMA_API_ERROR',
        severity: 'high',
        context: fullContext,
        suggestion: 'Verify Figma file access and API token',
        recoverable: true
      };
    }

    if (error.name === 'SyntaxError') {
      return {
        message: error.message,
        code: 'SYNTAX_ERROR',
        severity: 'critical',
        context: fullContext,
        suggestion: 'Check generated code syntax and templates',
        recoverable: false
      };
    }

    // Generic error handling
    return {
      message: error.message || 'Unknown error occurred',
      code: 'UNKNOWN_ERROR',
      severity: 'medium',
      context: fullContext,
      suggestion: 'Review error details and try again',
      recoverable: true
    };
  }

  private createFallbackResult(error: HandledError): GenerationResult {
    return {
      components: [],
      designSystem: {
        tokens: '{}',
        themes: { light: '', dark: '' },
        utilities: '',
        components: ''
      },
      documentation: {
        readme: `# Generation Failed\n\nError: ${error.message}\n\nSuggestion: ${error.suggestion}`,
        componentDocs: {},
        designGuidelines: '',
        usageExamples: ''
      },
      tests: {
        unitTests: {},
        integrationTests: {},
        e2eTests: {},
        accessibilityTests: {}
      },
      performance: {
        bundleSize: 0,
        renderTime: 0,
        memoryUsage: 0,
        optimizationSavings: 0,
        recommendations: [`Failed with error: ${error.code}`],
        generationTime: Date.now()
      },
      quality: {
        overallScore: 0,
        visualAccuracy: 0,
        codeQuality: 0,
        accessibility: 0,
        performance: 0,
        recommendations: [error.suggestion || 'Fix the underlying error and try again']
      }
    };
  }

  getErrors(): HandledError[] {
    return [...this.errors];
  }

  getCriticalErrors(): HandledError[] {
    return this.errors.filter(error => error.severity === 'critical');
  }

  getRecoverableErrors(): HandledError[] {
    return this.errors.filter(error => error.recoverable);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  hasCriticalErrors(): boolean {
    return this.getCriticalErrors().length > 0;
  }

  generateErrorReport(): string {
    if (this.errors.length === 0) {
      return '# Error Report\n\nNo errors occurred during generation.';
    }

    const criticalErrors = this.getCriticalErrors();
    const recoverableErrors = this.getRecoverableErrors();

    return `# Error Report

## Summary
- **Total Errors**: ${this.errors.length}
- **Critical Errors**: ${criticalErrors.length}
- **Recoverable Errors**: ${recoverableErrors.length}

## Critical Errors
${criticalErrors.map(error => `
### ${error.code}
- **Message**: ${error.message}
- **Phase**: ${error.context.phase || 'Unknown'}
- **Component**: ${error.context.component || 'N/A'}
- **Suggestion**: ${error.suggestion}
- **Timestamp**: ${new Date(error.context.timestamp).toISOString()}
`).join('')}

## Recoverable Errors
${recoverableErrors.map(error => `
### ${error.code}
- **Message**: ${error.message}
- **Phase**: ${error.context.phase || 'Unknown'}
- **Suggestion**: ${error.suggestion}
`).join('')}

## Recommendations
${this.generateRecommendations()}
`;
  }

  private generateRecommendations(): string {
    const recommendations: string[] = [];
    
    if (this.hasCriticalErrors()) {
      recommendations.push('Fix critical errors before proceeding with generation');
    }
    
    const networkErrors = this.errors.filter(e => e.code === 'NETWORK_ERROR');
    if (networkErrors.length > 0) {
      recommendations.push('Check network connectivity and API endpoints');
    }
    
    const figmaErrors = this.errors.filter(e => e.code === 'FIGMA_API_ERROR');
    if (figmaErrors.length > 0) {
      recommendations.push('Verify Figma file permissions and API token');
    }
    
    const typeErrors = this.errors.filter(e => e.code === 'TYPE_ERROR');
    if (typeErrors.length > 0) {
      recommendations.push('Review TypeScript definitions and data types');
    }

    return recommendations.map(rec => `- ${rec}`).join('\n');
  }

  clearErrors(): void {
    this.errors = [];
  }

  exportErrors(): string {
    return JSON.stringify(this.errors, null, 2);
  }
}