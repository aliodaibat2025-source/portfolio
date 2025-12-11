"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NewExperience } from "@/types/index";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const experienceColumns: ColumnDef<NewExperience>[] = [
  // ------------------------------
  // SELECT CHECKBOX
  // ------------------------------
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

  // ------------------------------
  // POSITIONS EN
  // ------------------------------
  {
    accessorKey: "positions_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Position (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const val = row.getValue("positions_en") as string;

      return (
        <>
            <div>{val}</div>

        </>
      );
    },
    enableSorting: true,
  },

  // ------------------------------
  // POSITIONS AR
  // ------------------------------
  {
    accessorKey: "positions_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Position (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
  const val = row.getValue("positions_ar") as string;
  return <div>{val}</div>;
},

    enableSorting: true,
    meta: { hiddenByDefault: true },
  },

  // ------------------------------
  // DESCRIPTION EN
  // ------------------------------
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

  // ------------------------------
  // DESCRIPTION AR
  // ------------------------------
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

  // ------------------------------
  // LOCATION EN
  // ------------------------------
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

  // ------------------------------
  // LOCATION AR
  // ------------------------------
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

  // ------------------------------
  // START DATE
  // ------------------------------
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

  // ------------------------------
  // END DATE
  // ------------------------------
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
       const current_job= row.original.current_job
      const date = new Date(row.original.end_date??"");
      return  (current_job? <div>Current Job</div>:(
        <div>{date.toLocaleDateString()}</div>
      ))
    },
    
    enableSorting: true,
  },
];
