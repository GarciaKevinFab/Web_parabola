import React from 'react';
import Plot from 'react-plotly.js';

const Graph = ({ data }) => {
    const xs = data.points.map(p => p[0]);
    const ys = data.points.map(p => p[1]);
    const zs = data.points.map(p => p[2]);

    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMax = Math.max(...ys);
    const zMax = Math.max(...zs);
    const pad = 1.0;

    const plotData = [
        {
            x: xs,
            y: ys,
            z: zs,
            type: 'scatter3d',
            mode: 'lines',
            line: { color: '#1f77b4', width: 4 },
            name: 'Curva',
        },
    ];

    if (data.tipo.toLowerCase() === 'parabola') {
        if (data.parametros.puntos_corte !== "No hay puntos de corte reales") {
            plotData.push({
                x: data.parametros.puntos_corte.map(p => p[0]),
                y: data.parametros.puntos_corte.map(p => p[1]),
                z: data.parametros.puntos_corte.map(() => 0.1),
                type: 'scatter3d',
                mode: 'markers',
                marker: { color: '#ff4040', size: 10 },
                name: 'Puntos de Corte',
            });
        }
        if (data.parametros.discriminante) {
            plotData.push({
                type: 'scatter3d',
                mode: 'text',
                x: [(xMin + xMax) / 2],
                y: [yMax + pad],
                z: [zMax + pad],
                text: [`Discriminante: ${data.parametros.discriminante}`],
                textposition: 'top center',
                textfont: { size: 18, color: '#0066cc' },
                showlegend: false,
            });
        }
    }

    return (
        <div className="graph-container">
            <Plot
                data={plotData}
                layout={{
                    autosize: true,
                    scene: {
                        xaxis: {
                            title: 'X',
                            zeroline: true,
                            showgrid: true,
                            gridcolor: 'rgba(200, 200, 200, 0.3)',
                            titlefont: { size: 14, color: '#333' },
                        },
                        yaxis: {
                            title: 'Y',
                            zeroline: true,
                            showgrid: true,
                            gridcolor: 'rgba(200, 200, 200, 0.3)',
                            titlefont: { size: 14, color: '#333' },
                        },
                        zaxis: {
                            title: 'Z',
                            zeroline: true,
                            showgrid: true,
                            gridcolor: 'rgba(200, 200, 200, 0.3)',
                            titlefont: { size: 14, color: '#333' },
                        },
                        camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } },
                        aspectratio: { x: 1, y: 1, z: 1 },
                        bgcolor: 'rgba(245, 245, 245, 0.9)',
                    },
                    margin: { l: 20, r: 20, b: 20, t: 20 },
                }}
                config={{
                    responsive: true,
                    displayModeBar: true,
                    toImageButtonOptions: { format: 'png', filename: 'conic_3d_plot' },
                    modeBarButtonsToRemove: ['sendDataToCloud'],
                }}
                style={{ width: '100%', height: '600px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            />
        </div>
    );
};

export default Graph;