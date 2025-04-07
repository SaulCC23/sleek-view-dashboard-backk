import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registro de componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Props esperadas desde Flotilla1
interface CsvChartProps {
  startDate: string;
  endDate: string;
  selectedModel: string;
}

const CsvChart: React.FC<CsvChartProps> = ({ startDate, endDate, selectedModel }) => {
  const [, setCsvData] = useState([]);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch('csv/datos.csv');
        const csvText = await response.text();

        Papa.parse(csvText, {
          complete: (result) => {
            setCsvData(result.data);
            generateChartData(result.data);
          },
          header: true,
          skipEmptyLines: true,
        });
      } catch (error) {
        console.error('Error al obtener el archivo CSV:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCsvData();
  }, [startDate, endDate, selectedModel]);

  const generateChartData = (data: any[]) => {
    if (!startDate || !endDate || !selectedModel) {
      setChartData(null);
      return;
    }

    const fechaInicio = new Date(startDate);
    const fechaFin = new Date(endDate);
    fechaFin.setHours(23, 59, 59, 999); // incluir todo el día

    // Filtrar los datos por modelo y fechas
    const filteredData = data.filter((row) => {
      const rowDate = new Date(row.dia);
      return (
        row.vehiculo === selectedModel &&
        rowDate >= fechaInicio &&
        rowDate <= fechaFin
      );
    });

    const labels = filteredData.map((row) => row.dia);
    const values = filteredData.map((row) => parseFloat(row.consumo_L));

    if (labels.length > 0 && values.length > 0) {
      const newChartData = {
        labels,
        datasets: [
          {
            label: 'Litros Consumidos',
            data: values,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointRadius: 5,
            tension: 0.1,
          },
        ],
      };
      setChartData(newChartData);
    } else {
      setChartData(null);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div>
          <h3>Gráfica de Litros Consumidos</h3>
          {chartData && chartData.labels.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p>No hay datos disponibles para mostrar la gráfica</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CsvChart;