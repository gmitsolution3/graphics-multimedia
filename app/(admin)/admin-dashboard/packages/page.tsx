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
import { Check, X, Eye, MoreHorizontal, Star } from "lucide-react";
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

  // Define table columns
  const columns: ColumnDef<IPackage>[] = [
    {
      accessorKey: "name",
      header: "Package",
      cell: ({ row }) => (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {row.original.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="font-semibold">
                {row.getValue("name")}
              </div>
              {row.original.popular && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100"
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
      header: () => <div className="text-right">Pricing</div>,
      cell: ({ row }) => (
        <div className="text-right">
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
      cell: ({ row }) => {
        const services = row.original.services;
        const includedCount = services.filter(
          (s) => s.included,
        ).length;
        const totalServices = services.length;

        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                {includedCount}/{totalServices} Services
              </div>
              <Badge variant="outline" className="text-xs">
                {((includedCount / totalServices) * 100).toFixed(0)}%
                Complete
              </Badge>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="space-y-1">
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
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/50 transition-colors group border-b last:border-0"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-6 py-5">
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
  );
}
