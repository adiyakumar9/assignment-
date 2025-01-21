import React from 'react';
import { marked } from 'marked';

interface FormattedMessageProps {
  text: string;
}

const FormattedMessage: React.FC<FormattedMessageProps> = ({ text }) => {
  // Configure marked to only allow specific formatting options
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  // Convert markdown to HTML
  const getFormattedContent = (content: string) => {
    const parsed = marked(content);
    return { __html: parsed };
  };

  return (
    <div 
      className="prose prose-invert max-w-none prose-emerald"
    >
      <div
        className="space-y-2"
        dangerouslySetInnerHTML={getFormattedContent(text)}
      />
    </div>
  );
};

export default FormattedMessage;