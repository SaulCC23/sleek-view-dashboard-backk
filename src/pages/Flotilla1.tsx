import React, { useEffect } from 'react';
import { Car, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import Footer from '@/components/layout/Footer';

const Flotilla1: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Datos de ejemplo
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Distancia Recorrida (km)',
          data: [120, 190, 300, 250, 280, 320],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    // Configuración común para las gráficas
    const config = {
      responsive: true,
      maintainAspectRatio: false
    };

    // Crear las gráficas
    const charts = [];

    // Gráfica 1 - Línea
    const ctx1 = document.getElementById('chart1') as HTMLCanvasElement;
    if (ctx1) {
      charts.push(new Chart(ctx1, {
        type: 'line',
        data: data,
        options: config
      }));
    }

    // Gráfica 2 - Barras
    const ctx2 = document.getElementById('chart2') as HTMLCanvasElement;
    if (ctx2) {
      charts.push(new Chart(ctx2, {
        type: 'bar',
        data: {
          ...data,
          datasets: [{
            ...data.datasets[0],
            label: 'Consumo de Combustible (L)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)'
          }]
        },
        options: config
      }));
    }

    // Gráfica 3 - Líneas comparativas
    const ctx3 = document.getElementById('chart3') as HTMLCanvasElement;
    if (ctx3) {
      charts.push(new Chart(ctx3, {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Modelo A',
              data: [150, 180, 220, 190, 230, 250],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
              fill: false
            },
            {
              label: 'Modelo B',
              data: [120, 160, 190, 170, 200, 220],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 1,
              fill: false
            }
          ]
        },
        options: config
      }));
    }

    // Limpiar las gráficas cuando el componente se desmonte
    return () => {
      charts.forEach(chart => chart.destroy());
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Car className="h-8 w-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">Reportes - Flotilla 1</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver al Dashboard</span>
            </button>
          </div>

          {/* Grid de gráficas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gráfica 1 */}
            <div className="bg-white p-4 rounded-lg shadow-sm chart-wrapper">
              <h3 className="text-lg font-semibold mb-4">Distancia Recorrida</h3>
              <div className="chart-container">
                <canvas id="chart1"></canvas>
              </div>
            </div>

            {/* Gráfica 2 */}
            <div className="bg-white p-4 rounded-lg shadow-sm chart-wrapper">
              <h3 className="text-lg font-semibold mb-4">Consumo de Combustible</h3>
              <div className="chart-container">
                <canvas id="chart2"></canvas>
              </div>
            </div>

            {/* Gráfica 3 */}
            <div className="bg-white p-4 rounded-lg shadow-sm chart-wrapper">
              <h3 className="text-lg font-semibold mb-4">Distribución por Modelo</h3>
              <div className="chart-container">
                <canvas id="chart3"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Flotilla1;