import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";

import { TextField, TextFieldProps } from "@mui/material";

interface EmailTextFieldProps {
  // Define any additional props you want to use on the TextField component
  fieldName: string;
  value: string;
}

type Props = Omit<TextFieldProps, "onChange"> &
  EmailTextFieldProps & {
    onChange: (value: string) => void;
  };
export default function ValidEmailTextField(props: Props) {
  const [value, setValue] = useState(props.value);
  const [isValid, setIsValid] = useState(false);
  const [dirty, setDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;

    if (isEmail(val) || val === "" || val === undefined) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setValue(val);
    props.onChange(value);
  };

  return (
    <React.Fragment>
      <TextField
        error={dirty && isValid === false}
        onBlur={() => setDirty(true)}
        id={props.fieldName}
        label={props.label}
        name={props.fieldName}
        variant="outlined"
        helperText={props.helperText}
        value={value}
        fullWidth
        onChange={handleChange}
      />
    </React.Fragment>
  );
}
