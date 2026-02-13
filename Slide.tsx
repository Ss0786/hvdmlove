
import React from 'react';

interface SlideProps {
  children: React.ReactNode;
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ children, isActive }) => {
  return (
    <div
      className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col items-center justify-center p-6 ${
        isActive ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 translate-x-20 scale-95 pointer-events-none'
      }`}
    >
      <div className="max-w-4xl w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default Slide;
