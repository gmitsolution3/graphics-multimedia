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
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { SetStateAction, Dispatch } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils";

import { formatPrice } from "@/utils";
import { IPackageService, IBooking } from "@/types";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedBooking: IBooking | null;
}

export default function AdminBookingDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedBooking,
}: IProps) {
  console.log(selectedBooking);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Booking Details
          </DialogTitle>
          <DialogDescription>
            Complete information about the client and their selected
            package
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          {selectedBooking && (
            <div className="space-y-6">
              {/* Client Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Client Information
                </h3>
                <div className="grid grid-cols-1 gap-4 bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
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
                          {selectedBooking.selectedPackage.name}
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
                        {formatPrice(
                          selectedBooking.selectedPackage.price,
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        per {selectedBooking.selectedPackage.period}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {selectedBooking.selectedPackage.services.map(
                      (service: IPackageService, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          {service.included ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span
                            className={
                              service.included
                                ? ""
                                : "text-muted-foreground"
                            }
                          >
                            {service.name}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
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
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Booking Information
                </h3>
                <div className="grid grid-cols-1 gap-4 bg-muted/30 p-4 rounded-lg">
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

        <div className="flex justify-end gap-2 mt-4">
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
