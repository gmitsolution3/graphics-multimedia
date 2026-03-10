import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Building2,
  FileText,
  Clock,
  Tag,
  CheckCircle2,
  XCircle,
  Phone,
  Package,
  Calendar,
  DollarSign,
  Hash,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { SetStateAction, Dispatch } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils";

import { formatPrice } from "@/utils";
import {
  IPackageService,
  ICustomPackageService,
  IBooking,
} from "@/types";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedBooking: IBooking | null;
}

// Type guard to check if service is custom package service
const isCustomService = (
  service: any,
): service is ICustomPackageService => {
  return "price" in service && "quantity" in service;
};

export default function AdminBookingDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedBooking,
}: IProps) {
  console.log(selectedBooking);

  // Calculate total price for custom packages
  const calculateCustomTotal = () => {
    if (
      !selectedBooking ||
      selectedBooking.packageModel !== "CustomPackage"
    )
      return null;

    return selectedBooking.selectedPackage.services.reduce(
      (total: number, service: any) => {
        if (isCustomService(service) && service.included) {
          return total + service.price * service.quantity;
        }
        return total;
      },
      0,
    );
  };

  const customTotal = calculateCustomTotal();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col p-0 gap-0">
        {/* Fixed Header */}
        <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Booking Details
          </DialogTitle>
          <DialogDescription>
            Complete information about the client and their selected
            package
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content - takes remaining space */}
        <ScrollArea className="flex-1 px-6 min-h-0">
          {selectedBooking && (
            <div className="space-y-6 py-2">
              {/* Booking Type Badge */}
              <div className="flex justify-end">
                <Badge
                  variant={
                    selectedBooking.bookingType === "custom"
                      ? "default"
                      : "secondary"
                  }
                >
                  {selectedBooking.bookingType === "custom"
                    ? "Custom Package"
                    : "Standard Package"}
                </Badge>
              </div>

              {/* Client Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Client Information
                </h3>
                <div className="grid grid-cols-1 gap-2 bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-1 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Name:</span>
                    <span>{selectedBooking.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span className="text-primary">
                      {selectedBooking.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <span>{selectedBooking.phone}</span>
                  </div>
                  {selectedBooking.company && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Company:</span>
                      <span>{selectedBooking.company}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Package Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Selected Package
                </h3>
                <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-xl font-bold">
                          Custom Package
                        </h4>
                        {selectedBooking.selectedPackage.popular && (
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 border-amber-200"
                          >
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedBooking.selectedPackage.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {selectedBooking.packageModel ===
                          "CustomPackage" && customTotal
                          ? formatPrice(customTotal)
                          : formatPrice(
                              selectedBooking.selectedPackage.price,
                            )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        per {selectedBooking.selectedPackage.period}
                      </div>
                    </div>
                  </div>

                  {/* Services List - Handles both standard and custom services */}
                  <div className="mt-4">
                    <h5 className="text-sm font-medium mb-3">
                      Included Services:
                    </h5>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedBooking.selectedPackage.services.map(
                        (
                          service:
                            | IPackageService
                            | ICustomPackageService,
                          index: number,
                        ) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              service.included
                                ? "bg-green-50/50 border-green-200"
                                : "bg-muted/30 border-muted opacity-60"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {service.included ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span
                                className={
                                  service.included
                                    ? "font-medium"
                                    : "text-muted-foreground"
                                }
                              >
                                {service.name}
                              </span>
                            </div>

                            {/* Custom service details with price and quantity */}
                            {isCustomService(service) &&
                              service.included && (
                                <div className="flex flex-col items-end gap-0.5 text-right">
                                  <div className="text-sm text-muted-foreground">
                                    {formatPrice(service.price)} ×{" "}
                                    {service.quantity} Item
                                  </div>
                                  <div className="font-medium text-primary">
                                    {formatPrice(
                                      service.price *
                                        service.quantity,
                                    )}
                                  </div>
                                </div>
                              )}

                            {/* Simple included indicator for standard services */}
                            {!isCustomService(service) &&
                              service.included && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-50"
                                >
                                  Included
                                </Badge>
                              )}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Package Summary for Custom Packages */}
                  {selectedBooking.packageModel === "CustomPackage" &&
                    customTotal && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">
                            Package Total:
                          </span>
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(customTotal)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          *Custom package with selected services and
                          quantities
                        </p>
                      </div>
                    )}
                </div>
              </div>

              <Separator />

              {/* Project Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Project Details
                </h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedBooking.projectDetails}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Booking Metadata */}
              <div className="space-y-4 pb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Booking Information
                </h3>
                <div className="grid grid-cols-1 gap-2 bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Booked On:</span>
                    <span>
                      {formatDate(selectedBooking.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Booking ID:</span>
                    <span className="font-mono text-xs">
                      {selectedBooking._id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      Package Model:
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {selectedBooking.packageModel}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Last Updated:</span>
                    <span>
                      {formatDate(selectedBooking.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Fixed Footer */}
        <div className="flex justify-end gap-2 border-t px-6 py-4 flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
          <Button>Contact Client</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
