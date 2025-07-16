import { useState } from "react";
import Button from "../components/FormFields/ButtonComp";
import Layout from "../components/Layout/Layout";
import AdminFormModal from "../components/ResourceComp/ResourceForm";
import ResourceList from "../components/ResourceComp/ResourceList";
const Resources = () => {
  const [isOpen, setOpen] = useState(false);
  // const [isOpenExport, setOpenExport] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setRefreshList(prev => !prev)
  };
  // const openExportModal = () => {
  //   setOpenExport(true);
  // };
  // const closeExportModal = () => {
  //   setOpenExport(false);
  //   setRefreshList(prev => !prev)
  // };
  return (
    <Layout pageTitle="Manage Resources">
      <div className="flex items-center gap-4 mb-6">
      <Button variant="success" onClick={openModal} >
        Add Resources
      </Button>
      {/* <Button variant="secondary" onClick={openExportModal} >
       Export
      </Button> */}
      </div>
      <ResourceList refreshTrigger={refreshList}/>
      {/* Add Resources popup */}
      <AdminFormModal isOpen={isOpen} onClose={closeModal} title={"Add Resources"} />
      {/* <AdminExportModal isOpen={isOpenExport} onClose={closeExportModal} title={"Export Options"} /> */}
        
       
    </Layout>
  );
};
export default Resources;
