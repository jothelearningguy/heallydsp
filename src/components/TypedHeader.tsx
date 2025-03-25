import React, { useState, useEffect } from 'react';

interface TypedHeaderProps {
  phrases: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBetweenPhrases?: number;
}

const TypedHeader: React.FC<TypedHeaderProps> = ({
  phrases,
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBetweenPhrases = 2000,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isWaiting) {
        timeout = setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, delayBetweenPhrases);
        return;
      }

      if (isDeleting) {
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        } else {
          setDisplayText(prev => prev.slice(0, -1));
        }
        timeout = setTimeout(type, deleteSpeed);
      } else {
        if (displayText === currentPhrase) {
          setIsWaiting(true);
        } else {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }
        timeout = setTimeout(type, typingSpeed);
      }
    };

    timeout = setTimeout(type, 50);

    return () => clearTimeout(timeout);
  }, [displayText, currentPhraseIndex, isDeleting, isWaiting, phrases, typingSpeed, deleteSpeed, delayBetweenPhrases]);

  return (
    <div className="typed-header-container w-full">
      <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 bg-gradient-primary text-transparent bg-clip-text leading-tight">
        {displayText}
        <span className="cursor">|</span>
      </h1>
      <style>
        {`
          .typed-header-container {
            min-height: 12rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .cursor {
            animation: blink 1s step-end infinite;
            margin-left: 4px;
          }
          @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
          }
          @media (min-width: 1024px) {
            .typed-header-container {
              min-height: 16rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TypedHeader; 