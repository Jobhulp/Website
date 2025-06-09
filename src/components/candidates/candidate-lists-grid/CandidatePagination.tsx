'use client';

interface CandidatePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CandidatePagination({ currentPage, totalPages, onPageChange }: CandidatePaginationProps) {
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

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <a
          key={page}
          href="#"
          className={`page-numbers ${page === currentPage ? 'current' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(page);
          }}
        >
          <span>{page}</span>
        </a>
      ))}

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