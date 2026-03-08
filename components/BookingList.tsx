import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Video, MapPin, MoreVertical } from "lucide-react";

const statusStyles = {
  confirmed:
    "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20",
  pending:
    "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/20",
  urgent: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function BookingList({ bookings }: { bookings: any }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Today's Appointments
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((appointment: any) => (
          <div
            key={appointment.id}
            className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={appointment.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {appointment.patient
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground truncate">
                  {appointment.patient}
                </span>
                <Badge
                  variant="outline"
                  className={
                    statusStyles[
                      appointment.status as keyof typeof statusStyles
                    ]
                  }
                >
                  {appointment.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {appointment.time}
                </span>
                <span className="flex items-center gap-1">
                  {appointment.mode === "video" ? (
                    <Video className="h-3.5 w-3.5" />
                  ) : (
                    <MapPin className="h-3.5 w-3.5" />
                  )}
                  {appointment.mode === "video"
                    ? "Video Call"
                    : "In-person"}
                </span>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="hidden sm:inline-flex"
            >
              {appointment.type}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
