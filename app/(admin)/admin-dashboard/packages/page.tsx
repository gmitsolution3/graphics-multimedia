"use client";

import { useState } from "react";
import { useGetPackages } from "@/hooks/swr/useGetPackages";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import PackageTableLoader from "@/components/loaders/PackageTableLoader";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Check,
  X,
  Eye,
  MoreHorizontal,
  Star,
  Calendar,
  Tag,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IPackage } from "@/types";
import { formatPrice, formatDate } from "@/utils";

export default function PackagesPage() {
  const { data, isLoading } = useGetPackages();
  const packages: IPackage[] = data?.data || [];
  const [selectedPackage, setSelectedPackage] =
    useState<IPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewPackage = (pkg: IPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  // Define table columns with equal sizing
  const columns: ColumnDef<IPackage>[] = [
    {
      accessorKey: "name",
      header: "Package",
      size: 250, // Fixed size for package column
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {row.original.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="font-semibold truncate">
                {row.getValue("name")}
              </div>
              {row.original.popular && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100 shrink-0"
                >
                  <Star className="h-3 w-3 fill-amber-500" />
                  Popular
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground line-clamp-1">
              {row.original.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div className="text-left">Pricing</div>,
      size: 150,
      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-lg">
            {formatPrice(row.getValue("price"))}
          </div>
          <div className="text-xs text-muted-foreground">
            {row.original.period}
          </div>
        </div>
      ),
    },
    {
      id: "services",
      header: "Services Included",
      size: 200,
      cell: ({ row }) => {
        const services = row.original.services;
        const includedCount = services.filter(
          (s) => s.included,
        ).length;
        const totalServices = services.length;

        return (
          <div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                {includedCount}/{totalServices} Services
              </div>
              <Badge variant="outline" className="text-xs shrink-0">
                {((includedCount / totalServices) * 100).toFixed(0)}%
              </Badge>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      size: 150,
      cell: ({ row }) => (
        <div>
          <div className="text-sm font-medium">
            {formatDate(row.getValue("createdAt"))}
          </div>
          <div className="text-xs text-muted-foreground">
            ID: {row.original._id.slice(-6)}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      size: 100,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleViewPackage(row.original)}
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
              <DropdownMenuItem>Edit package</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: packages,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading state
  if (isLoading) {
    return <PackageTableLoader />;
  }

  return (
    <>
      <section className="container mx-auto px-5 lg:px-0 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Packages
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your service packages and offerings
            </p>
          </div>
          <Button className="w-full sm:w-auto shadow-sm">
            Add New Package
          </Button>
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
                        style={{ width: header.getSize() }}
                        className="h-11 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider"
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
                          style={{ width: cell.column.getSize() }}
                          className="px-6 py-5"
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
                      className="h-60 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-2xl">📦</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            No packages found
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Get started by creating your first package
                          </p>
                        </div>
                        <Button variant="outline" className="mt-2">
                          Create Package
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

      {/* Package Details Modal */}
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
                      (service, index: number) => (
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
                          (s) => s.included,
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
                          (s) => s.included,
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
    </>
  );
}
