"use client";
import { useGetBookings } from "@/hooks/swr/useGetBookings";
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
  Calendar,
  Eye,
  MoreHorizontal,
  Package,
  Phone,
  User,
} from "lucide-react";
import { formatDate } from "@/utils";

import { IBooking } from "@/types";
import { formatPrice, getInitials } from "@/utils";
import BookingTableLoader from "@/components/loaders/BookingTableLoader";

export default function RegularBookingsPage() {
  const { data, isLoading } = useGetBookings();
  const bookings: IBooking[] = data?.data || [];

  // Define table columns
  const columns: ColumnDef<IBooking>[] = [
    {
      accessorKey: "name",
      header: "Client",
      size: 200,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-muted">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {getInitials(row.original.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold truncate">
              {row.getValue("name")}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {row.original.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Contact",
      size: 150,
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{row.getValue("phone")}</span>
          </div>
          {row.original.company && (
            <div className="text-xs text-muted-foreground pl-5">
              {row.original.company}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "selectedPackage",
      header: "Package",
      size: 200,
      cell: ({ row }) => {
        const pkg = row.original.selectedPackage;
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge
                variant={pkg.popular ? "default" : "secondary"}
                className="gap-1"
              >
                <Package className="h-3 w-3" />
                {pkg.name}
              </Badge>
              {pkg.popular && (
                <Badge
                  variant="outline"
                  className="text-xs bg-amber-50"
                >
                  Popular
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">
                {formatPrice(pkg.price)}
              </span>
              <span className="text-xs text-muted-foreground">
                /{pkg.period}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "projectDetails",
      header: "Project Detail",
      size: 250,
      cell: ({ row }) => (
        <div className="space-y-1.5">
          <p className="text-sm line-clamp-2 text-muted-foreground">
            {row.original.projectDetails}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Booked On",
      size: 150,
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{formatDate(row.getValue("createdAt"))}</span>
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
      size: 80,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
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
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Contact client</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Cancel booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading state
  if (isLoading) {
    return <BookingTableLoader />;
  }

  return (
    <section className="container mx-auto px-5 lg:px-0 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bookings
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Manage your client bookings and inquiries
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-5 py-2">
            Total: {bookings.length}
          </Badge>
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
                    className="h-96 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-3xl">📅</span>
                      </div>
                      <div className="max-w-md">
                        <h3 className="font-semibold text-xl mb-2">
                          No bookings yet
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          When clients book your services, they'll
                          appear here. Share your services to start
                          getting bookings.
                        </p>
                      </div>
                      <Button variant="outline" className="mt-2">
                        View Services
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
