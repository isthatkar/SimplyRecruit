import {
  Box,
  Button,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import isEmail from "validator/lib/isEmail";
import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import Theme from "../../Styles/Theme";
import ValidEmailTextField from "../ValidEmailTextField";
import { toast, ToastContainer } from "react-toastify";

const ApplicationForm = (props: any) => {
  const [filename, setFilename] = useState("");
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [coveringLetter, setCoveringLetter] = useState("");

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);
  };

  const handleAdd = async () => {
    await addApplication();
  };

  function handleEmailChange(value: string) {
    setContactEmail(value);
  }

  const requiredFieldsHaveValue = () => {
    return (
      name !== "" &&
      contactEmail !== "" &&
      isEmail(contactEmail) &&
      phoneNumber !== ""
    );
  };

  const addApplication = async (): Promise<void> => {
    if (!requiredFieldsHaveValue()) {
      toast.error("Check if the form is filled correctly!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const applicationDto = {
      fullName: name,
      phoneNumber: phoneNumber,
      profileUrl: profileUrl,
      coverLetter: coveringLetter,
      contactEmail: contactEmail,
    };

    const response = await axios.post(
      `positions/${props.positionId}/applications`,
      applicationDto
    );

    console.log(response);
    if (response.status === 201) {
      toast.success("Application sent succesfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Failed to send application!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <ThemeProvider theme={Theme}>
      <ToastContainer />

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 2,
        }}
      >
        {" "}
        <Typography variant="h5" color="text.primary" sx={{ mb: 4 }}>
          Apply now!
        </Typography>
        <Stack justifyContent="flex-start" alignItems="stretch" spacing={2}>
          <TextField
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-name-input"
            label="Full name"
            type="text"
          />
          <ValidEmailTextField
            onChange={handleEmailChange}
            required
            value={contactEmail}
            id="outlined-email-input"
            label="Contact email *"
            type="text"
            fieldName={""}
          />
          <TextField
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="outlined-phone-input"
            label="Phone number"
          />
          <TextField
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            id="outlined-link-input"
            label="Link to profile, such as LinkedIn"
            type="text"
          />
          <TextField
            id="outlined-letter-input"
            value={coveringLetter}
            onChange={(e) => setCoveringLetter(e.target.value)}
            multiline
            rows={4}
            label="Covering letter, additional information"
            type="text"
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="baseline"
          spacing={1}
        >
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload resume
            <input
              type="file"
              hidden
              accept=".doc, .docx, .pdf"
              onChange={handleFileUpload}
            />
          </Button>
          <Typography sx={{ ml: 3 }}>{filename}</Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{ width: 1, my: 4 }}
          onClick={handleAdd}
        >
          Send application
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ApplicationForm;
