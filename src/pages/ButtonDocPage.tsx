
import React from 'react';
import DocLayout from '@/components/DocLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ButtonDocPage = () => {
  const buttonCode = `import { Button } from "@/components/ui/button";

// Default button
<Button>Default Button</Button>

// Button variants
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="lg">Large</Button>
<Button size="sm">Small</Button>
<Button size="icon"><SearchIcon /></Button>

// Disabled state
<Button disabled>Disabled</Button>
`;

  const usageMarkdown = `
## When to use the Button component

Use the Button component to help users carry out an action like:
- submitting a form
- beginning a new task
- triggering a new UI element to appear on the page

## When not to use the Button component

If you want to navigate to another page, use the \`Link\` component instead.

## Best practices

- Button text should clearly explain what action the user is taking
- Button text should be short and to the point (1-3 words)
- Buttons should be positioned in consistent, predictable places in the interface
- Use Button variants to indicate the importance of the action:
  - \`default\` for primary actions
  - \`secondary\` for secondary actions
  - \`outline\` or \`ghost\` for tertiary actions
  - \`destructive\` for potentially destructive actions
  - \`link\` for navigation or less visually prominent actions
`;

  const accessibilityMarkdown = `
## Accessibility considerations

The Button component follows WAI-ARIA guidelines for buttons:

- Has a native \`button\` role
- Includes the appropriate ARIA attributes based on the button's state
- Supports keyboard navigation:
  - Can be focused using the Tab key
  - Can be activated using Space or Enter keys
- Communicates disabled state to assistive technologies when \`disabled\` is true
- Has sufficient color contrast in all variants and states

### Keyboard interactions

| Key | Function |
| --- | --- |
| Tab | Moves focus to the button |
| Space/Enter | Activates the button |
`;

  const buttonProps = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono">variant</TableCell>
          <TableCell className="font-mono text-sm text-muted-foreground">
            "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
          </TableCell>
          <TableCell className="font-mono">"default"</TableCell>
          <TableCell>The visual style of the button</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">size</TableCell>
          <TableCell className="font-mono text-sm text-muted-foreground">
            "default" | "sm" | "lg" | "icon"
          </TableCell>
          <TableCell className="font-mono">"default"</TableCell>
          <TableCell>The size of the button</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">asChild</TableCell>
          <TableCell className="font-mono text-sm text-muted-foreground">boolean</TableCell>
          <TableCell className="font-mono">false</TableCell>
          <TableCell>When true, the component will render its child as the button element</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">disabled</TableCell>
          <TableCell className="font-mono text-sm text-muted-foreground">boolean</TableCell>
          <TableCell className="font-mono">false</TableCell>
          <TableCell>When true, the button will be disabled</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">className</TableCell>
          <TableCell className="font-mono text-sm text-muted-foreground">string</TableCell>
          <TableCell className="font-mono">-</TableCell>
          <TableCell>Additional CSS classes to apply to the button</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  return (
    <DocLayout
      title="Button"
      description="Buttons allow users to trigger an action or event with a single click."
      category="Components"
      code={buttonCode}
      usage={usageMarkdown}
      accessibility={accessibilityMarkdown}
      props={buttonProps}
    >
      <div className="flex flex-wrap gap-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
        <Button disabled>Disabled</Button>
      </div>
    </DocLayout>
  );
};

export default ButtonDocPage;
