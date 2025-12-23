"use client";

import { ColumnDef } from "@tanstack/react-table";
import { gallery } from "@/types/index";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image"; 
import { ArrowUpDown } from "lucide-react";

export const GalleryColumns: ColumnDef<gallery>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },

  {
    accessorKey: "image", 
    header: "Image",
    cell: ({ row }) => {
      const imgSrc = row.getValue("image") as string;
      return (
        <div className="w-14 h-14 rounded relative">
          <Image
            src={imgSrc}
            alt="Gallery Image"
            fill
            className="object-cover rounded"
          />
        </div>
      );
    },
    enableSorting: false,
  },
];
