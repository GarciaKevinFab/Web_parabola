import React from 'react';

const ParameterMode = ({ coeficienteA, setCoeficienteA, altura, setAltura, ancho, setAncho, loading }) => {
    return (
        <div className="parameter-inputs">
            <input
                type="number"
                value={coeficienteA}
                onChange={(e) => setCoeficienteA(e.target.value)}
                placeholder="Coeficiente 'a'"
                disabled={loading}
                className="param-input"
                aria-label="Coeficiente a"
            />
            <input
                type="number"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Altura (H)"
                disabled={loading}
                className="param-input"
                aria-label="Altura H"
            />
            <input
                type="number"
                value={ancho}
                onChange={(e) => setAncho(e.target.value)}
                placeholder="Ancho (W)"
                disabled={loading}
                className="param-input"
                aria-label="Ancho W"
            />
        </div>
    );
};

export default ParameterMode;