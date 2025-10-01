import React from 'react';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  pageSize 
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex justify-between font-outfit items-center">
      <span className="text-sm text-gray-500">
        Showing {startItem}‑{endItem} of {totalItems}
      </span>
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
