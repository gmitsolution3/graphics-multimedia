import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction } from "react";
import { IJobApplication } from "@/types";

import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import {
  Mail,
  Calendar,
  Briefcase,
  MapPin,
  FileText,
  User,
  DollarSign,
  ExternalLink,Clock
} from "lucide-react";

import { formatPrice, formatDate} from "@/utils";
import { Button } from "@/components/ui/button";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedApplication: IJobApplication | null;
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
};

export default function AdminJobApplicationModal({
  isModalOpen,
  setIsModalOpen,
  selectedApplication,
}: IProps) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Application Details
          </DialogTitle>
          <DialogDescription>
            Complete information about the job application
          </DialogDescription>
        </DialogHeader>

        {selectedApplication && (
          <div className="space-y-6 py-4">
            {/* Applicant Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Applicant Information
              </h3>
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-muted">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(selectedApplication.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg">
                      {selectedApplication.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      {selectedApplication.email}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedApplication.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        Expected Salary
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(
                          selectedApplication.expectedSalary,
                        )}
                        /month
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Resume</p>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm text-primary"
                        onClick={() =>
                          window.open(
                            selectedApplication.resumeLink,
                            "_blank",
                          )
                        }
                      >
                        {truncateText(
                          selectedApplication.resumeLink,
                          40,
                        )}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Job Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job Information
              </h3>
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-lg">
                    {selectedApplication.jobTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.jobId?.department} •{" "}
                    {selectedApplication.jobId?.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">
                      Employment Type
                    </p>
                    <p className="font-medium">
                      {selectedApplication.jobId?.employmentType}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Workplace</p>
                    <p className="font-medium">
                      {selectedApplication.jobId?.workplaceType}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      Experience Level
                    </p>
                    <p className="font-medium">
                      {selectedApplication.jobId?.experienceLevel}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      Salary Range
                    </p>
                    <p className="font-medium">
                      {selectedApplication.jobId?.salaryRange &&
                        `${formatPrice(selectedApplication.jobId.salaryRange.min)} - ${formatPrice(selectedApplication.jobId.salaryRange.max)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Applied:{" "}
                      {formatDate(selectedApplication.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Deadline:{" "}
                      {selectedApplication.jobId
                        ?.applicationDeadline &&
                        formatDate(
                          selectedApplication.jobId.applicationDeadline.toString(),
                        )}
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
                onClick={() =>
                  (window.location.href = `mailto:${selectedApplication.email}`)
                }
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Applicant
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
