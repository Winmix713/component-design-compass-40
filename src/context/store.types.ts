
// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColor {
  name: string;
  value: string;
}

export interface ThemeColors {
  [key: string]: ThemeColor[];
}

export interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
  radius: string;
}

// Admin types
export interface AdminState {
  isAdminMode: boolean;
  isEditing: boolean;
}

// Component types
export interface ComponentState {
  selectedComponent: string | null;
  selectedVariant: string | null;
  selectedState: string | null;
}

// Global store state
export interface StoreState {
  theme: ThemeState;
  admin: AdminState;
  component: ComponentState;
}
