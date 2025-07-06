import { GeneratedComponent, QualityReport, QualityIssue } from '../../../types/figma';
import { EnterpriseGenerationConfig } from '../core/ConfigurationManager';

export class QualityAssurance {
  private config: EnterpriseGenerationConfig;

  constructor(config: EnterpriseGenerationConfig) {
    this.config = config;
  }

  async analyzeQuality(components: GeneratedComponent[]): Promise<QualityReport> {
    const issues: QualityIssue[] = [];
    let codeQuality = 100;
    let accessibility = 100;
    let performance = 100;
    let maintainability = 100;
    let testCoverage = this.config.enableTesting ? 85 : 0;

    // Analyze each component
    for (const component of components) {
      const componentIssues = this.analyzeComponent(component);
      issues.push(...componentIssues);
      
      // Adjust scores based on issues
      componentIssues.forEach(issue => {
        switch (issue.category) {
          case 'performance':
            performance = Math.max(0, performance - 5);
            break;
          case 'accessibility':
            accessibility = Math.max(0, accessibility - 10);
            break;
          case 'maintainability':
            maintainability = Math.max(0, maintainability - 3);
            break;
        }
      });
    }

    return {
      overallScore: Math.round((codeQuality + accessibility + performance + maintainability) / 4),
      visualAccuracy: 85,
      codeQuality: Math.max(0, codeQuality),
      accessibility: Math.max(0, accessibility),
      performance: Math.max(0, performance),
      recommendations: this.generateRecommendations(issues)
    };
  }

  private analyzeComponent(component: GeneratedComponent): QualityIssue[] {
    const issues: QualityIssue[] = [];
    
    // Check component size
    if (component.jsx.length > 1000) {
      issues.push({
        type: 'warning',
        category: 'maintainability',
        message: 'Component is too large',
        file: `${component.name}.tsx`,
        line: 1,
        fix: 'Consider breaking into smaller components'
      });
    }

    // Check accessibility
    if (!component.jsx.includes('aria-') && !component.jsx.includes('role=')) {
      issues.push({
        type: 'warning',
        category: 'accessibility',
        message: 'Missing accessibility attributes',
        file: `${component.name}.tsx`,
        fix: 'Add ARIA labels and roles'
      });
    }

    // Check performance
    if (component.jsx.includes('<img') && !component.jsx.includes('loading="lazy"')) {
      issues.push({
        type: 'info',
        category: 'performance',
        message: 'Images should use lazy loading',
        file: `${component.name}.tsx`,
        fix: 'Add loading="lazy" to img tags'
      });
    }

    return issues;
  }

  private generateRecommendations(issues: QualityIssue[]): string[] {
    const recommendations: string[] = [];
    
    const accessibilityIssues = issues.filter(i => i.category === 'accessibility').length;
    if (accessibilityIssues > 0) {
      recommendations.push(`Fix ${accessibilityIssues} accessibility issues for WCAG compliance`);
    }

    const performanceIssues = issues.filter(i => i.category === 'performance').length;
    if (performanceIssues > 0) {
      recommendations.push(`Address ${performanceIssues} performance optimizations`);
    }

    const maintainabilityIssues = issues.filter(i => i.category === 'maintainability').length;
    if (maintainabilityIssues > 0) {
      recommendations.push(`Improve ${maintainabilityIssues} maintainability concerns`);
    }

    return recommendations;
  }
}