import { Chart, ChartConfiguration } from 'chart.js/auto';

interface DatoVehiculo {
  dia: Date;
  vehiculo: string;
  distancia_km: number;
  consumo_L: number;
}

export const modelos = [
  "explore_sport", "ram_700_2016", "saveiro_2024", "saveiro_2018",
  "saveiro_2022", "saveiro_2016", "np_300_2014", "renault_duster 2020",
  "saveiro_2020", "nissan_nP300", "tornado_2017", "saveiro_2023"
];

export const parseDate = (str: string): Date => {
  console.log('Parsing date:', str);
  
  // Si la fecha viene en formato YYYY-MM-DD (desde el input date)
  if (str.includes('-')) {
    const date = new Date(str);
    console.log('Parsed from YYYY-MM-DD:', date.toISOString());
    return date;
  }
  
  // Si la fecha viene en formato DD/MM/YYYY (desde el CSV)
  try {
    const [d, m, y] = str.split("/").map(num => num.trim());
    const date = new Date(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`);
    console.log('Parsed from DD/MM/YYYY:', date.toISOString());
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', str);
      throw new Error('Invalid date');
    }
    
    return date;
  } catch (error) {
    console.error('Error parsing date:', str, error);
    throw error;
  }
};

export const generarDatosFicticios = () => {
  const fechas = Array.from({ length: 30 }, (_, i) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - (29 - i));
    return fecha;
  });

  const datos = fechas.map(fecha => ({
    dia: fecha,
    vehiculo: modelos[Math.floor(Math.random() * modelos.length)],
    distancia_km: Math.floor(Math.random() * 500) + 100,
    consumo_L: Math.floor(Math.random() * 50) + 10
  }));

  return datos;
};

export const generarGraficaDistancia = (
  datos: any[],
  modelo: string,
  fechaInicio: Date,
  fechaFin: Date,
  chartId: string
): Chart | null => {
  const ctx = document.getElementById(chartId) as HTMLCanvasElement;
  if (!ctx) return null;

  const datosFiltrados = datos.filter(d => d.vehiculo === modelo);
  const fechas = datosFiltrados.map(d => d.dia.toLocaleDateString('es-ES'));
  const distancias = datosFiltrados.map(d => d.distancia_km);

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: fechas,
      datasets: [{
        label: `Distancia recorrida - ${modelo}`,
        data: distancias,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Kilómetros'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Fecha'
          }
        }
      }
    }
  };

  return new Chart(ctx, config);
};

export const generarGraficaCombustible = (
  datos: any[],
  modelo: string,
  fechaInicio: Date,
  fechaFin: Date,
  chartId: string
): Chart | null => {
  const ctx = document.getElementById(chartId) as HTMLCanvasElement;
  if (!ctx) return null;

  const datosFiltrados = datos.filter(d => d.vehiculo === modelo);
  const fechas = datosFiltrados.map(d => d.dia.toLocaleDateString('es-ES'));
  const consumos = datosFiltrados.map(d => d.consumo_L);

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: fechas,
      datasets: [{
        label: `Consumo de combustible - ${modelo}`,
        data: consumos,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Litros'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Fecha'
          }
        }
      }
    }
  };

  return new Chart(ctx, config);
};

export const compararModelos = (
  resumenVehiculos: { modelo: string; resumen: { [key: string]: number } }[],
  chartId: string
): Chart | null => {
  const ctx = document.getElementById(chartId) as HTMLCanvasElement;
  if (!ctx) return null;

  const fechas = Object.keys(resumenVehiculos[0].resumen);
  const datasets = resumenVehiculos.map((vehiculo, index) => ({
    label: vehiculo.modelo,
    data: fechas.map(fecha => vehiculo.resumen[fecha] || 0),
    borderColor: `hsl(${index * 90}, 70%, 50%)`,
    backgroundColor: `hsla(${index * 90}, 70%, 50%, 0.5)`,
    tension: 0.1
  }));

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: fechas,
      datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Consumo (L)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Fecha'
          }
        }
      }
    }
  };

  return new Chart(ctx, config);
}; 