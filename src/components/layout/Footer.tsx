import React from "react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("w-full py-4 px-6 bg-black shadow-md", className)}>
      <div className="container mx-auto">
        <div className="h-12 flex items-center justify-center">
          <div className="h-full flex items-center">
            <img 
              src="/EJAD_LOGO.png" 
              alt="EJAD Global Solutions" 
              className="h-full object-contain brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
