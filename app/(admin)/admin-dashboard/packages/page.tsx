"use client";

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
import PackageTableLoader from "@/components/loaders/PackageTableLoader";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Check, X } from "lucide-react";

import { IPackage } from "@/types";
import { formatPrice, formatDate } from "@/utils";

export default function PackagesPage() {
  const { data, isLoading } = useGetPackages();
  const packages = data?.data || [];

  // Define table columns
  const columns: ColumnDef<IPackage>[] = [
    {
      accessorKey: "name",
      header: "Package Name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.description}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="font-medium">
          {formatPrice(row.getValue("price"))}
          <span className="text-sm text-muted-foreground ml-1">
            {row.original.period}
          </span>
        </div>
      ),
    },
    {
      id: "services",
      header: "Services",
      cell: ({ row }) => {
        const services = row.original.services;
        const includedServices = services.filter((s) => s.included);
        const totalServices = services.length;

        return (
          <div>
            <div className="font-medium">
              {includedServices.length}/{totalServices} Services
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {services.slice(0, 3).map((service, index) => (
                <Badge
                  key={index}
                  variant={service.included ? "default" : "outline"}
                  className="text-xs"
                >
                  {service.included ? (
                    <Check className="h-3 w-3 mr-1" />
                  ) : (
                    <X className="h-3 w-3 mr-1" />
                  )}
                  {service.name}
                </Badge>
              ))}
              {services.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{services.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "popular",
      header: "Status",
      cell: ({ row }) => (
        <div>
          {row.getValue("popular") ? (
            <Badge className="bg-green-500">Popular</Badge>
          ) : (
            <Badge variant="outline">Standard</Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {formatDate(row.getValue("createdAt"))}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
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
    <section className="container mx-auto px-5 lg:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Packages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your service packages
          </p>
        </div>
        <Button className="w-full sm:w-auto">Add New Package</Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap"
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
                    className="hover:bg-muted/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
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
                    className="h-24 text-center"
                  >
                    No packages found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Mobile-friendly card view (visible only on small screens) */}
      <div className="mt-4 block md:hidden">
        <p className="text-sm text-muted-foreground text-center">
          Scroll horizontally to see all columns
        </p>
      </div>
    </section>
  );
}
