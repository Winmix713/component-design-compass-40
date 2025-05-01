import React from 'react';
import { useTheme } from '@/hooks/useTheme';

interface MarkdownProps {
  content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Function to parse markdown to HTML
  const parseMarkdown = (text: string): string => {
    // Heading parsing
    let parsedText = text
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Bold and italic
    parsedText = parsedText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    parsedText = parsedText.replace(
      /\[([^\[]+)\]\(([^\)]+)\)/g,
      '<a href="$2">$1</a>'
    );

    // Lists
    parsedText = parsedText.replace(
      /^\s*\n\* (.*)/gm, 
      '<ul>\n<li>$1</li>'
    );
    parsedText = parsedText.replace(/^\* (.*)/gm, '<li>$1</li>');
    parsedText = parsedText.replace(/\n$/g, '</ul>');

    // Code blocks
    parsedText = parsedText.replace(
      /```(\w+)?\n([\s\S]*?)\n```/g, 
      '<pre><code class="language-$1">$2</code></pre>'
    );
    
    // Inline code
    parsedText = parsedText.replace(/`(.*?)`/g, '<code>$1</code>');

    // Paragraphs
    parsedText = parsedText.replace(/^\s*(\n)?(.+)/gm, function(m) {
      return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
    });

    // Line breaks
    parsedText = parsedText.replace(/\n/g, '<br />');

    return parsedText;
  };

  // Sanitize input (basic implementation)
  const sanitizeHTML = (html: string): string => {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/javascript:/g, '');
  };

  const htmlContent = sanitizeHTML(parseMarkdown(content));

  return (
    <div 
      className={`markdown-content ${isDarkMode ? 'dark' : 'light'}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{
        '--bg-color': isDarkMode ? '#1e1e2e' : '#ffffff',
        '--text-color': isDarkMode ? '#cdd6f4' : '#323232',
        '--muted-color': isDarkMode ? '#a6adc8' : '#6c757d',
        '--border-color': isDarkMode ? '#45475a' : '#dee2e6',
        '--code-bg': isDarkMode ? '#181825' : '#f8f9fa',
      } as React.CSSProperties}
    />
  );
};

// Add CSS for the markdown component
export const MarkdownStyles = `
  .markdown-content {
    color: var(--text-color);
    line-height: 1.6;
  }
  
  .markdown-content h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .markdown-content h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  .markdown-content h3 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .markdown-content p {
    margin-bottom: 1rem;
    color: var(--muted-color);
  }
  
  .markdown-content ul, .markdown-content ol {
    margin-bottom: 1rem;
    margin-left: 1.5rem;
  }
  
  .markdown-content ul {
    list-style-type: disc;
  }
  
  .markdown-content ol {
    list-style-type: decimal;
  }
  
  .markdown-content li {
    margin-bottom: 0.25rem;
  }
  
  .markdown-content a {
    color: #3182ce;
    text-decoration: none;
  }
  
  .markdown-content a:hover {
    text-decoration: underline;
  }
  
  .markdown-content blockquote {
    border-left: 4px solid var(--border-color);
    padding-left: 1rem;
    font-style: italic;
    margin: 1rem 0;
  }
  
  .markdown-content code {
    background-color: var(--code-bg);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
  
  .markdown-content pre {
    background-color: var(--code-bg);
    padding: 1rem;
    border-radius: 0.25rem;
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .markdown-content pre code {
    background-color: transparent;
    padding: 0;
    font-size: 0.875rem;
  }
  
  .markdown-content hr {
    border: 0;
    border-top: 1px solid var(--border-color);
    margin: 1.5rem 0;
  }
`;
