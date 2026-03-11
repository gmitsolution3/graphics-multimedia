"use client";

import { useState } from "react";
import { useGetInfluencers } from "@/hooks/swr/useGetInfluencers";
import { useDelete } from "@/hooks/swr/useDelete";
import Image from "next/image";

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
  Image as ImageIcon,
  Video,
} from "lucide-react";

import { IInfluencer } from "@/types";
import { formatDate, formatPrice } from "@/utils";
import Swal from "sweetalert2";
import InfluencersTableLoader from "@/components/loaders/InfluencerTableLoader";

import AdminInfluencerImagePreviewModal from "@/components/modals/AdminInfluencerImagePreviewModal";
import AdminInfluencerVideoPreviewModal from "@/components/modals/AdminInfluencerVideoPreviewModal";
import AdminInfluencerAddModal from "@/components/modals/AdminInfluencerAddModal";
import AdminInfluencerEditModal from "@/components/modals/AdminInfluencerEditModal";
import { mutate } from "swr";

export default function InfluencersPage() {
  const { data, isLoading } = useGetInfluencers(0, 0);

  const influencers: IInfluencer[] = data?.data || [];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<IInfluencer | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    null,
  );
  const [previewVideo, setPreviewVideo] = useState<string | null>(
    null,
  );

  const { deleteItem, revalidate } = useDelete("/influencers");

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

          revalidate();
        }
      }
    });
  };

  const handleEditClick = (influencer: IInfluencer) => {
    setSelectedInfluencer(influencer);
    setIsEditModalOpen(true);
  };

  const formatPricing = (
    pricing: { duration: string; price: number }[],
  ) => {
    if (!pricing || pricing.length === 0)
      return "No pricing available";

    // Show only the first pricing option with count of additional options
    const firstPrice = pricing[0];
    const additionalCount = pricing.length - 1;

    const baseText = `${firstPrice.duration}: ${formatPrice(firstPrice.price)}`;
    return additionalCount > 0
      ? `${baseText} +${additionalCount} more`
      : baseText;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const columns: ColumnDef<IInfluencer>[] = [
    {
      accessorKey: "image",
      header: "Image",
      size: 8,
      cell: ({ row }) => {
        const imageUrl = row.original.image;
        return (
          <div>
            {imageUrl ? (
              <div
                className="relative h-12 w-12 rounded-full overflow-hidden cursor-pointer border border-muted hover:opacity-80 transition-opacity"
                onClick={() => setPreviewImage(imageUrl)}
              >
                <Image
                  src={imageUrl}
                  alt={row.original.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => <div className="text-left">Name</div>,
      size: 12,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <div className="font-semibold text-base">
                  {truncateText(row.original.name, 20)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {truncateText(row.original.designation, 25)}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{row.original.name}</p>
              <p className="text-xs text-muted-foreground">
                {row.original.designation}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "bio",
      header: "Bio",
      size: 18,
      cell: ({ row }) => {
        const bio = row.original.bio || "No bio provided";
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-sm text-gray-600 line-clamp-2 cursor-help">
                  {truncateText(bio, 60)}
                </div>
              </TooltipTrigger>
              {bio.length > 60 && (
                <TooltipContent className="max-w-xs">
                  <p>{bio}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "pricing",
      header: "Pricing",
      size: 15,
      cell: ({ row }) => {
        const pricing = row.original.pricing;
        const formattedPricing = formatPricing(pricing);

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-sm font-medium cursor-help">
                  {truncateText(formattedPricing, 25)}
                </div>
              </TooltipTrigger>
              {pricing?.length > 0 && (
                <TooltipContent className="max-w-sm">
                  <div className="space-y-1">
                    <p className="font-semibold mb-2">
                      All Pricing Options:
                    </p>
                    {pricing.map((p, index) => (
                      <div
                        key={index}
                        className="flex justify-between gap-4 text-sm"
                      >
                        <span>{p.duration}:</span>
                        <span className="font-medium">
                          {formatPrice(p.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "demoVideo",
      header: "Demo",
      size: 8,
      cell: ({ row }) => {
        const videoUrl = row.original.demoVideo;
        return (
          <div>
            {videoUrl ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => setPreviewVideo(videoUrl)}
              >
                <Video className="h-3.5 w-3.5 mr-1" />
                Watch
              </Button>
            ) : (
              <span className="text-xs text-muted-foreground">
                No video
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      size: 12,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <div className="text-sm font-medium">
                  {formatDate(row.getValue("createdAt"))}
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
      size: 7,
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
                onClick={() => handleEditClick(row.original)}
              >
                Edit influencer
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
    data: influencers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <InfluencersTableLoader />;
  }

  return (
    <>
      <section className="container mx-auto px-5 lg:px-0 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Influencers
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Manage your influencers and brand models
            </p>
          </div>
          <Button
            className="w-full sm:w-auto shadow-sm"
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Influencer
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
                          className="px-4 py-4 truncate"
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
                      <div className="text-center py-12 px-4 rounded-lg">
                        <PackageX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No Influencers Available
                        </h3>
                        <p className="text-gray-600 mb-6">
                          You haven&apos;t added any influencers yet.
                          Get started by adding your first influencer.
                        </p>
                        <Button
                          onClick={() => {
                            setIsAddModalOpen(true);
                          }}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add New Influencer
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

      {/* Image Preview Modal */}
      <AdminInfluencerImagePreviewModal
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />

      {/* Video Preview Modal */}
      <AdminInfluencerVideoPreviewModal
        previewVideo={previewVideo}
        setPreviewVideo={setPreviewVideo}
      />

      {/* Add New Influencer Modal */}
      <AdminInfluencerAddModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      {/* Edit Influencer Modal */}
      <AdminInfluencerEditModal
        selectedInfluencer={selectedInfluencer}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </>
  );
}
