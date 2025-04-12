import { useState } from "react";
import Button from "../components/FormFields/ButtonComp";
import Layout from "../components/Layout/Layout";
import AdminFormModal from "../components/BedComp/BedForm";
import BedList from "../components/BedComp/BedList";

const Bed = () => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Layout pageTitle="Manage Bed">
      <div className="flex justify-between items-center mb-4">
        <Button variant="success" onClick={openModal} className="ml-auto">
          Add Bed
        </Button>
      </div>
      {/* Add bed popup */}
      <AdminFormModal isOpen={isOpen} onClose={closeModal} title={"Add Bed"} />
      <div className="mt-6">
        <BedList />
      </div>
    </Layout>
  );
};

export default Bed;
