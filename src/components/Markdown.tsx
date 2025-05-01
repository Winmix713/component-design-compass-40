import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThemeContext, { ThemeMode } from '@/context/ThemeContext'; // Importáljuk a saját ThemeContext-et és a ThemeMode típust

interface MarkdownProps {
  content: string;
  className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content, className }) => {
  // A saját ThemeContext használata
  const { theme } = useContext(ThemeContext);
  
  // A téma alapján választjuk ki a kód kiemelés stílusát
  // Ha a téma 'system', akkor ellenőrizzük a rendszer beállításait
  let effectiveTheme: 'light' | 'dark' = theme === 'system'
    ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme as 'light' | 'dark';
  
  const codeStyle = effectiveTheme === 'dark' ? tomorrow : prism;
  
  return (
    <div className={`markdown-content ${className || ''}`}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            
            return !inline && match ? (
              <SyntaxHighlighter
                style={codeStyle}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
