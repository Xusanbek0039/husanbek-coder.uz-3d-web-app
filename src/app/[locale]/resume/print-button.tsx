"use client";

import { Printer } from "lucide-react";

const PrintButton = ({ label }: { label: string }) => (
  <button
    type="button"
    onClick={() => window.print()}
    className="flex items-center gap-2 h-10 px-4 rounded-md bg-zinc-100 text-black text-sm hover:bg-white transition-colors"
  >
    <Printer className="w-4 h-4" />
    {label}
  </button>
);

export default PrintButton;
