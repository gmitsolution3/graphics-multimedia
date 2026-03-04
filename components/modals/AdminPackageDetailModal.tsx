import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/utils";
import { Calendar, Check, X, FileText, Star } from "lucide-react";
import { IPackage, IPackageService } from "@/types";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedPackage: IPackage | null;
}

export default function AdminPackageDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedPackage,
}: IProps) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        {selectedPackage && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {selectedPackage.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    {selectedPackage.name}
                    {selectedPackage.popular && (
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-amber-100 text-amber-700"
                      >
                        <Star className="h-3 w-3 fill-amber-500" />
                        Popular
                      </Badge>
                    )}
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    {selectedPackage.description}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Pricing Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Price
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(selectedPackage.price)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      /{selectedPackage.period}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Package ID
                  </div>
                  <div className="font-mono text-sm bg-background px-3 py-2 rounded border">
                    {selectedPackage._id}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Created:
                  </span>
                  <span className="font-medium">
                    {formatDate(selectedPackage.createdAt)}
                  </span>
                </div>
                {selectedPackage.updatedAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Updated:
                    </span>
                    <span className="font-medium">
                      {formatDate(selectedPackage.updatedAt)}
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Services Included */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Services Included
                </h3>
                <div className="space-y-3">
                  {selectedPackage.services.map(
                    (service: IPackageService, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                      >
                        <div className="mt-0.5">
                          {service.included ? (
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                              <X className="h-3 w-3 text-red-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {service.name}
                            </span>
                            {service.included ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                Included
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-red-50 text-red-700 border-red-200"
                              >
                                Not Included
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Services
                  </span>
                  <span className="font-semibold">
                    {selectedPackage.services.length}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">
                    Included Services
                  </span>
                  <span className="font-semibold text-green-600">
                    {
                      selectedPackage.services.filter(
                        (s: IPackageService) => s.included,
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">
                    Coverage
                  </span>
                  <span className="font-semibold">
                    {(
                      (selectedPackage.services.filter(
                        (s: IPackageService) => s.included,
                      ).length /
                        selectedPackage.services.length) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
