"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Download, FileSpreadsheet, FileText, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ExportMenu({
  isExportingXlsx,
  labels,
  onExportCsv,
  onExportXlsx,
}: {
  isExportingXlsx: boolean;
  labels: {
    csv: string;
    export: string;
    xlsx: string;
  };
  onExportCsv: () => void;
  onExportXlsx: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function chooseCsv() {
    setIsOpen(false);
    onExportCsv();
  }

  function chooseXlsx() {
    setIsOpen(false);
    onExportXlsx();
  }

  return (
    <div className="relative" ref={containerRef}>
      <Button
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        type="button"
        variant="outline"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isExportingXlsx ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Download aria-hidden="true" className="size-4" />}
        <span className="max-sm:sr-only">{labels.export}</span>
      </Button>
      {isOpen ? (
        <div
          className="absolute top-11 right-0 z-30 grid min-w-44 gap-1 rounded-lg border border-border bg-background p-1.5 shadow-xl"
          id={menuId}
          role="menu"
        >
          <Button className="justify-start" role="menuitem" type="button" variant="ghost" onClick={chooseCsv}>
            <FileText aria-hidden="true" className="size-4" />
            {labels.csv}
          </Button>
          <Button className="justify-start" disabled={isExportingXlsx} role="menuitem" type="button" variant="ghost" onClick={chooseXlsx}>
            <FileSpreadsheet aria-hidden="true" className="size-4" />
            {labels.xlsx}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
