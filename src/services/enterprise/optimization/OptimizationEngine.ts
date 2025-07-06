import { GeneratedComponent } from '../../../types/figma';
import { OptimizationConfig } from '../core/ConfigurationManager';

export class OptimizationEngine {
  private config: OptimizationConfig;

  constructor(config: OptimizationConfig) {
    this.config = config;
  }

  async optimizeComponents(components: GeneratedComponent[]): Promise<GeneratedComponent[]> {
    let optimized = [...components];

    if (this.config.enableComponentDeduplication) {
      optimized = this.deduplicateComponents(optimized);
    }

    if (this.config.enableTreeShaking) {
      optimized = this.treeShakeUnusedCode(optimized);
    }

    if (this.config.enableCSSMinification) {
      optimized = this.optimizeCSS(optimized);
    }

    if (this.config.enableAssetOptimization) {
      optimized = this.optimizeAssets(optimized);
    }

    return optimized;
  }

  private deduplicateComponents(components: GeneratedComponent[]): GeneratedComponent[] {
    const uniqueComponents = new Map<string, GeneratedComponent>();
    
    components.forEach(component => {
      const hash = this.generateComponentHash(component);
      if (!uniqueComponents.has(hash)) {
        uniqueComponents.set(hash, component);
      }
    });

    return Array.from(uniqueComponents.values());
  }

  private treeShakeUnusedCode(components: GeneratedComponent[]): GeneratedComponent[] {
    return components.map(component => ({
      ...component,
      css: this.removeUnusedCSS(component.css)
    }));
  }

  private optimizeCSS(components: GeneratedComponent[]): GeneratedComponent[] {
    return components.map(component => ({
      ...component,
      css: this.minifyCSS(component.css)
    }));
  }

  private optimizeAssets(components: GeneratedComponent[]): GeneratedComponent[] {
    return components.map(component => ({
      ...component,
      jsx: this.optimizeImages(component.jsx)
    }));
  }

  private generateComponentHash(component: GeneratedComponent): string {
    const content = component.jsx + component.css;
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  private removeUnusedCSS(css: string): string {
    // Remove empty rules and unused selectors
    return css
      .split('}')
      .filter(rule => rule.trim() && !rule.includes('{ }'))
      .join('}\n');
  }

  private minifyCSS(css: string): string {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/;\s*}/g, '}')
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/:\s*/g, ':')
      .trim();
  }

  private optimizeImages(jsx: string): string {
    return jsx.replace(
      /<img([^>]*?)src="([^"]+)"([^>]*?)>/g,
      '<img$1src="$2" loading="lazy" decoding="async"$3>'
    );
  }
}