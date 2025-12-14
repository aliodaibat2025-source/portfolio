"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NewEducation } from "@/types/index";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const educationColumns: ColumnDef<NewEducation>[] = [
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
    accessorKey: "title_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Title (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("title_en") as string;

      return (
        <>
          <div>{val}</div>
        </>
      );
    },
    enableSorting: true,
  },

  {
    accessorKey: "title_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Title (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("title_ar") as string;
      return <div>{val}</div>;
    },

    enableSorting: true,
    meta: { hiddenByDefault: true },
  },

  {
    accessorKey: "description_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Description (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("description_en") as string;
      return <div>{val}</div>;
    },

    enableSorting: true,
  },

  {
    accessorKey: "description_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Description (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("description_ar") as string;
      return <div>{val}</div>;
    },

    enableSorting: true,
    meta: { hiddenByDefault: true },
  },

  {
    accessorKey: "location_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Location (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    enableSorting: true,
  },

  {
    accessorKey: "location_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Location (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    enableSorting: true,
    meta: { hiddenByDefault: true },
  },

  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Start Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.start_date);
      return <div>{date.toLocaleDateString()}</div>;
    },

    enableSorting: true,
  },

  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        End Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.end_date ?? "");
      return <div>{date.toLocaleDateString()}</div>;
    },

    enableSorting: true,
  },
];
