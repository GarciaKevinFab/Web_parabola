import React from 'react';

const Keyboard = ({ height, onInsert, onBackspace, onMoveCursor }) => {
    const keyboard = [
        ['x', 'y', 'z', 'π', '∞', '7', '8', '9', '×'],
        ['x²', 'y²', '√', 'e', '≤', '4', '5', '6', '+'],
        ['<', '>', '∑', '∫', '≥', '1', '2', '3', '−'],
        ['(', ')', 'frac', '.', '0', '=', '⌫', '←', '→'],
    ];

    const handleClick = (key) => {
        if (key === '⌫') onBackspace();
        else if (key === '←') onMoveCursor(-1);
        else if (key === '→') onMoveCursor(1);
        else if (key === '√') onInsert('\\sqrt{}');
        else if (key === 'x²') onInsert('x^2');
        else if (key === 'y²') onInsert('y^2');
        else if (key === '∑') onInsert('\\sum');
        else if (key === '∫') onInsert('\\int');
        else if (key === 'frac') onInsert('\\frac{}{}');
        else onInsert(key);
    };

    return (
        <div className="keyboard" style={{ height: `${height}px`, transition: 'opacity 0.3s ease' }}>
            {keyboard.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => handleClick(key)}
                            className="key"
                            aria-label={`Insert ${key}`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;