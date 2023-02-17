import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import isEmail from "validator/lib/isEmail";

export default function ValidEmailTextField(props: any) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [dirty, setDirty] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.currentTarget.value;

    if (isEmail(val) || val === "" || val === undefined) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setValue(val);
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
        onChange={(e) => handleChange(e)}
      />
    </React.Fragment>
  );
}
