"use client";

import { Check, Plus, Minus } from "lucide-react";
import { CustomServiceLoader } from "@/components/loaders/CustomServiceLoader";
import CustomPackageSummary from "@/components/CustomPackageSummery";
import { IService } from "@/types";

// Define interface for selected service with quantity
export interface SelectedServiceWithQuantity {
  serviceId: string;
  quantity: number;
  name: string;
  price: number;
}

interface CustomPackageSelectionProps {
  services: IService[];
  isLoading: boolean;
  selectedServices: SelectedServiceWithQuantity[];
  onToggleService: (serviceId: string) => void;
  onUpdateQuantity: (serviceId: string, newQuantity: number) => void;
  totalPrice: number;
}

export default function CustomPackageSelection({
  services,
  isLoading,
  selectedServices,
  onToggleService,
  onUpdateQuantity,
  totalPrice,
}: CustomPackageSelectionProps) {
  const getServiceQuantity = (serviceId: string) => {
    return (
      selectedServices.find((s) => s.serviceId === serviceId)
        ?.quantity || 0
    );
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s.serviceId === serviceId);
  };

  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm tracking-[0.2em] uppercase opacity-40">
          Available services
        </h3>
        {!isLoading && (
          <span className="text-xs opacity-40">
            {selectedServices.length} service
            {selectedServices.length !== 1 ? "s" : ""} selected
          </span>
        )}
      </div>

      <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <CustomServiceLoader key={index} />
            ))}
          </>
        ) : (
          services.map((service: IService) => {
            const isSelected = isServiceSelected(service._id);
            const quantity = getServiceQuantity(service._id);

            return (
              <div
                key={service._id}
                className={`p-4 border transition-all duration-300 group ${
                  isSelected
                    ? "border-primary/30"
                    : "border-border/40 hover:border-border/60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div
                      className="flex items-center gap-2 mb-1 cursor-pointer"
                      onClick={() => onToggleService(service._id)}
                    >
                      <div
                        className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-3 h-3 text-primary" />
                        )}
                      </div>
                      <h5 className="text-sm font-light">
                        {service.name}
                      </h5>
                    </div>
                    <p className="text-xs opacity-40 pl-6">
                      {service.description}
                    </p>

                    {/* Quantity Selector - Only shown when service is selected */}
                    {isSelected && (
                      <div className="pl-6 mt-3 flex items-center gap-3">
                        <span className="text-xs opacity-40">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-border/40">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateQuantity(
                                service._id,
                                quantity - 1,
                              );
                            }}
                            className="p-1 hover:bg-primary/5 transition-colors"
                            disabled={quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs">
                            {quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateQuantity(
                                service._id,
                                quantity + 1,
                              );
                            }}
                            className="p-1 hover:bg-primary/5 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs opacity-60">
                          ${service.price} each
                        </span>
                        <span className="text-xs font-medium ml-auto">
                          Total: ${service.price * quantity}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-light ml-4">
                    ${service.price}
                  </span>
                </div>

                {/* Accent line */}
                <div
                  className={`w-8 h-px mt-3 transition-all duration-300 ${
                    isSelected
                      ? "bg-primary/60 w-12"
                      : "bg-primary/30 group-hover:w-12"
                  }`}
                ></div>
              </div>
            );
          })
        )}
      </div>

      {/* Selected Services Summary */}
      {!isLoading && (
        <CustomPackageSummary
          selectedServices={selectedServices}
          services={services}
          totalPrice={totalPrice}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveService={(serviceId) =>
            onUpdateQuantity(serviceId, 0)
          }
        />
      )}

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
