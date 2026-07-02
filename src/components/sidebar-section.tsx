import type { ReactNode } from "react"

import { ChevronDown } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

export function SidebarSection({
  children,
  contentClassName,
  isOpen,
  meta,
  onToggle,
  title,
}: {
  children: ReactNode;
  contentClassName?: string;
  isOpen: boolean;
  meta?: string;
  onToggle: () => void;
  title: string;
}) {
  return (
    <Collapsible
      asChild
      className="border-b border-border last:border-b-0"
      open={isOpen}
      onOpenChange={onToggle}
    >
      <section>
        <CollapsibleTrigger className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-accent sm:px-5">
          <span className="min-w-0 overflow-hidden text-sm leading-tight font-semibold text-ellipsis whitespace-nowrap">{title}</span>
          <span className="flex flex-none items-center gap-2">
            {meta ? <span className="text-xs font-semibold whitespace-nowrap text-muted-foreground">{meta}</span> : null}
            <ChevronDown aria-hidden="true" className={cn("size-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className={cn("px-4 pt-1 pb-4 sm:px-5 sm:pb-5", contentClassName)}>{children}</CollapsibleContent>
      </section>
    </Collapsible>
  )
}
