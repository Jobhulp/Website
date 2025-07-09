interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 6;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <a
          key={i}
          href="#"
          className={`page-numbers ${i === currentPage ? 'current' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(i);
          }}
        >
          <span>{i}</span>
        </a>
      );
    }
    return pages;
  };

  return (
    <nav className="navigation">
      <a
        href="#"
        className="page-numbers btn-start"
        onClick={(e) => {
          e.preventDefault();
          onPageChange(1);
        }}
      >
        <i className="puzzle-icon fal fa-angle-double-left"></i>
      </a>

      <a
        href="#"
        className="page-numbers btn--prev"
        onClick={(e) => {
          e.preventDefault();
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <i className="puzzle-icon fal fa-angle-left"></i>
      </a>

      {renderPageNumbers()}

      <a
        href="#"
        className="page-numbers btn--next"
        onClick={(e) => {
          e.preventDefault();
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        <i className="puzzle-icon fal fa-angle-right"></i>
      </a>

      <a
        href="#"
        className="page-numbers btn-end"
        onClick={(e) => {
          e.preventDefault();
          onPageChange(totalPages);
        }}
      >
        <i className="puzzle-icon fal fa-angle-double-right"></i>
      </a>

      <span className="page-numbers all-pages">
        {totalPages} Pages
      </span>
    </nav>
  );
}