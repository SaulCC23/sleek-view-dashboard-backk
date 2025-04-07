
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/dashboard/Dashboard";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in" 
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          control de flotillas
        </h1>
        <p className="text-gray-500 mb-8 animate-fade-in opacity-0"
           style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          Bienvenido al panel de control de flotilla aqui podras ver el estado de las flotillas y los reportes de cada vehiculo.
        </p>
        
        <Dashboard />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
