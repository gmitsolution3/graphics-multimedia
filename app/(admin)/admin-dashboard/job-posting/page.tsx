"use client";

import { useState } from "react";
import { useGetJobPostings } from "@/hooks/swr/useGetJobPostings";
import { useDelete } from "@/hooks/swr/useDelete";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MoreHorizontal,
  PackageX,
  PlusCircle,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Mail,
  Building2,
  TrendingUp,
} from "lucide-react";

import { IJobPosting } from "@/types";
import { formatDate, formatPrice } from "@/utils";
import Swal from "sweetalert2";
import JobPostingTableLoader from "@/components/loaders/JobPostingTableLoader";
import AdminJobPostingAddModal from "@/components/modals/AdminJobPostingAddModal";
import AdminJobPostingEditModal from "@/components/modals/AdminJobPostingEditModal";
import { mutate } from "swr";
import { useRouter } from "next/navigation";

export default function JobPostingPage() {
  const { data, isLoading } = useGetJobPostings();

  const jobPostings: IJobPosting[] = data?.data || [];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedJobPosting, setSelectedJobPosting] =
    useState<IJobPosting | null>(null);

  const { deleteItem } = useDelete("/job-postings");

  const router = useRouter();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#232156",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteItem(id);

        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
          });

          mutate(
            (key) =>
              typeof key === "string" &&
              key.startsWith("/job-postings"),
          );
        }
      }
    });
  };

  const handleEditClick = (jobPosting: IJobPosting) => {
    setSelectedJobPosting(jobPosting);
    setIsEditModalOpen(true);
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">
        Inactive
      </Badge>
    );
  };

  const getEmploymentTypeBadge = (type: string) => {
    switch (type) {
      case "Full-time":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Full Time
          </Badge>
        );
      case "Part-time":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Part Time
          </Badge>
        );
      case "Contract":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200"
          >
            Contract
          </Badge>
        );
      case "Internship":
        return (
          <Badge
            variant="outline"
            className="bg-teal-50 text-teal-700 border-teal-200"
          >
            Internship
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getWorkplaceTypeBadge = (type: string) => {
    switch (type) {
      case "Remote":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Remote
          </Badge>
        );
      case "Hybrid":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Hybrid
          </Badge>
        );
      case "Onsite":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            Onsite
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getExperienceLevelBadge = (level: string) => {
    switch (level) {
      case "Junior":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            Junior
          </Badge>
        );
      case "Mid":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Mid
          </Badge>
        );
      case "Senior":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Senior
          </Badge>
        );
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const columns: ColumnDef<IJobPosting>[] = [
    {
      accessorKey: "title",
      header: "Job Title",
      size: 15,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <div className="font-semibold text-base">
                  {truncateText(row.original.title, 25)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Building2 className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {truncateText(row.original.department, 20)}
                  </span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{row.original.title}</p>
              <p className="text-xs text-muted-foreground">
                Department: {row.original.department}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 10,
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{truncateText(row.original.location, 20)}</span>
          </div>
          <div className="mt-1">
            {getWorkplaceTypeBadge(row.original.workplaceType)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "employmentType",
      header: "Type",
      size: 8,
      cell: ({ row }) => (
        <div className="space-y-2">
          <div>
            {getEmploymentTypeBadge(row.original.employmentType)}
          </div>
          <div>
            {getExperienceLevelBadge(row.original.experienceLevel)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "salaryRange",
      header: "Salary",
      size: 12,
      cell: ({ row }) => {
        const salary = row.original.salaryRange;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>
                      {formatPrice(salary.min)} -{" "}
                      {formatPrice(salary.max)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    per {salary.period}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Salary Range: {formatPrice(salary.min)} -{" "}
                  {formatPrice(salary.max)}
                </p>
                <p>Period: {salary.period}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "openings",
      header: "Openings",
      size: 6,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium">{row.original.openings}</span>
        </div>
      ),
    },
    {
      accessorKey: "experienceRequired",
      header: "Experience",
      size: 8,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-sm cursor-help">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                <span>
                  {truncateText(row.original.experienceRequired, 15)}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Experience Required: {row.original.experienceRequired}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "applicationDeadline",
      header: "Deadline",
      size: 10,
      cell: ({ row }) => {
        const deadline = new Date(row.original.applicationDeadline);
        const isExpired = deadline < new Date();

        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span
                className={
                  isExpired ? "text-red-600 font-medium" : ""
                }
              >
                {formatDate(deadline.toISOString())}
              </span>
            </div>
            {isExpired && (
              <Badge
                variant="outline"
                className="text-xs bg-red-50 text-red-700 border-red-200"
              >
                Expired
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "contactEmail",
      header: "Contact",
      size: 10,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5 text-sm cursor-help">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <span>
                  {truncateText(row.original.contactEmail, 15)}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.original.contactEmail}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      size: 6,
      cell: ({ row }) => getStatusBadge(row.original.isActive),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      size: 8,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <div className="text-sm font-medium">
                  {formatDate(
                    new Date(row.original.createdAt).toISOString(),
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  ID: {row.original._id.slice(-6)}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Full ID: {row.original._id}</p>
              <p>
                Created:{" "}
                {new Date(row.original.createdAt).toLocaleString()}
              </p>
              <p>
                Updated:{" "}
                {new Date(row.original.updatedAt).toLocaleString()}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: "actions",
      header: "",
      size: 5,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
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
                onClick={() =>
                  router.push(
                    `/admin-dashboard/job-posting/applications?jobId=${row.original._id}`,
                  )
                }
              >
                View Applications
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleEditClick(row.original)}
              >
                Edit job
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(row.original._id)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: jobPostings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <JobPostingTableLoader />;
  }

  return (
    <>
      <section className="container mx-auto px-5 lg:px-0 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Job Postings
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your job listings and career opportunities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-5 py-2">
              Total: {jobPostings.length}
            </Badge>
            <Button
              className="w-full sm:w-auto shadow-sm"
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Job
            </Button>
          </div>
        </div>

        {/* Table */}
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
                        style={{ width: `${header.getSize()}%` }}
                        className="h-11 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap"
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
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted/50 transition-colors group border-b last:border-0"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          style={{
                            width: `${cell.column.getSize()}%`,
                          }}
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
                          <Briefcase className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="max-w-md">
                          <h3 className="font-semibold text-xl mb-2">
                            No Job Postings Yet
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            You haven&apos;t created any job postings
                            yet. Get started by adding your first job
                            opportunity.
                          </p>
                        </div>
                        <Button
                          onClick={() => setIsAddModalOpen(true)}
                          className="mt-2"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add New Job
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>

      {/* Add New Job Modal */}
      <AdminJobPostingAddModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      {/* Edit Job Modal */}
      <AdminJobPostingEditModal
        selectedJobPosting={selectedJobPosting}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </>
  );
}
