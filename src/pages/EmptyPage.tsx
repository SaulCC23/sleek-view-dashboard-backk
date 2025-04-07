
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface EmptyPageProps {
  title: string;
}

const EmptyPage: React.FC<EmptyPageProps> = ({ title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-gray-100 transition-all duration-300"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al dashboard
        </Button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
        <div className="bg-white rounded-xl shadow-sm p-8 animate-fade-in">
          <p className="text-gray-500">Esta sección está en desarrollo.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmptyPage;
