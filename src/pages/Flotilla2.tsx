import React, { useEffect } from 'react';
import { Truck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import Footer from '@/components/layout/Footer';

const Flotilla2: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Datos de ejemplo
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Horas de Operación',
          data: [150, 180, 210, 190, 220, 240],
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

    // Gráfica 1 - Horas de Operación (Línea)
    const ctx1 = document.getElementById('userChart1') as HTMLCanvasElement;
    if (ctx1) {
      charts.push(new Chart(ctx1, {
        type: 'line',
        data: data,
        options: config
      }));
    }

    // Gráfica 2 - Eficiencia por Conductor (Barras)
    const ctx2 = document.getElementById('userChart2') as HTMLCanvasElement;
    if (ctx2) {
      charts.push(new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Conductor A', 'Conductor B', 'Conductor C', 'Conductor D', 'Conductor E'],
          datasets: [{
            label: 'Eficiencia (%)',
            data: [85, 92, 78, 95, 88],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: config
      }));
    }

    // Gráfica 3 - Líneas comparativas
    const ctx3 = document.getElementById('userChart3') as HTMLCanvasElement;
    if (ctx3) {
      charts.push(new Chart(ctx3, {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [
            {
              label: 'Modelo A',
              data: [120, 150, 180, 160, 190, 200],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
              fill: false
            },
            {
              label: 'Modelo B',
              data: [100, 130, 150, 140, 160, 180],
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
              <Truck className="h-8 w-8 text-green-500" />
              <h1 className="text-3xl font-bold text-gray-900">Usuarios - Flotilla 2</h1>
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
                <canvas id="userChart1"></canvas>
              </div>
            </div>

            {/* Gráfica 2 */}
            <div className="bg-white p-4 rounded-lg shadow-sm chart-wrapper">
              <h3 className="text-lg font-semibold mb-4">Consumo de Combustible</h3>
              <div className="chart-container">
                <canvas id="userChart2"></canvas>
              </div>
            </div>

            {/* Gráfica 3 */}
            <div className="bg-white p-4 rounded-lg shadow-sm chart-wrapper">
              <h3 className="text-lg font-semibold mb-4">Distribución por Modelo</h3>
              <div className="chart-container">
                <canvas id="userChart3"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Flotilla2; 