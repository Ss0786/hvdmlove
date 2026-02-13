
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  lines: string[];
  speed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ lines, speed = 50 }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const nextLines = [...prev];
            if (nextLines[currentLineIndex] === undefined) {
              nextLines[currentLineIndex] = "";
            }
            nextLines[currentLineIndex] += currentLine[currentCharIndex];
            return nextLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 800);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentLineIndex, currentCharIndex, lines, speed]);

  return (
    <div className="text-center space-y-3">
      {displayedLines.map((line, idx) => (
        <p 
          key={idx} 
          className={`text-xl md:text-3xl text-pink-200 font-romantic transition-all duration-500 opacity-100 transform translate-y-0 ${line === "" ? "h-4" : ""}`}
        >
          {line}
        </p>
      ))}
    </div>
  );
};

export default Typewriter;
