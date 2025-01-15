// TypingText.tsx
import React, { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  presets: string[];
  onComplete: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({ presets, onComplete }) => {
  const [currentPresetIndex, setCurrentPresetIndex] = useState(0);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const currentPreset = presets[currentPresetIndex];

    const typeText = () => {
      setText(currentPreset.substring(0, text.length + 1));
      if (text.length === currentPreset.length) {
        setIsTyping(false);
        setTimeout(() => setIsEditing(true), 1000); // Allow user to edit after a short delay
      } else {
        timeoutId = setTimeout(typeText, 100);
      }
    };

    const deleteText = () => {
      setText(currentPreset.substring(0, text.length - 1));
      if (text.length === 0) {
        setIsTyping(true);
        setCurrentPresetIndex((currentPresetIndex + 1) % presets.length);
      }
      timeoutId = setTimeout(deleteText, 50);
    };

    if (isTyping) {
      typeText();
    } else if (!isEditing) {
      timeoutId = setTimeout(deleteText, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentPresetIndex, isTyping, text, presets, isEditing]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      setText(text.substring(0, text.length - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      onComplete();
    } else if (event.key.length === 1) {
      setText(text + event.key);
    }
  };

  return (
    <span
      ref={textRef}
      contentEditable={isEditing}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning={true}
      className="focus:outline-none"
      spellCheck="false"
    >
      {text}
    </span>
  );
};

export default TypingText;