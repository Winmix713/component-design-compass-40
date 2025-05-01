
export type ComponentCategory = {
  name: string;
  components: Component[];
};

export type Component = {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  variants?: string[];
  states?: string[];
  badge?: number;
};

export const componentCategories: ComponentCategory[] = [
  {
    name: "BRAND",
    components: [
      {
        id: "logo",
        name: "Logo",
        version: "v1.0.0",
        description: "Official logo component with various size options",
        category: "BRAND",
        variants: ["Default", "Small", "Large"]
      },
      {
        id: "icon",
        name: "Icon",
        version: "v1.2.0",
        description: "Icon component for visual elements",
        category: "BRAND",
        badge: 24
      },
      {
        id: "app-icon",
        name: "AppIcon",
        version: "v1.0.0",
        description: "Application icon for use in app headers and launchers",
        category: "BRAND"
      }
    ]
  },
  {
    name: "FORM",
    components: [
      {
        id: "input",
        name: "Input",
        version: "v2.0.0",
        description: "Text input component for forms",
        category: "FORM",
        variants: ["Default", "Outlined", "Filled"],
        states: ["Default", "Focus", "Error", "Disabled"]
      },
      {
        id: "textarea",
        name: "Textarea",
        version: "v1.5.0",
        description: "Multi-line text input for longer form content",
        category: "FORM",
        states: ["Default", "Focus", "Error", "Disabled"]
      },
      {
        id: "options",
        name: "Options",
        version: "v1.1.0",
        description: "Selection components like checkboxes and radio buttons",
        category: "FORM",
        badge: 12
      },
      {
        id: "select",
        name: "Select",
        version: "v2.1.0",
        description: "Dropdown select component",
        category: "FORM",
        variants: ["Default", "Outlined", "Compact"],
        states: ["Default", "Open", "Disabled"]
      },
      {
        id: "button",
        name: "Button",
        version: "v1.0.0",
        description: "Interactive button element for user actions",
        category: "FORM",
        variants: ["Primary", "Secondary", "Text", "Icon"],
        states: ["Default", "Hover", "Focus", "Disabled"]
      }
    ]
  },
  {
    name: "LAYOUT",
    components: [
      {
        id: "card",
        name: "Card",
        version: "v1.3.0",
        description: "Container component for grouping related content",
        category: "LAYOUT",
        variants: ["Default", "Elevated", "Outlined"]
      },
      {
        id: "grid",
        name: "Grid",
        version: "v1.1.0",
        description: "Flexible grid layout system",
        category: "LAYOUT"
      },
      {
        id: "divider",
        name: "Divider",
        version: "v1.0.0",
        description: "Visual separator between content sections",
        category: "LAYOUT",
        variants: ["Horizontal", "Vertical"]
      }
    ]
  },
  {
    name: "FEEDBACK",
    components: [
      {
        id: "alert",
        name: "Alert",
        version: "v1.5.0",
        description: "Informational messages for user feedback",
        category: "FEEDBACK",
        variants: ["Info", "Success", "Warning", "Error"]
      },
      {
        id: "toast",
        name: "Toast",
        version: "v2.0.0",
        description: "Brief notifications that appear temporarily",
        category: "FEEDBACK",
        variants: ["Info", "Success", "Warning", "Error"]
      },
      {
        id: "progress",
        name: "Progress",
        version: "v1.2.0",
        description: "Visual indicators of progress for operations",
        category: "FEEDBACK",
        variants: ["Linear", "Circular", "Steps"]
      }
    ]
  }
];

export const patterns = [
  {
    id: "authentication",
    name: "Authentication",
    description: "User authentication flows including login, registration, and password reset",
    image: "https://via.placeholder.com/300x180"
  },
  {
    id: "data-tables",
    name: "Data Tables",
    description: "Complex data table patterns with sorting, filtering, and pagination",
    image: "https://via.placeholder.com/300x180"
  },
  {
    id: "forms",
    name: "Forms",
    description: "Common form layouts and validation patterns",
    image: "https://via.placeholder.com/300x180"
  },
  {
    id: "modals",
    name: "Modals",
    description: "Modal dialog patterns for various use cases",
    image: "https://via.placeholder.com/300x180"
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "Navigation patterns including menus, tabs, and breadcrumbs",
    image: "https://via.placeholder.com/300x180"
  },
  {
    id: "empty-states",
    name: "Empty States",
    description: "Patterns for handling empty data states in applications",
    image: "https://via.placeholder.com/300x180"
  }
];

export const colorTokens = {
  blue: [
    { name: "blue-50", value: "#EFF6FF" },
    { name: "blue-100", value: "#DBEAFE" },
    { name: "blue-200", value: "#BFDBFE" },
    { name: "blue-300", value: "#93C5FD" },
    { name: "blue-400", value: "#60A5FA" },
    { name: "blue-500", value: "#3B82F6" },
    { name: "blue-600", value: "#2563EB" },
    { name: "blue-700", value: "#1D4ED8" },
    { name: "blue-800", value: "#1E40AF" },
    { name: "blue-900", value: "#1E3A8A" },
  ],
  gray: [
    { name: "gray-50", value: "#F9FAFB" },
    { name: "gray-100", value: "#F3F4F6" },
    { name: "gray-200", value: "#E5E7EB" },
    { name: "gray-300", value: "#D1D5DB" },
    { name: "gray-400", value: "#9CA3AF" },
    { name: "gray-500", value: "#6B7280" },
    { name: "gray-600", value: "#4B5563" },
    { name: "gray-700", value: "#374151" },
    { name: "gray-800", value: "#1F2937" },
    { name: "gray-900", value: "#111827" },
  ],
  red: [
    { name: "red-50", value: "#FEF2F2" },
    { name: "red-100", value: "#FEE2E2" },
    { name: "red-200", value: "#FECACA" },
    { name: "red-300", value: "#FCA5A5" },
    { name: "red-400", value: "#F87171" },
    { name: "red-500", value: "#EF4444" },
    { name: "red-600", value: "#DC2626" },
    { name: "red-700", value: "#B91C1C" },
    { name: "red-800", value: "#991B1B" },
    { name: "red-900", value: "#7F1D1D" },
  ],
  green: [
    { name: "green-50", value: "#ECFDF5" },
    { name: "green-100", value: "#D1FAE5" },
    { name: "green-200", value: "#A7F3D0" },
    { name: "green-300", value: "#6EE7B7" },
    { name: "green-400", value: "#34D399" },
    { name: "green-500", value: "#10B981" },
    { name: "green-600", value: "#059669" },
    { name: "green-700", value: "#047857" },
    { name: "green-800", value: "#065F46" },
    { name: "green-900", value: "#064E3B" },
  ],
};

export const changelogEntries = [
  {
    version: "2.1.4",
    date: "2025-04-20",
    changes: [
      { type: "Fixed", description: "Button component focus state accessibility issues" },
      { type: "Changed", description: "Updated error handling in Input component" },
      { type: "Added", description: "New Toast position options" }
    ]
  },
  {
    version: "2.1.0",
    date: "2025-03-15",
    changes: [
      { type: "Added", description: "New AppIcon component" },
      { type: "Changed", description: "Enhanced Toast notification animations" },
      { type: "Fixed", description: "Card component border radius inconsistencies" },
      { type: "Fixed", description: "Mobile responsiveness issues in Grid component" }
    ]
  },
  {
    version: "2.0.0",
    date: "2025-02-01",
    changes: [
      { type: "Added", description: "Major design system update with new tokens" },
      { type: "Changed", description: "Complete Input component redesign" },
      { type: "Changed", description: "Updated Toast component API" },
      { type: "Added", description: "Dark mode support for all components" },
      { type: "Fixed", description: "Various accessibility improvements across components" }
    ]
  },
  {
    version: "1.5.0",
    date: "2025-01-10",
    changes: [
      { type: "Added", description: "New Progress component variants" },
      { type: "Changed", description: "Button component shadow styling" },
      { type: "Fixed", description: "Select component keyboard navigation issues" }
    ]
  },
  {
    version: "1.2.0",
    date: "2024-12-05",
    changes: [
      { type: "Added", description: "New Options component" },
      { type: "Changed", description: "Updated Button component hover states" },
      { type: "Fixed", description: "Alignment issues in Alert component" }
    ]
  },
  {
    version: "1.0.0",
    date: "2024-11-01",
    changes: [
      { type: "Added", description: "Initial component library release" },
      { type: "Added", description: "Core components: Button, Input, Card, Alert" },
      { type: "Added", description: "Basic design tokens" }
    ]
  }
];

export const findComponentById = (id: string): Component | undefined => {
  for (const category of componentCategories) {
    const component = category.components.find(comp => comp.id === id);
    if (component) return component;
  }
  return undefined;
};
