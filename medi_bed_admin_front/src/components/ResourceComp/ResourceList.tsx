import React, { useEffect, useState } from "react";
import Table from "../Table/TableComp";
import Pagination from "../PaginationComp";
import { IResource } from "../../interface/interface";
import { getResources } from "../../services/resourceService";

 const ResourceList: React.FC = () => {
  const userColumns: (keyof IResource)[] = [
    "name",
    "category",
   "availableQuantity",
   "totalQuantity",
   "status",
   "location"
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IResource[]>([]);
  const [totalPages, seTotalPages] = useState(0);
  const itemsPerPage = 5;
  
 
  const fetchData = async () => {
    try {
      const response = await getResources(currentPage, itemsPerPage);
      setData(response?.data);
      seTotalPages(response?.pageCount);
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
        columns={userColumns}
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
export default ResourceList;