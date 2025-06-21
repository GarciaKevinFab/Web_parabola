import React from 'react';
import Keyboard from './Keyboard';

const EquationMode = ({ equation, setEquation, loading }) => {
    const insertText = (text) => {
        const input = document.getElementById('equation');
        if (input) {
            const start = input.selectionStart || 0;
            const end = input.selectionEnd || 0;
            const newValue = input.value.substring(0, start) + text + (input.value.substring(end) || '');
            setEquation(newValue);
            input.selectionStart = input.selectionEnd = start + text.length;
        }
    };

    const backspace = () => {
        const input = document.getElementById('equation');
        if (input) {
            const start = input.selectionStart || 0;
            if (start > 0) {
                const newValue = input.value.substring(0, start - 1) + (input.value.substring(start) || '');
                setEquation(newValue);
                input.selectionStart = input.selectionEnd = start - 1;
            }
        }
    };

    const moveCursor = (offset) => {
        const input = document.getElementById('equation');
        if (input) {
            const newPos = Math.max(0, Math.min(input.value.length, input.selectionStart + offset));
            input.selectionStart = input.selectionEnd = newPos;
        }
    };

    return (
        <>
            <input
                id="equation"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="Ingrese ecuación (e.g. x^2 - y = 0)"
                disabled={loading}
                className="equation-input"
                aria-label="Entrada de ecuación"
            />
            <Keyboard
                height={Math.min(window.innerHeight * 0.3, 250)}
                onInsert={insertText}
                onBackspace={backspace}
                onMoveCursor={moveCursor}
            />
        </>
    );
};

export default EquationMode;