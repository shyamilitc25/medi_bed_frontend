import { useState } from "react";
import Button from "../components/FormFields/ButtonComp";
import Layout from "../components/Layout/Layout";
import AdminFormModal from "../components/ResourceComp/ResourceForm";
import ResourceList from "../components/ResourceComp/ResourceList";
const Resources = () => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Layout pageTitle="Manage Resources">
      <Button variant="success" onClick={openModal}>
        Add Resources
      </Button>
      {/* Add Resources popup */}
      <AdminFormModal isOpen={isOpen} onClose={closeModal} title={"Add Resources"}/>
        <ResourceList/>
       
    </Layout>
  );
};
export default Resources;
