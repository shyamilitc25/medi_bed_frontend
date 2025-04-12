import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormInput from "../components/FormFields/FormInput";
import { Field, Formik } from "formik";
interface FieldProps {
    field: {
      name: string;
      value: string;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    };
  }
describe("form input rendering", () => {
    test("render form input", () => {
      render(
        <Formik
          initialValues={{ Name: 'hai' }}
          onSubmit={values => console.log(values)}
        >
          {() => (
            <Field name="Name">
                         {({ field }: FieldProps) => (
                <FormInput {...field} labelName="Enter Name" placeHolder="Enter Name" type="text" />
              )}
            </Field>
          )}
        </Formik>
      );
  
      expect(screen.getByText("Enter Name")).toBeInTheDocument();
    });
    test("check inital value has rendered", () => {
        render(
          <Formik
            initialValues={{ Name: 'hai' }}
            onSubmit={values => console.log(values)}
          >
            {() => (
              <Field name="Name">
                {({ field }: FieldProps) => (
                  <FormInput {...field} labelName="Enter Name" placeHolder="Enter Name" type="text" />
                )}
              </Field>
            )}
          </Formik>
        );
    
        // Check if the initial value is rendered
        expect(screen.getByDisplayValue("hai")).toBeInTheDocument();
    
      
      });
      test("render form input and check onChange", async () => {
        await act(async () => {
          render(
            <Formik
              initialValues={{ Name: 'hai' }}
              onSubmit={values => console.log(values)}
            >
              {() => (
                <Field name="Name">
                  {({ field }: FieldProps) => (
                    <FormInput {...field} labelName="Enter Name" placeHolder="Enter Name" type="text" />
                  )}
                </Field>
              )}
            </Formik>
          );
        });
    
        // Check if the initial value is rendered
        expect(screen.getByDisplayValue("hai")).toBeInTheDocument();
    
        // Simulate user input
        await act(async () => {
          fireEvent.change(screen.getByDisplayValue("hai"), { target: { value: 'new value' } });
        });
    
        // Check if the new value is rendered
        expect(screen.getByDisplayValue("new value")).toBeInTheDocument();
      });
  });