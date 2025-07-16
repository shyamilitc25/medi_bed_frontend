import Modal from "../ModalComp";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../FormFields/FormInput";
import Button from "../FormFields/ButtonComp";
import { IResource } from "../../interface/interface";
import { createResource, updateResource } from "../../services/resourceService";
import { useState } from "react";
import LoadingSpinner from "../Spinner";

import { toast } from "react-toastify";


const ResourceForm = ({
  isOpen,
  onClose,
  title,
  resource,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  resource?: IResource | null
}) => {
  const [loading, setLoading] = useState(false);

  const initialValues: IResource = resource || {
    // If resource is provided, use it, otherwise use default values
    name: "",
    category: "",
    totalQuantity: 0,
    availableQuantity: 0,
    location: "",
    status: "operational",
  };

  const handleSubmit = async (values: IResource) => {
    try {
      setLoading(true);
      console.log("Form submitted", values);

      let response;
      if (resource) {
        // If resource exists, update it
        response = await updateResource(values);
      } else {
        // Otherwise, create a new resource
        response = await createResource(values);
      }

      if (response.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message || "Error occurred");
      }

      console.log({ response });
    } catch (err) {
      toast.error("Oops! Something went wrong.");
      console.log(err);
    } finally {
      setLoading(false);
      onClose();
    }
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
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? <LoadingSpinner /> : resource ? "Update" : "Submit"}
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

export default ResourceForm;