import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import EquationMode from './components/EquationMode';
import ParameterMode from './components/ParameterMode';
import Graph from './components/Graph';
import './styles.css';

function App() {
  const [equation, setEquation] = useState('');
  const [coeficienteA, setCoeficienteA] = useState('');
  const [altura, setAltura] = useState('');
  const [ancho, setAncho] = useState('');
  const [preview, setPreview] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('equation');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const maxRetries = 3;
  const timeout = 60000;

  const animationProps = useSpring({
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
    config: { duration: 300 },
  });

  useEffect(() => {
    setIsTransitioning(true);
    if (mode === 'equation') {
      setPreview(equation || 'Ingrese una ecuación');
    } else {
      const a = altura && ancho ? (-4 * parseFloat(altura) / (parseFloat(ancho) ** 2)).toString() : '';
      setPreview(a ? `y = ${a}x^2 + ${altura}` : 'Ingrese altura y ancho');
    }
  }, [equation, altura, ancho, mode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [mode]);

  const calculateWithRetry = async (params, attempt = 0) => {
    try {
      console.log(`Intento ${attempt + 1} de ${maxRetries}: Solicitud a ${apiUrl}/calcular con params`, params);
      const response = await axios.post(`${apiUrl}/calcular`, params, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        timeout,
      });
      console.log('Respuesta de API:', response.data);
      setData(response.data);
    } catch (err) {
      console.error(`Error en el intento ${attempt + 1}:`, err);
      if (attempt < maxRetries - 1) {
        const delay = 1000 * (attempt + 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        return calculateWithRetry(params, attempt + 1);
      } else {
        setError(err.response?.data?.detail || `Tiempo de espera agotado después de ${maxRetries} intentos. Verifica tu conexión o los valores.`);
      }
    }
  };

  const calculate = async () => {
    setLoading(true);
    setError(null);
    const params = {};
    if (mode === 'equation') {
      if (!equation.trim() || !equation.includes('=')) {
        setError('La ecuación debe tener un símbolo "=" con ambos lados completos.');
        setLoading(false);
        return;
      }
      params.equation = equation.trim();
    } else {
      const a = parseFloat(coeficienteA);
      const h = parseFloat(altura);
      const w = parseFloat(ancho);
      console.log('Parámetros enviados:', { coeficienteA, altura, ancho });
      if ((!coeficienteA && !altura) || !ancho || isNaN(a) || isNaN(h) || isNaN(w) || h === 0 || w === 0) {
        setError('Complete al menos el coeficiente "a" o altura y ancho con valores válidos.');
        setLoading(false);
        return;
      }
      if (coeficienteA) params.a = a;
      if (altura) params.altura = h;
      if (ancho) params.ancho = w;
    }
    await calculateWithRetry(params);
    setLoading(false);
  };

  const dismissError = () => setError(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Calculadora de Cónicas 3D</h1>
        <button
          className="help-button"
          onClick={() => setError('Ayuda: Ingresa una ecuación o coeficiente "a", altura y ancho, luego presiona Calcular.')}
          aria-label="Mostrar ayuda"
        >
          ?
        </button>
      </header>
      <div className="mode-switch">
        <button
          className={`mode-button ${mode === 'equation' ? 'active' : ''}`}
          onClick={() => setMode('equation')}
          aria-label="Cambiar a modo ecuación"
        >
          Modo Ecuación
        </button>
        <button
          className={`mode-button ${mode === 'parameters' ? 'active' : ''}`}
          onClick={() => setMode('parameters')}
          aria-label="Cambiar a modo parámetros"
        >
          Modo Parámetros
        </button>
      </div>
      <animated.div className={`input-group ${isTransitioning ? 'animating' : ''}`} style={animationProps}>
        {mode === 'equation' ? <EquationMode equation={equation} setEquation={setEquation} loading={loading} /> : <ParameterMode coeficienteA={coeficienteA} setCoeficienteA={setCoeficienteA} altura={altura} setAltura={setAltura} ancho={ancho} setAncho={setAncho} loading={loading} />}
        <Preview formula={preview} />
        {error && (
          <div className="error-container">
            <p className="error-message" role="alert">{error}</p>
            <button className="dismiss-button" onClick={dismissError} aria-label="Cerrar mensaje de error">
              ×
            </button>
          </div>
        )}
        <button onClick={calculate} disabled={loading} className="calculate-button">
          {loading ? <span className="spinner"></span> : 'Calcular'}
        </button>
      </animated.div>
      {data && <Graph data={data} />}
    </div>
  );
}

export default App;
