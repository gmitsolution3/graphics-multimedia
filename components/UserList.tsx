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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const patients = [
  {
    id: 1,
    name: "Alice Thompson",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    condition: "Hypertension",
    lastVisit: "Today",
    status: "active",
  },
  {
    id: 2,
    name: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    condition: "Diabetes Type 2",
    lastVisit: "Yesterday",
    status: "follow-up",
  },
  {
    id: 3,
    name: "Maria Garcia",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
    condition: "Cardiac Arrhythmia",
    lastVisit: "2 days ago",
    status: "critical",
  },
  {
    id: 4,
    name: "John Martinez",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    condition: "Post-surgery",
    lastVisit: "3 days ago",
    status: "recovery",
  },
];

const statusStyles = {
  active: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  "follow-up": "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))]",
  critical: "bg-destructive/10 text-destructive",
  recovery: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
};

export default function UserList() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Recent Patients
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={patient.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {patient.name}
                    </span>
                    <Badge
                      className={
                        statusStyles[
                          patient.status as keyof typeof statusStyles
                        ]
                      }
                      variant="secondary"
                    >
                      {patient.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {patient.condition}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {patient.lastVisit}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
