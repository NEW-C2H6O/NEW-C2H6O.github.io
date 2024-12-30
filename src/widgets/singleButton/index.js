import React, { useState } from 'react';
import './style/index.css';

function SingleButton({ label }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      className={`select-button ${isSelected ? 'selected' : ''}`}
      onClick={() => setIsSelected(!isSelected)}>
      {label}
    </button>
  );
}

export { SingleButton };
