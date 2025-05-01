
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/hooks/useTheme';

interface MarkdownProps {
  content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-base font-bold mt-3 mb-1" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 text-muted-foreground" {...props} />,
        ul: ({ node, ...props }) => <ul className="mb-4 ml-6 list-disc" {...props} />,
        ol: ({ node, ...props }) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-primary hover:underline" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-muted pl-4 italic my-4" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              className="rounded-md my-4"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className="bg-muted px-1.5 py-0.5 rounded text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead className="bg-muted" {...props} />,
        th: ({ node, ...props }) => (
          <th className="p-2 text-left border-b font-medium" {...props} />
        ),
        td: ({ node, ...props }) => <td className="p-2 border-b" {...props} />,
        hr: ({ node, ...props }) => <hr className="my-6 border-muted" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
