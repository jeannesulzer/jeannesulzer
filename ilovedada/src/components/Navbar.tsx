import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Instagram, ChevronDown } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import logoImg from "@/assets/logo-ilovedada.png";
import { CATEGORIES } from "@/lib/shopify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const shopCategories = CATEGORIES.filter(c => c.key !== 'all');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center py-4 px-6 md:px-8">
        <div className="hidden md:flex items-center gap-8">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="font-body text-[12px] font-medium transition-colors hover:text-primary flex items-center gap-1 text-muted-foreground"
            >
              E-shop <ChevronDown size={12} className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
            </button>
            {shopOpen && (
              <div className="absolute top-full left-0 mt-3 min-w-[200px] rounded-lg shadow-lg border py-2 bg-background border-border">
                {shopCategories.map(cat => (
                  <a
                    key={cat.key}
                    href={`/eshop?cat=${cat.key}`}
                    onClick={() => {
                      setShopOpen(false);
                    }}
                    className="block px-4 py-2 font-body text-[12px] transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    {cat.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <Link to="/qui-suis-je" className="font-body text-[12px] font-medium transition-colors hover:text-primary text-muted-foreground">Qui suis-je</Link>
          <Link to="/histoire" className="font-body text-[12px] font-medium transition-colors hover:text-primary text-muted-foreground">Histoire</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
            {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>

        <Link to="/" className="flex justify-center">
          <img src={logoImg} alt="I Love Dada" className="h-12 md:h-14 w-auto" />
        </Link>

        <div className="flex items-center gap-5 justify-end">
          <a href="https://instagram.com/_i_love_dada" target="_blank" rel="noopener noreferrer" className="hidden md:block transition-colors hover:text-primary text-muted-foreground">
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <CartDrawer />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-6 space-y-1 bg-background/95">
          <button
            onClick={() => setMobileShopOpen(!mobileShopOpen)}
            className="w-full flex items-center justify-between py-3 font-body text-sm text-muted-foreground"
          >
            E-shop <ChevronDown size={14} className={`transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileShopOpen && (
            <div className="pl-4 space-y-1 pb-2">
              {shopCategories.map(cat => (
                <a
                  key={cat.key}
                  href={`/eshop?cat=${cat.key}`}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="block py-2 font-body text-[13px] text-muted-foreground"
                >
                  {cat.label}
                </a>
              ))}
            </div>
          )}
          <Link to="/qui-suis-je" onClick={() => setIsOpen(false)} className="block py-3 font-body text-sm text-muted-foreground">Qui suis-je</Link>
          <Link to="/histoire" onClick={() => setIsOpen(false)} className="block py-3 font-body text-sm text-muted-foreground">Histoire</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
