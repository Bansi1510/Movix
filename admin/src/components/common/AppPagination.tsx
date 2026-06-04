import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (
    page: number
  ) => void;
}

const AppPagination = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (page > 1) {
                onPageChange(page - 1);
              }
            }}
          />
        </PaginationItem>

        {Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ).map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              href="#"
              isActive={page === item}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(item);
              }}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (page < totalPages) {
                onPageChange(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;