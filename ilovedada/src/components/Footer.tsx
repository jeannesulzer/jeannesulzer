import { Instagram } from "lucide-react";
import logoImg from "@/assets/logo-ilovedada.png";

const Footer = () => (
      <footer className="py-12 px-6 md:px-8 border-t border-border">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <img src={logoImg} alt="I Love Dada" className="h-14 w-auto" />
          </div>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/_i_love_dada" target="_blank" rel="noopener noreferrer" className="font-body text-[12px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <Instagram size={14} strokeWidth={1.5} /> @_i_love_dada
            </a>
          </div>
          <p className="font-body text-[11px] text-muted-foreground/60 flex items-center gap-1">
            © 2025 <img src={logoImg} alt="I Love Dada" className="inline-block h-4 w-auto" /> · Phnom Penh · Pyla · New York
          </p>
        </div>
      </footer>);

export default Footer;
