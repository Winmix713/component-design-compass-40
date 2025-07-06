export interface PhaseMetrics {
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
  success: boolean;
  error?: any;
  memoryUsage?: number;
}

export interface GenerationMetrics {
  totalDuration: number;
  phases: PhaseMetrics[];
  componentCount: number;
  bundleSize: number;
  optimizationSavings: number;
  qualityScore: number;
}

export class MetricsCollector {
  private phases: PhaseMetrics[] = [];
  private startTime: number = Date.now();

  recordPhase(name: string, duration: number): void {
    const endTime = Date.now();
    const startTime = endTime - duration;
    
    this.phases.push({
      name,
      duration,
      startTime,
      endTime,
      success: true,
      memoryUsage: this.getMemoryUsage()
    });
  }

  recordPhaseError(name: string, duration: number, error: any): void {
    const endTime = Date.now();
    const startTime = endTime - duration;
    
    this.phases.push({
      name,
      duration,
      startTime,
      endTime,
      success: false,
      error,
      memoryUsage: this.getMemoryUsage()
    });
  }

  getMetrics(): GenerationMetrics {
    const totalDuration = Date.now() - this.startTime;
    
    return {
      totalDuration,
      phases: [...this.phases],
      componentCount: 0, // To be set by caller
      bundleSize: 0, // To be set by caller
      optimizationSavings: 0, // To be set by caller
      qualityScore: 0 // To be set by caller
    };
  }

  getPhaseMetrics(phaseName: string): PhaseMetrics | undefined {
    return this.phases.find(phase => phase.name === phaseName);
  }

  getTotalDuration(): number {
    return Date.now() - this.startTime;
  }

  getSuccessfulPhases(): PhaseMetrics[] {
    return this.phases.filter(phase => phase.success);
  }

  getFailedPhases(): PhaseMetrics[] {
    return this.phases.filter(phase => !phase.success);
  }

  generateReport(): string {
    const metrics = this.getMetrics();
    const successfulPhases = this.getSuccessfulPhases();
    const failedPhases = this.getFailedPhases();

    return `# Generation Metrics Report

## Overview
- **Total Duration**: ${metrics.totalDuration.toFixed(2)}ms
- **Successful Phases**: ${successfulPhases.length}
- **Failed Phases**: ${failedPhases.length}
- **Success Rate**: ${((successfulPhases.length / this.phases.length) * 100).toFixed(1)}%

## Phase Breakdown
${this.phases.map(phase => `
### ${phase.name}
- **Duration**: ${phase.duration.toFixed(2)}ms
- **Status**: ${phase.success ? '✅ Success' : '❌ Failed'}
- **Memory Usage**: ${phase.memoryUsage?.toFixed(2) || 'N/A'}MB
${phase.error ? `- **Error**: ${phase.error.message || phase.error}` : ''}
`).join('')}

## Performance Analysis
- **Average Phase Duration**: ${(metrics.totalDuration / this.phases.length).toFixed(2)}ms
- **Longest Phase**: ${this.getLongestPhase()?.name || 'N/A'} (${this.getLongestPhase()?.duration.toFixed(2) || 0}ms)
- **Shortest Phase**: ${this.getShortestPhase()?.name || 'N/A'} (${this.getShortestPhase()?.duration.toFixed(2) || 0}ms)
`;
  }

  private getLongestPhase(): PhaseMetrics | undefined {
    return this.phases.reduce((longest, current) => 
      current.duration > (longest?.duration || 0) ? current : longest
    );
  }

  private getShortestPhase(): PhaseMetrics | undefined {
    return this.phases.reduce((shortest, current) => 
      current.duration < (shortest?.duration || Infinity) ? current : shortest
    );
  }

  private getMemoryUsage(): number {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }

  reset(): void {
    this.phases = [];
    this.startTime = Date.now();
  }

  exportMetrics(): string {
    return JSON.stringify(this.getMetrics(), null, 2);
  }
}