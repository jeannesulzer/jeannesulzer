import { useState, useEffect } from "react";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore, getLineKey } from "@/stores/cartStore";
import logoUrl from "@/assets/logo-ilovedada.png";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative hover:opacity-70 transition-opacity">
          <ShoppingCart size={18} strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-foreground text-background flex items-center justify-center text-[9px] font-body font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full border-l border-border bg-background">
        <SheetHeader className="flex-shrink-0 pb-6 border-b border-border">
          <SheetTitle className="font-display text-2xl font-light">Panier</SheetTitle>
          <SheetDescription className="font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {totalItems === 0 ? "Vide" : `${totalItems} article${totalItems !== 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">Votre panier est vide</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-6">
                  {items.map((item) => {
                    const lineKey = getLineKey(item);
                    const image = item.product.node.images?.edges?.[0]?.node;
                    return (
                    <div key={lineKey} className="flex gap-4">
                      <div className="w-20 h-24 overflow-hidden flex-shrink-0 bg-muted">
                        {image ? (
                          <img src={image.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        ) : (
                          <img src={logoUrl} alt="" className="w-full h-full object-contain p-3" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-base font-light text-foreground truncate">{item.product.node.title}</h4>
                        {item.variantTitle !== "Default Title" && (
                          <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{item.selectedOptions.map(o => o.value).join(' · ')}</p>
                        )}
                        <p className="font-body text-sm font-semibold text-foreground mt-2">{parseFloat(item.price.amount).toFixed(0)} {item.price.currencyCode}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => updateQuantity(lineKey, item.quantity - 1)} className="w-6 h-6 border border-border flex items-center justify-center hover:border-foreground transition-colors">
                            <Minus size={10} />
                          </button>
                          <span className="font-body text-xs w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(lineKey, item.quantity + 1)} className="w-6 h-6 border border-border flex items-center justify-center hover:border-foreground transition-colors">
                            <Plus size={10} />
                          </button>
                          <button onClick={() => removeItem(lineKey)} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex-shrink-0 pt-6 border-t border-border space-y-5">
                <div className="flex justify-between items-center">
                  <span className="font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Total</span>
                  <span className="font-body text-lg font-semibold">{items[0]?.price.currencyCode} {totalPrice.toFixed(0)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full bg-foreground text-background font-body text-[11px] font-semibold uppercase tracking-[0.2em] py-4 hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {isLoading || isSyncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><ExternalLink className="w-3.5 h-3.5" /> Commander</>}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
