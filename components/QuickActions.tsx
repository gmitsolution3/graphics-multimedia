import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface IActions {
  icon: LucideIcon;
  label: string;
  color: string;
}

export default function QuickActions({
  quickactions,
}: {
  quickactions: IActions[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {quickactions.map((action) => (
            <Button
              key={action.label}
              className={`flex h-auto flex-col gap-2 py-4 ${action.color}`}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs font-medium">
                {action.label}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
