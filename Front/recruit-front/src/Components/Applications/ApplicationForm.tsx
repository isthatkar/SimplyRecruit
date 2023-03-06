import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ApplicationForm = (props: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("");
  const [name, setName] = useState("");
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
    setSelectedFile(file);
  };

  const handleAdd = async () => {
    await addApplication();
  };

  const addResume = async (applicationId: number) => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("fileName", filename);
    try {
      const response = await axios.post(
        `applications/${applicationId}/resume`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add resume to application!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const addApplication = async (): Promise<void> => {
    const userEmail = localStorage.getItem("email");
    const applicationDto = {
      fullName: name,
      phoneNumber: phoneNumber,
      profileUrl: profileUrl,
      coverLetter: coveringLetter,
      contactEmail: userEmail ? userEmail : "",
    };

    const response = await axios.post(
      `positions/${props.positionId}/applications`,
      applicationDto
    );

    if (response.status === 201) {
      const applicationId = response.data.id;
      addResume(applicationId);
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
    <div>
      <ToastContainer />

      <Box
        component="form"
        onSubmit={handleAdd}
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 2,
        }}
      >
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
        <Button variant="contained" type="submit" sx={{ width: 1, my: 4 }}>
          Send application
        </Button>
      </Box>
    </div>
  );
};

export default ApplicationForm;
