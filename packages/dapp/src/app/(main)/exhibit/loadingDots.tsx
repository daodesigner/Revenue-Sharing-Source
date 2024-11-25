import { useState, useEffect } from 'react';

const LoadingDots = () => {
  const [dots, setDots] = useState(['●', '●', '●', '●', '●']);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % dots.length);
    }, 300);

    return () => clearInterval(interval);
  }, [dots.length]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="flex gap-4">
        {dots.map((dot, index) => (
          <span
            key={index}
            className={`text-4xl transition-all duration-300 ease-in-out
              ${index === activeIndex ? 'scale-150 text-amber-800' : 'scale-100 text-amber-400'}
              ${index === (activeIndex + 1) % dots.length ? 'scale-125 text-amber-600' : ''}
              ${index === (activeIndex + 2) % dots.length ? 'scale-110 text-amber-500' : ''}
            `}
            style={{
              filter: index === activeIndex ? 'drop-shadow(0 0 8px rgba(146, 64, 14, 0.5))' : 'none',
              transform: `scale(${index === activeIndex ? 1.5 : 
                          index === (activeIndex + 1) % dots.length ? 1.25 :
                          index === (activeIndex + 2) % dots.length ? 1.1 : 1})
                         translateY(${index === activeIndex ? '-10px' : '0px'})`,
            }}
          >
            {dot}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingDots;