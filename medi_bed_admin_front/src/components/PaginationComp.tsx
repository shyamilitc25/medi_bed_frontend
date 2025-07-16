import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading:boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    
    <div className="flex justify-center items-center space-x-2 mt-4">
      {!loading?<>
      <button
        className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition duration-200"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition duration-200"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      </>:null}
    </div>
  );
};

export default Pagination;
