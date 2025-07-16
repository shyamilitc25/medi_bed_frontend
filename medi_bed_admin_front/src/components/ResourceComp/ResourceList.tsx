import React, { useEffect, useState, useCallback } from "react";
import Table from "../Table/TableComp";
import Pagination from "../PaginationComp";
import { IResource } from "../../interface/interface";
import { deleteResource, getResources } from "../../services/resourceService";
import { toast } from "react-toastify";
import AdminFormModal from "./ResourceForm";

const ResourceList: React.FC = () => {
  const userColumns: (keyof IResource)[] = [
    "name",
    "category",
    "availableQuantity",
    "totalQuantity",
    "status",
    "location",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IResource[]>([]);
  const [totalPages, seTotalPages] = useState(0);
  const itemsPerPage = 5;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<IResource | null>(null);

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  // ✅ Use useCallback to avoid re-creating this function on every render
  const fetchData = useCallback(async () => {
    try {
      const response = await getResources(currentPage, itemsPerPage);
      setData(response?.data);
      seTotalPages(response?.pageCount);
    } catch (err) {
      console.log(err);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onEditHandler = (id: string) => {
    const resource = data.find((item) => item._id === id);
    if (resource) {
      setSelectedResource(resource);
      setIsEditModalOpen(true);
    }
  };

  const onDeleteHandler = async (id: string) => {
    try {
      const resp = await deleteResource(id);
      if (resp?.success) {
        toast.success(resp?.message);
      } else {
        toast.error("oops..something went wrong");
      }
    } catch (err) {
      console.log({ err });
      toast.error("oops..something went wrong");
    }
    fetchData(); // This will always refer to the latest stable version
  };

  return (
    <>
      <Table
        columns={userColumns}
        showAction={true}
        data={data}
        loading={false}
        actionButtons={[
          { name: "Edit", onClick: onEditHandler, variant: "primary" },
          { name: "Delete", onClick: onDeleteHandler, variant: "danger" },
        ]}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        loading={false}
      />
      <AdminFormModal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        title={"Edit Resources"}
        resource={selectedResource}
      />
    </>
  );
};

export default ResourceList;
