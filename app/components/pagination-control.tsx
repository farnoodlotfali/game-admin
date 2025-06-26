import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginationType } from "@/types";

type PaginationControlProps = {
  setFilters: (filters: { page: string }) => void;
  pagination: PaginationType<any>["pagination"];
};

export const PaginationControl: React.FC<PaginationControlProps> = ({ setFilters, pagination }) => {
  const { current_page, last_page } = pagination;

  const handlePage = (p: number) => {
    setFilters({
      page: String(p),
    });
  };

  const getDisplayedPages = () => {
    const pages = [];

    if (last_page <= 6) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      if (current_page <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (current_page >= last_page - 2) {
        pages.push(last_page - 4, last_page - 3, last_page - 2, last_page - 1, last_page);
      } else {
        pages.push(
          current_page - 2,
          current_page - 1,
          current_page,
          current_page + 1,
          current_page + 2
        );
      }
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();
  const showEllipsis = last_page > 6 && displayedPages[displayedPages.length - 1] < last_page;

  return (
    <Pagination className="mt-3">
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
