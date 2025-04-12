import Modal from "../ModalComp";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../FormFields/FormInput"; // Update path based on your file structure
import Button from "../FormFields/ButtonComp";
import { IBed } from "../../interface/interface";
import { createBed } from "../../services/bedServices";

interface MyFormValues {
  name: string | number;
  bedNumber: string;
  ward: string;
  bedType: string;
  isOccupied: boolean;
}

const AdminFormModal = ({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) => {
  const initialValues: MyFormValues = {
    bedNumber: "",
    ward: "",
    bedType: "",
    isOccupied: false,
    name: ""
  };

  const handleSubmit = async (values: IBed) => {
    try {
      const response = await createBed(values);
      console.log("Form submitted", response);
      
      onClose();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} testId="my-form-modal">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          bedNumber: Yup.string().required("bedNumber is required"),
          ward: Yup.string().required("ward is required"),
          bedType: Yup.string().required("bedType is required"),
          // isOccupied: Yup.boolean().required("isOccupied is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="space-y-4">
            <FormInput
              name="bedNumber"
              labelName="bedNumber"
              placeHolder="Enter your bedNumber"
              type="text"
              value={values.bedNumber}
              onChange={handleChange}
            />
            <FormInput
              name="ward"
              labelName="ward"
              placeHolder="Enter your ward"
              type="text"
              value={values.ward}
              onChange={handleChange}
            />
            <FormInput
              name="bedType"
              labelName="bedType"
              placeHolder="Enter your bedType"
              type="text"
              value={values.bedType}
              onChange={handleChange}
            />
           
            <div className="flex justify-end space-x-4">
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Button type="button" variant="danger" onClick={onClose}>
                Close
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
    
  );
};

export default AdminFormModal;
