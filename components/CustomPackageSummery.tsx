// CustomPackageSummary.tsx
import { X, Minus, Plus } from "lucide-react";
import { IService } from "@/types";

interface SelectedServiceWithQuantity {
  serviceId: string;
  quantity: number;
  name: string;
  price: number;
}

interface CustomPackageSummaryProps {
  selectedServices: SelectedServiceWithQuantity[];
  services: IService[];
  totalPrice: number;
  onUpdateQuantity: (serviceId: string, newQuantity: number) => void;
  onRemoveService: (serviceId: string) => void;
}

export default function CustomPackageSummary({
  selectedServices,
  services,
  totalPrice,
  onUpdateQuantity,
  onRemoveService,
}: CustomPackageSummaryProps) {
  if (selectedServices.length === 0) {
    return (
      <div className="mt-10 mb-8 p-6 border border-border/40">
        <h3 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-4">
          Your custom package
        </h3>
        <div className="text-center py-8">
          <p className="text-sm opacity-30">No services selected yet</p>
          <p className="opacity-20 mt-2">
            Select services to build your package
          </p>
        </div>
        <div className="w-12 h-px bg-primary/30 mt-4"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-8 p-6 border border-border/40">
      <h3 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-4">
        Your custom package
      </h3>

      <div className="space-y-4 mb-6 max-h-[200px] overflow-y-auto pr-2">
        {selectedServices.map((item) => {
          const serviceTotal = item.price * item.quantity;
          
          return (
            <div key={item.serviceId} className="space-y-2">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-60">
                    {item.name}
                  </span>
                  <button
                    onClick={() => onRemoveService(item.serviceId)}
                    className="opacity-0 group-hover:opacity-30 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-sm">${serviceTotal}</span>
              </div>
              
              {/* Quantity controls in summary */}
              <div className="flex items-center gap-2 ml-4">
                <span className="text-[10px] opacity-40">Qty:</span>
                <div className="flex items-center border border-border/40">
                  <button
                    onClick={() => onUpdateQuantity(item.serviceId, item.quantity - 1)}
                    className="p-0.5 hover:bg-primary/5 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-2.5 h-2.5" />
                  </button>
                  <span className="w-6 text-center text-[10px]">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.serviceId, item.quantity + 1)}
                    className="p-0.5 hover:bg-primary/5 transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
                <span className="text-[10px] opacity-40">
                  ${item.price} each
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border/40 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs opacity-40">Subtotal</span>
          <span className="text-lg font-light">${totalPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-40">Total items</span>
          <span className="text-sm">{selectedServices.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
      </div>

      <div className="w-12 h-px bg-primary/30 mt-4"></div>
    </div>
  );
}