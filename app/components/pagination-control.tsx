import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import type { PaginationType } from "@/types";

type PaginationControlProps = {
  setFilters: (filters: { page: string }) => void;
  pagination: PaginationType<any>["pagination"];
};

export const PaginationControl: React.FC<PaginationControlProps> = ({ setFilters, pagination }) => {
  const { current_page, last_page } = pagination;
  const isMobile = useIsMobile();

  const visiblePageCount = isMobile ? 3 : 6;

  const handlePage = (p: number) => {
    setFilters({
      page: String(p),
    });
  };

  const getDisplayedPages = () => {
    const pages = [];

    if (last_page <= visiblePageCount) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(visiblePageCount / 2);
      let start = Math.max(current_page - half, 1);
      let end = start + visiblePageCount - 1;

      if (end > last_page) {
        end = last_page;
        start = end - visiblePageCount + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();
  const showEllipsis =
    last_page > visiblePageCount && displayedPages[displayedPages.length - 1] < last_page;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={current_page === 1}
            onClick={() => handlePage(current_page - 1)}
          />
        </PaginationItem>

        {displayedPages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => handlePage(page)} isActive={page === current_page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEllipsis && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePage(last_page)}
                isActive={last_page === current_page}
              >
                {last_page}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            disabled={current_page === last_page}
            onClick={() => handlePage(current_page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
