import { useEffect, useState } from 'react';

export function WordCounter({ maxLength, name }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = document.querySelector(`[name="${name}"]`) ;
    if (!element) return;

    const updateCount = () => {
      setCount(element.value.length);
    };

    element.addEventListener('input', updateCount);
    return () => element.removeEventListener('input', updateCount);
  }, [name]);

  return (
    <div className="flex justify-end mt-1">
      <span className={`text-xs ${
        count > maxLength * 0.9 
          ? 'text-red-500' 
          : count > maxLength * 0.7 
            ? 'text-blue-500' 
            : 'text-gray-500'
      }`}>
        {count}/{maxLength}
      </span>
    </div>
  );
}