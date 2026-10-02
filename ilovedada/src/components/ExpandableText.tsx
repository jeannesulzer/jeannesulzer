import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableTextProps {
  lead: React.ReactNode;
  detail: React.ReactNode;
  defaultExpanded?: boolean;
}

export const ExpandableText = ({ lead, detail, defaultExpanded = false }: ExpandableTextProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="space-y-4">
      <div className="font-body text-[15px] text-muted-foreground leading-[1.8]">
        {lead}
      </div>

      {expanded && (
        <div className="space-y-4 font-body text-[13px] text-muted-foreground/90 leading-[1.75]">
          {detail}
        </div>
      )}

      <button
        onClick={() => setExpanded(e => !e)}
        className="group inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary/80 transition-colors"
        aria-expanded={expanded}
      >
        {expanded ? "Réduire" : "Lire la suite"}
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
};
