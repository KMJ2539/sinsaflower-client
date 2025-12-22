import React, { useEffect, useRef } from "react";

interface InteractiveSvgMapProps {
  svgPath: string;
  onRegionClick?: (region: string) => void;
  highlightId?: string;
}

const HOVER_FILL = "#FFE082";
const HOVER_STROKE = "#FFA726";

const InteractiveSvgMap: React.FC<InteractiveSvgMapProps> = ({ svgPath, onRegionClick, highlightId }) => {
  const objectRef = useRef<HTMLObjectElement | null>(null);

  useEffect(() => {
    const objectEl = objectRef.current;
    if (!objectEl) return;

    const attachListeners = () => {
      const svgDoc = objectEl.contentDocument;
      if (!svgDoc) return;

      const svg = svgDoc.querySelector("svg");
      if (!svg) return;

      const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));

      // Pre-apply highlight styling
      if (highlightId) {
        const target = svg.querySelector<SVGElement>(`#${CSS.escape(highlightId)}`);
        if (target) {
          target.setAttribute("stroke", HOVER_STROKE);
          target.setAttribute("stroke-width", "2");
        }
      }

      paths.forEach((path) => {
        const originalFill = path.getAttribute("fill");
        const originalStroke = path.getAttribute("stroke");
        const originalStrokeWidth = path.getAttribute("stroke-width");
        const isHighlighted =
          highlightId &&
          (path.getAttribute("id") === highlightId || path.getAttribute("data-name") === highlightId);
        (path as any)._mapOriginal = { originalFill, originalStroke, originalStrokeWidth, isHighlighted };

        const restorePath = (p: SVGPathElement) => {
          const orig = (p as any)._mapOriginal as {
            originalFill: string | null;
            originalStroke: string | null;
            originalStrokeWidth: string | null;
            isHighlighted?: boolean;
          };

          if (orig.originalFill !== null) p.setAttribute("fill", orig.originalFill);
          else p.removeAttribute("fill");

          if (orig.originalStroke !== null) p.setAttribute("stroke", orig.originalStroke);
          else p.removeAttribute("stroke");

          if (orig.originalStrokeWidth !== null) p.setAttribute("stroke-width", orig.originalStrokeWidth);
          else p.removeAttribute("stroke-width");

          // Keep the active highlight visible after reset
          if (orig.isHighlighted) {
            p.setAttribute("stroke", HOVER_STROKE);
            p.setAttribute("stroke-width", "2");
          }
        };

        const onEnter = () => {
          // Clear hover styles from other paths to avoid lingering fills
          paths.forEach((p) => restorePath(p));

          path.setAttribute("fill", HOVER_FILL);
          path.setAttribute("stroke", HOVER_STROKE);
          path.setAttribute("stroke-width", "2.5");
        };

        const onLeave = () => {
          restorePath(path);
        };

        const onClick = () => {
          const region = path.getAttribute("id") || path.getAttribute("data-name") || "";
          if (region && onRegionClick) onRegionClick(region);
        };

        path.addEventListener("mouseenter", onEnter);
        path.addEventListener("mouseleave", onLeave);
        path.addEventListener("click", onClick);

        (path as any)._mapListeners = { onEnter, onLeave, onClick };
      });

      (objectEl as any)._mapPaths = paths;
    };

    objectEl.addEventListener("load", attachListeners);
    if (objectEl.contentDocument) attachListeners();

    return () => {
      objectEl.removeEventListener("load", attachListeners);
      const savedPaths: SVGPathElement[] = (objectEl as any)._mapPaths || [];
      savedPaths.forEach((path) => {
        const handlers = (path as any)._mapListeners;
        if (handlers) {
          path.removeEventListener("mouseenter", handlers.onEnter);
          path.removeEventListener("mouseleave", handlers.onLeave);
          path.removeEventListener("click", handlers.onClick);
          delete (path as any)._mapListeners;
        }
      });
      delete (objectEl as any)._mapPaths;
    };
  }, [svgPath, onRegionClick, highlightId]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-3">
      <object
        ref={objectRef}
        type="image/svg+xml"
        data={svgPath}
        className="w-full h-full max-h-full block select-none object-contain"
        aria-label="region selection map"
      />
    </div>
  );
};

export default InteractiveSvgMap;
