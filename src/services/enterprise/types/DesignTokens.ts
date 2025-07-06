export interface ColorToken {
  name: string;
  value: string;
  description: string;
  category?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'semantic';
  usage?: string[];
}

export interface TypographyToken {
  name: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  fontFamily: string;
  category?: 'heading' | 'body' | 'caption' | 'display';
  usage?: string[];
}

export interface SpacingToken {
  name: string;
  value: string;
  description: string;
  category?: 'micro' | 'small' | 'medium' | 'large' | 'macro';
  usage?: string[];
}

export interface ShadowToken {
  name: string;
  value: string;
  description: string;
  category?: 'elevation' | 'focus' | 'inset';
  usage?: string[];
}

export interface BorderRadiusToken {
  name: string;
  value: string;
  description: string;
  category?: 'small' | 'medium' | 'large' | 'full';
}

export interface BreakpointToken {
  name: string;
  value: string;
  description: string;
  min?: string;
  max?: string;
}

export interface AnimationToken {
  name: string;
  duration: string;
  easing: string;
  description: string;
  category?: 'fast' | 'normal' | 'slow';
}

export interface DesignTokenCollection {
  colors: ColorToken[];
  typography: TypographyToken[];
  spacing: SpacingToken[];
  shadows: ShadowToken[];
  borderRadius: BorderRadiusToken[];
  breakpoints: BreakpointToken[];
  animations: AnimationToken[];
}

export interface TokenExportFormat {
  format: 'css' | 'scss' | 'json' | 'js' | 'tailwind';
  tokens: DesignTokenCollection;
  options?: {
    prefix?: string;
    namespace?: string;
    includeComments?: boolean;
    minify?: boolean;
  };
}

export type TokenValue = string | number | boolean | Record<string, any>;

export interface TokenReference {
  type: 'color' | 'typography' | 'spacing' | 'shadow' | 'borderRadius' | 'animation';
  name: string;
  value: TokenValue;
  reference?: string; // Reference to another token
}

export interface TokenTheme {
  name: string;
  description?: string;
  tokens: Record<string, TokenValue>;
  extends?: string; // Reference to base theme
}