// components/modals/AdminInfluencerBookingDetailModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Mail,
  Phone,
  Building2,
  FileText,
  Clock,
  DollarSign,
  Video,
  User,
  X,
} from "lucide-react";
import { IBookedInfluencer } from "@/types";
import { formatDate, formatPrice, getInitials } from "@/utils";

interface IModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedBooking: IBookedInfluencer | null;
}

export default function AdminInfluencerBookingDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedBooking,
}: IModalProps) {
  if (!selectedBooking) return null;

  const { influencer } = selectedBooking;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Booking Details
          </DialogTitle>
          <DialogDescription>
            Complete information about this influencer booking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Client Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Client Information
            </h3>
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-muted">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(selectedBooking.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-lg">
                    {selectedBooking.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Client
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedBooking.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedBooking.phone}</span>
                </div>
                {selectedBooking.company && (
                  <div className="flex items-center gap-2 col-span-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedBooking.company}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Influencer Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Video className="h-4 w-4" />
              Influencer Information
            </h3>
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-muted">
                  {influencer.image ? (
                    <AvatarImage
                      src={influencer.image}
                      alt={influencer.name}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(influencer.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h4 className="font-semibold text-lg">
                    {influencer.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {influencer.designation}
                  </p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground line-clamp-3">
                  {influencer.bio}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Booking Details
            </h3>
            <div className="bg-muted/30 rounded-lg p-4 space-y-4">
              {/* Service Info */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Selected Service
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {selectedBooking.duration}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Price
                  </p>
                  <p className="font-semibold text-lg">
                    {formatPrice(selectedBooking.price)}
                  </p>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Project Details</p>
                <p className="text-sm text-muted-foreground bg-background rounded p-3">
                  {selectedBooking.projectDetails}
                </p>
              </div>

              {/* Booking Timeline */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Booked: {formatDate(selectedBooking.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                // Handle contact client action
                window.location.href = `mailto:${selectedBooking.email}`;
              }}
            >
              Contact Client
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => setIsModalOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
