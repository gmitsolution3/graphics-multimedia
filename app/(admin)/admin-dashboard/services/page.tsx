"use client";

import { useState } from "react";
import { useGetServices } from "@/hooks/swr/useGetServices";
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
import PackageTableLoader from "@/components/loaders/PackageTableLoader";
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
import { MoreHorizontal, Star } from "lucide-react";

import { IService } from "@/types";
import { formatDate } from "@/utils";
import Swal from "sweetalert2";
import Link from "next/link";
import ServicesTableLoader from "./../../../../components/loaders/ServiceTableLoader";

export default function ServicesPage() {
  const { data, isLoading } = useGetServices();
  const services: IService[] = data?.data || [];

  const { deleteItem } = useDelete("/services");

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
        }
      }
    });
  };

  const columns: ColumnDef<IService>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-left">Name</div>,
      size: Math.floor(100 / 3), // Equal space for 3 columns
      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-lg">
            {row.getValue("name")}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      size: Math.floor(100 / 3), // Equal space for 3 columns
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
      header: "Action",
      size: Math.floor(100 / 5), // Equal space for 3 columns
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
              <DropdownMenuItem>Edit package</DropdownMenuItem>
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
    data: services,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <ServicesTableLoader />;
  }

  return (
    <>
      <section className="container mx-auto px-5 lg:px-0 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Services
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your services and offerings
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto shadow-sm">
            <Link href="/admin-dashboard/packages/add-new">
              Add New Service
            </Link>
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
                        style={{ width: `${header.getSize()}%` }}
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
                          style={{
                            width: `${cell.column.getSize()}%`,
                          }}
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
                            No Services found
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
    </>
  );
}
