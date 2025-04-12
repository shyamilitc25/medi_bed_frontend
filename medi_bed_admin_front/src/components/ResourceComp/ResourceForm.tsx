import Modal from "../ModalComp";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../FormFields/FormInput"; // Update path based on your file structure
import Button from "../FormFields/ButtonComp";
import { IResource } from "../../interface/interface";
import { createResource } from "../../services/resourceService";
const AdminFormModal = ({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) => {
  const initialValues: IResource = {
    name: "",
    category: "",
    totalQuantity: 0,
    availableQuantity: 0,
    location: "",
    status: "operational",
  };

  const handleSubmit = async (values: IResource) => {
    try {
      console.log("Form submitted", values);
      const response = await createResource(values);
      if (response.success) {
        alert(response?.message);
      }
      console.log({ response });
    } catch (err) {
      console.log(err);
    }
    // return response
     onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} testId="my-form-modal">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          category: Yup.string().required("Category is required"),
          totalQuantity: Yup.number().required("Total Quantity is required"),
          availableQuantity: Yup.number().required(
            "Available Quantity is required"
          ),
          location: Yup.string().required("Location is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="space-y-4">
            <FormInput
              name="name"
              labelName="Name"
              placeHolder="Enter Resource name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
            <FormInput
              name="category"
              labelName="Category"
              placeHolder="Enter Category name"
              type="text"
              value={values.category}
              onChange={handleChange}
            />

            <FormInput
              name="totalQuantity"
              labelName="Total Quantity"
              placeHolder="Enter Quantity"
              type="number"
              value={values.totalQuantity}
              onChange={handleChange}
            />
            <FormInput
              name="availableQuantity"
              labelName="Available Quantity"
              placeHolder="Enter Available Quantity"
              type="number"
              value={values.availableQuantity}
              onChange={handleChange}
            />
            <FormInput
              name="location"
              labelName="Location"
              placeHolder="Enter Location"
              type="text"
              value={values.location}
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
