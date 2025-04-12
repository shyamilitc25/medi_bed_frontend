import { useState } from "react";
import Button from "../components/FormFields/ButtonComp";
import Layout from "../components/Layout/Layout";
import AdminFormModal from "../components/BedComp/BedForm";
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
      <Button variant="success" onClick={openModal}>
        Add Bed
      </Button>
      {/* Add bed popup */}
      <AdminFormModal isOpen={isOpen} onClose={closeModal} title={"Add Bed"}/>
        
       
    </Layout>
  );
};
export default Bed;
