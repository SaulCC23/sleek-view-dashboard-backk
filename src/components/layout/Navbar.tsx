import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Aquí iría la lógica de cierre de sesión
    console.log("Cerrando sesión...");
    navigate("/login");
  };
  
  return (
    <nav className={cn("w-full py-4 px-6 flex items-center justify-between bg-black shadow-md", className)}>
      <div className="w-24">
        {/* Spacer para mantener el logo centrado */}
      </div>
      
      <div className="flex items-center justify-center">
        <div className="h-12 flex items-center justify-center transition-all duration-300">
          <img 
            src="/EJAD_LOGO.png" 
            alt="EJAD Global Solutions" 
            className="h-full object-contain brightness-0 invert"
          />
        </div>
      </div>
      
      <div className="w-24 flex justify-end">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
          className="hover:bg-gray-800 transition-colors duration-300 rounded-full"
        >
          <LogOut className="h-5 w-5 text-white" />
          <span className="sr-only">Salir</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
