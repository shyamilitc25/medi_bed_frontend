import React, { useEffect, useState } from "react";
import Table from "../Table/TableComp";
import Pagination from "../PaginationComp";
import { IBed } from "../../interface/interface"; // Update the path to your interface file
import { getBeds } from "../../services/bedServices";

const BedList: React.FC = () => {
  const bedColumns: (keyof IBed)[] = [
    "bedNumber",
    "ward",
    "bedType",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IBed[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const response = await getBeds(currentPage, itemsPerPage);
      setData(response?.data);
      setTotalPages(response?.pageCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <Table
        columns={bedColumns}
        showAction={false}
        data={data}
        loading={false}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        loading={false}
      />
    </>
  );
};

export default BedList;
