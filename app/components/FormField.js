import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../components/TextInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, width, values, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        value={values.name}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
