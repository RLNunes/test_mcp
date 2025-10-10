import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hover = false 
}) => {
  const hoverClass = hover ? 'hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer' : '';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <div className="w-full h-48 overflow-hidden bg-gray-200">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = ''
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      {children}
    </h3>
  );
};

export const CardText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p className="text-gray-600 text-sm">
      {children}
    </p>
  );
};
