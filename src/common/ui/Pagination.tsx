import React from 'react';
import { ChevronLeft } from '../assets/ChevronLeft';
import { ChevronRight } from '../assets/ChevronRight';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  className: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  className,
  handlePageChange,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always include the first page
    pageNumbers.push(1);

    let middleStart = Math.max(2, currentPage - 2);
    let middleEnd = Math.min(totalPages, currentPage + 2);

    // Adjust if near the start or end
    if (currentPage <= 3) {
      middleEnd = Math.min(6, totalPages);
    } else if (currentPage > totalPages - 3) {
      middleStart = Math.max(totalPages - 4, 2);
    }

    // Add ellipsis if pages are skipped
    if (middleStart > 2) pageNumbers.push('...');

    for (let i = middleStart; i <= middleEnd; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if pages are skipped
    if (middleEnd < totalPages - 1) pageNumbers.push('...');

    // Always include the last page if it's not 1
    if (totalPages !== 1 && currentPage !== totalPages)
      pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <section className={className}>
      <div className='w-full flex justify-center font-mono text-sm'>
        <button
          className={`bg-white rounded-l-md border-r border-blue-500  ${
            currentPage === 1
              ? 'opacity-50 cursor-default'
              : 'hover:bg-blue-200'
          }`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label='Go to previous page'
        >
          <ChevronLeft />
        </button>
        {getPageNumbers().map((pageNumber, i) =>
          typeof pageNumber === 'number' ? (
            <button
              key={i}
              className={`px-3 hover:opacity-80 border-r border-blue-500 ${
                currentPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-white'
              }`}
              aria-label={`Go to page number ${pageNumber}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ) : (
            <span key={i} className='bg-white px-2 border-r border-blue-500'>
              {pageNumber}
            </span>
          )
        )}
        <button
          className={`bg-white rounded-r-md ${
            currentPage === totalPages ? 'opacity-50 cursor-default' : ''
          }`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label={`Go to next page`}
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Pagination;
