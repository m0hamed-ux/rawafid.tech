import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl = "/blog",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    return page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
  };

  // Generate page numbers array (with ellipsis for large page counts)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-16 flex items-center justify-center gap-2 border-t border-ink/10 pt-8"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-forest hover:text-cream"
          aria-label="Previous page"
        >
          <CaretLeft size={16} weight="bold" />
          <span>Previous</span>
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep/50 px-4 py-2 text-sm font-medium text-ink/40 cursor-not-allowed"
          aria-disabled="true"
        >
          <CaretLeft size={16} weight="bold" />
          <span>Previous</span>
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1 px-2">
        {pages.map((p, idx) => {
          if (typeof p === "string") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="inline-flex h-9 w-9 items-center justify-center text-sm font-medium text-moss"
              >
                {p}
              </span>
            );
          }

          const isCurrent = p === currentPage;
          return isCurrent ? (
            <span
              key={p}
              aria-current="page"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest text-sm font-medium text-cream"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={createPageUrl(p)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-deep text-sm font-medium text-ink transition-colors hover:bg-forest/20"
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-forest hover:text-cream"
          aria-label="Next page"
        >
          <span>Next</span>
          <CaretRight size={16} weight="bold" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep/50 px-4 py-2 text-sm font-medium text-ink/40 cursor-not-allowed"
          aria-disabled="true"
        >
          <span>Next</span>
          <CaretRight size={16} weight="bold" />
        </span>
      )}
    </nav>
  );
}
