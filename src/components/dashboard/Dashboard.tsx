import React from "react";
import { Car, Truck, Bus, CarFront } from "lucide-react";
import DashboardCard from "./DashboardCard";

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const cardData = [
    {
      title: "Flotilla 1",
      description: "Visualiza informes y estadísticas detalladas de la flotilla 1",
      icon: <Car className="h-6 w-6 text-white" />, 
      color: "bg-blue-500",
      route: "/reports"
    },
    {
      title: "Flotilla 2",
      description: "Visualiza informes y estadísticas detalladas de la flotilla 2", 
      icon: <Truck className="h-6 w-6 text-white" />,
      color: "bg-green-500",
      route: "/users"
    },
    {
      title: "Flotilla 3",
      description: "Visualiza informes y estadísticas detalladas de la flotilla 3",
      icon: <Bus className="h-6 w-6 text-white" />,
      color: "bg-purple-500",
      route: "/statistics"
    },
    {
      title: "Flotilla 4",
      description: "Visualiza informes y estadísticas detalladas de la flotilla 4",
      icon: <CarFront className="h-6 w-6 text-white" />,
      color: "bg-orange-500",
      route: "/settings"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {cardData.map((card, index) => (
        <DashboardCard 
          key={card.title}
          title={card.title}
          description={card.description}
          icon={card.icon}
          color={card.color}
          route={card.route}
          className="animate-fade-in opacity-0"
          style={{ 
            animationDelay: `${index * 100}ms`, 
            animationFillMode: 'forwards'
          }}
        />
      ))}
    </div>
  );
};

export default Dashboard;
