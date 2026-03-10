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
          <p className="text-sm opacity-30">
            No services selected yet
          </p>
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

      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
        {selectedServices.map((item) => {
          const serviceTotal = item.price * item.quantity;

          return (
            <div
              key={item.serviceId}
              className="space-y-2 pb-3 border-b border-border/20 last:border-0"
            >
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal">
                    {item.name}
                  </span>
                  <button
                    onClick={() => onRemoveService(item.serviceId)}
                    className="opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
                    title="Remove service"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs opacity-40">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-base font-light">
                    ${serviceTotal}
                  </span>
                </div>
              </div>

              {/* Quantity controls in summary - Larger size */}
              <div className="flex items-center gap-3 ml-4">
                <span className="text-xs opacity-40">
                  Adjust quantity:
                </span>
                <div className="flex items-center border border-border/40 rounded-md">
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item.serviceId,
                        item.quantity - 1,
                      )
                    }
                    className="p-1.5 hover:bg-primary/5 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item.serviceId,
                        item.quantity + 1,
                      )
                    }
                    className="p-1.5 hover:bg-primary/5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs opacity-60">
                  ${item.price} × {item.quantity} = ${serviceTotal}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border/40 pt-4">
        {/* Detailed breakdown */}
        <div className="space-y-1 mb-3">
          {selectedServices.map((item) => (
            <div
              key={item.serviceId}
              className="flex justify-between text-xs opacity-30"
            >
              <span>{item.name}</span>
              <span>
                {item.quantity} × ${item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border/20">
          <span className="text-xs opacity-40">Total items</span>
          <span className="text-base">
            {selectedServices.reduce(
              (sum, item) => sum + item.quantity,
              0,
            )}
          </span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="text-sm opacity-40">Subtotal</span>
          <span className="text-2xl font-light">${totalPrice}</span>
        </div>
      </div>

      <div className="w-12 h-px bg-primary/30 mt-4"></div>
    </div>
  );
}
