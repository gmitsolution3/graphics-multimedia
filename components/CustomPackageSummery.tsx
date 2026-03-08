"use client";

import { X } from "lucide-react";
import { IService } from "@/types";

interface IProps {
  selectedServices: string[];
  services: IService[];
  totalPrice: number;
  onRemoveService: (serviceId: string) => void;
}

export default function CustomPackageSummary({
  selectedServices,
  services,
  totalPrice,
  onRemoveService,
}: IProps) {
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

      <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto pr-2">
        {selectedServices.map((id) => {
          const service = services.find(
            (s: IService) => s._id === id,
          );
          return (
            <div
              key={id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-60">
                  {service?.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveService(id);
                  }}
                  className="opacity-0 group-hover:opacity-30 hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <span className="text-sm">${service?.price}</span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border/40 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs opacity-40">
            Estimated monthly
          </span>
          <span className="text-2xl font-light">${totalPrice}</span>
        </div>
      </div>

      <div className="w-12 h-px bg-primary/30 mt-4"></div>
    </div>
  );
}
