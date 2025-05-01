import React from 'react';
import { useTheme } from '@/hooks/useTheme';

interface MarkdownProps {
  content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Simple markdown renderer that uses dangerouslySetInnerHTML
  // but with basic sanitization
  const renderMarkdown = (text: string): string => {
    // Process markdown with headings
    let html = text
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>');

    // Bold and italic formatting
    html = html
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(
      /\[([^\[]+)\]\(([^\)]+)\)/g,
      '<a href="$2" class="text-primary hover:underline">$1</a>'
    );

    // Code blocks
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)\n```/g,
      '<pre class="bg-muted rounded-md my-4 p-4 overflow-x-auto"><code class="text-sm">$2</code></pre>'
    );
    
    // Inline code
    html = html.replace(
      /`(.*?)`/g, 
      '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>'
    );

    // Lists
    html = html.replace(
      /^\s*\n\* (.*)/gm, 
      '<ul class="mb-4 ml-6 list-disc">\n<li class="mb-1">$1</li>'
    );
    html = html.replace(/^\* (.*)/gm, '<li class="mb-1">$1</li>');
    
    // Numbered lists
    html = html.replace(
      /^\s*\n\d\. (.*)/gm, 
      '<ol class="mb-4 ml-6 list-decimal">\n<li class="mb-1">$1</li>'
    );
    html = html.replace(/^\d\. (.*)/gm, '<li class="mb-1">$1</li>');
    
    // Close lists
    html = html.replace(/<\/(ul|ol)>\s*<\1>/g, '');
    
    // Blockquotes
    html = html.replace(
      /^\> (.*$)/gm, 
      '<blockquote class="border-l-4 border-muted pl-4 italic my-4">$1</blockquote>'
    );

    // Horizontal rules
    html = html.replace(/^-{3,}/gm, '<hr class="my-6 border-muted">');

    // Paragraphs
    html = html.replace(/^(?!<[a-z])(.*$)/gm, function(m) {
      if (m.trim() === '') return m;
      return '<p class="mb-4 text-muted-foreground">' + m + '</p>';
    });

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');

    // Tables (basic support)
    html = html.replace(
      /^\|(.*)\|$/gm, 
      function(match, content) {
        const cells = content.split('|').map(cell => cell.trim());
        return '<tr>' + cells.map(cell => `<td class="p-2 border-b">${cell}</td>`).join('') + '</tr>';
      }
    );
    
    html = html.replace(
      /^(<tr>.*<\/tr>)\n\|-+\|/gm,
      '<table class="w-full border-collapse my-4"><thead class="bg-muted">$1</thead><tbody>'
    );
    
    html = html.replace(/<\/tr>\s*(?!<tr|<\/tbody|<\/table)/g, '</tr></tbody></table>');
    
    // Fix any malformed HTML (basic)
    html = html
      .replace(/<\/([^>]+)>(\s*)<\/\1>/g, '</$1>')
      .replace(/<([^\/][^>]*)>(\s*)<\/[^>]*>(\s*)<\1>/g, '<$1>');

    return html;
  };

  // Basic sanitization to remove potentially harmful HTML
  const sanitizeHTML = (html: string): string => {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/javascript:/gi, '')
      .replace(/onerror=/gi, '')
      .replace(/data:/gi, '')
      .replace(/src=/gi, 'data-src=');
  };

  // Apply the theme-based CSS classes
  const themeClasses = isDarkMode 
    ? 'bg-background text-foreground' 
    : 'bg-white text-slate-900';

  return (
    <div 
      className={`markdown-content ${themeClasses} prose prose-sm max-w-none`}
      dangerouslySetInnerHTML={{ 
        __html: sanitizeHTML(renderMarkdown(content)) 
      }}
    />
  );
};
