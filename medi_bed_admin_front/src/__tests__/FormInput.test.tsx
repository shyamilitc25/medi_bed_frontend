import { describe, test, expect, vi } from 'vitest';
import {  render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

describe('FormInput Additional Cases', () => {
 
  test('renders error message if touched and error exists', async () => {
    render(
      <Formik
        initialValues={{ Name: '' }}
        onSubmit={vi.fn()}
        initialErrors={{ Name: 'Required' }}
        initialTouched={{ Name: true }}
      >
        {() => (
          <Field name="Name">
            {({ field }: FieldProps) => (
              <FormInput {...field} labelName="Name" placeHolder="Name" type="text" />
            )}
          </Field>
        )}
      </Formik>
    );
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  test('renders as password type', () => {
    render(
      <Formik initialValues={{ pass: '' }} onSubmit={vi.fn()}>
        {() => (
          <Field name="pass">
            {({ field }: FieldProps) => (
              <FormInput {...field} labelName="Password" placeHolder="Password" type="password" />
            )}
          </Field>
        )}
      </Formik>
    );
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
  });

  
});