"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowLeft,
  Calendar,
  Download,
  Eye,
  ExternalLink,
  Mail,
  MapPin,
  DollarSign,
  MoreHorizontal,
  FileText,
  Clock,
  Briefcase,
  Loader2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetJobApplications } from "@/hooks/swr/useGetJobApplications";
import { useGetById } from "@/hooks/swr/useGetById";
import { formatDate, formatPrice, getInitials } from "@/utils";
import JobApplicationTableLoader from "@/components/loaders/JobApplicationTableLoader";
import { IJobApplication } from "@/types";
import AdminJobApplicationModal from "@/components/modals/AdminJobApplicationModal";

export default function JobApplicationPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { data, isLoading } = useGetJobApplications(jobId as string);
  const { data: jobData, isLoading: isLoadingJob } = useGetById(
    "/job-postings",
    jobId as string,
  );

  const jobApplications: IJobApplication[] = data?.data || [];
  const job = jobData?.data;

  const [selectedApplication, setSelectedApplication] =
    useState<IJobApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (application: IJobApplication) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const columns: ColumnDef<IJobApplication>[] = [
    {
      accessorKey: "name",
      header: "Applicant",
      size: 180,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-muted">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {getInitials(row.original.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold truncate">
              {row.original.name}
            </div>
            <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {truncateText(row.original.email, 20)}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      size: 150,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-sm cursor-help">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                <span className="truncate">
                  {truncateText(row.original.address, 25)}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.original.address}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "resumeLink",
      header: "Resume",
      size: 100,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs gap-1"
          onClick={() =>
            window.open(row.original.resumeLink, "_blank")
          }
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Resume
        </Button>
      ),
    },
    {
      accessorKey: "expectedSalary",
      header: "Expected Salary",
      size: 120,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm">
          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium">
            {formatPrice(row.original.expectedSalary)}
          </span>
          <span className="text-xs text-muted-foreground">
            /month
          </span>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Applied On",
      size: 120,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-sm cursor-help">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{formatDate(row.original.createdAt)}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Applied:{" "}
                {new Date(row.original.createdAt).toLocaleString()}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: "actions",
      header: "",
      size: 80,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleViewDetails(row.original)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleViewDetails(row.original)}
              >
                View details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  window.open(row.original.resumeLink, "_blank")
                }
              >
                View resume
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href={`mailto:${row.original.email}`}>
                  Send email
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: jobApplications,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading || isLoadingJob) {
    return <JobApplicationTableLoader />;
  }

  if (!job) {
    return (
      <section className="container mx-auto px-5 lg:px-0 py-8">
        <Card className="p-12 text-center">
          <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">
            Job Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The job posting you're looking for doesn't exist.
          </p>
          <Link href="/admin/jobs">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </Card>
      </section>
    );
  }

  return (
    <>
      <section className="container mx-auto px-5 lg:px-0 py-8">
        {/* Header with back button */}
        <div className="mb-6">
          <Link href="/admin-dashboard/job-posting">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        {/* Job Summary Card */}
        <Card className="mb-8 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {job.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {job.department} • {job.location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="px-4 py-2 text-base"
              >
                {jobApplications.length} Application
                {jobApplications.length !== 1 ? "s" : ""}
              </Badge>
              <Badge className="px-4 py-2 text-base bg-green-100 text-green-700 hover:bg-green-100">
                {job.employmentType}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div>
              <p className="text-xs text-muted-foreground">
                Workplace
              </p>
              <p className="font-medium">{job.workplaceType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Experience
              </p>
              <p className="font-medium">
                {job.experienceLevel} • {job.experienceRequired}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Salary Range
              </p>
              <p className="font-medium">
                {formatPrice(job.salaryRange.min)} -{" "}
                {formatPrice(job.salaryRange.max)}/
                {job.salaryRange.period}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Openings
              </p>
              <p className="font-medium">{job.openings}</p>
            </div>
          </div>
        </Card>

        {/* Applications Table */}
        <Card className="overflow-hidden border shadow-sm p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                        className="h-11 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-muted/50 transition-colors group border-b last:border-0 cursor-pointer"
                      onClick={() => handleViewDetails(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className="px-4 py-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-96 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-4 py-12">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <FileText className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="max-w-md">
                          <h3 className="font-semibold text-xl mb-2">
                            No Applications Yet
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            No one has applied for this position yet.
                            Share the job posting to attract
                            candidates.
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>

      {/* Application Detail Modal */}
      <AdminJobApplicationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedApplication={selectedApplication}
      />
    </>
  );
}
