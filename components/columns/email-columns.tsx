"use client";
import { ColumnDef } from "@tanstack/react-table";
import {  NewEmail } from "@/types/index";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const emailsColumns: ColumnDef<NewEmail>[] = [
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
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        First Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => <div className="text-gray-800 font-medium">{row.getValue("first_name")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email") ?? "-"}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => <div>{row.getValue("subject") ?? "-"}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "sent_at",
    header: "Sent At",
    cell: ({ row }) => {
      const sentAt = row.getValue("sent_at") as Date | string;
      return <div>{sentAt instanceof Date ? sentAt.toLocaleString() : sentAt}</div>;
    },
    enableSorting: false,
  },
];
