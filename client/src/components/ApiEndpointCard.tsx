import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ApiEndpoint } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ApiEndpointCardProps {
  endpoint: ApiEndpoint;
  isExpanded: boolean;
  onToggle: () => void;
}

const methodColors: Record<string, { bg: string; text: string; border: string }> = {
  GET: { bg: "bg-blue-500", text: "text-white", border: "border-blue-500" },
  POST: { bg: "bg-green-600", text: "text-white", border: "border-green-600" },
  PUT: { bg: "bg-amber-500", text: "text-white", border: "border-amber-500" },
  DELETE: { bg: "bg-red-600", text: "text-white", border: "border-red-600" },
  "HL7 v2.x": { bg: "bg-purple-600", text: "text-white", border: "border-purple-600" },
  SOAP: { bg: "bg-indigo-600", text: "text-white", border: "border-indigo-600" },
};

export function ApiEndpointCard({ endpoint, isExpanded, onToggle }: ApiEndpointCardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const methodStyle = methodColors[endpoint.method] || { 
    bg: "bg-muted", 
    text: "text-muted-foreground", 
    border: "border-muted" 
  };

  return (
    <Card 
      className="overflow-hidden hover-elevate transition-all duration-200" 
      data-testid={`card-endpoint-${endpoint.id}`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover-elevate active-elevate-2 transition-all duration-200"
        data-testid={`button-toggle-${endpoint.id}`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={cn(
            "px-3 py-1.5 rounded-md font-semibold text-xs uppercase tracking-wide whitespace-nowrap min-w-[80px] text-center",
            methodStyle.bg,
            methodStyle.text
          )}>
            {endpoint.method}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base text-foreground mb-1" data-testid={`text-title-${endpoint.id}`}>
              {endpoint.title}
            </h3>
            <p className="text-sm text-muted-foreground font-mono truncate" data-testid={`text-endpoint-${endpoint.id}`}>
              {endpoint.endpoint}
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-6 py-4 bg-card border-t border-border space-y-4">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm font-medium text-foreground">Category:</span>
              <span className="text-sm text-muted-foreground">{endpoint.category}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-foreground block mb-1">Description:</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {endpoint.description}
              </p>
            </div>
          </div>

          {endpoint.searchParams && endpoint.searchParams.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Search Parameters</h4>
                <ul className="space-y-2">
                  {endpoint.searchParams.map((param, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="flex-1">{param}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <Separator />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Request</h4>
              <div className="relative group">
                <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed border border-zinc-800">
                  {endpoint.request}
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-60 hover:opacity-100 transition-opacity bg-zinc-800/80 hover:bg-zinc-700 text-zinc-100"
                  onClick={() => copyToClipboard(endpoint.request, `req-${endpoint.id}`)}
                  data-testid={`button-copy-request-${endpoint.id}`}
                  aria-label="Copy request"
                >
                  {copiedId === `req-${endpoint.id}` ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Response</h4>
              <div className="relative group">
                <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-4 rounded-md overflow-x-auto text-xs font-mono leading-relaxed border border-zinc-800">
                  {endpoint.response}
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-60 hover:opacity-100 transition-opacity bg-zinc-800/80 hover:bg-zinc-700 text-zinc-100"
                  onClick={() => copyToClipboard(endpoint.response, `res-${endpoint.id}`)}
                  data-testid={`button-copy-response-${endpoint.id}`}
                  aria-label="Copy response"
                >
                  {copiedId === `res-${endpoint.id}` ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
