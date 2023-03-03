import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box/Box";
import { ListItemButton, ThemeProvider } from "@mui/material";
import { Theme } from "../../Styles/Theme";
import { Project } from "../../Types/types";
import axios from "axios";

const EditProjectDialog = (props: any) => {
  const projectId = props.projectId;
  const [project, setProject] = React.useState<Project>();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [email, setEmail] = React.useState(props.email);
  const [selectedProduct, setSelectedProduct] = React.useState("0");

  const handleClickOpen = () => {
    getProject();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    await addProject();
    setOpen(false);
  };

  const getProject = async () => {
    const response = await axios.get(`projects/${projectId}`);

    console.log(response);
    const fetchedProject = response.data;
    setProject(fetchedProject);
    setEmail(fetchedProject.responsiblePersonEmail);
    setName(fetchedProject.name);
    setDescription(fetchedProject.description);
    setSelectedProduct(fetchedProject.product);
  };

  const addProject = async (): Promise<void> => {
    const projectDto = {
      name: name,
      description: description,
      product: selectedProduct,
      responsiblePersonEmail: email,
    };

    const response = await axios.put(`projects/${projectId}`, projectDto);

    console.log(response);
    if (response.status !== 200) {
      toast.error("Failed to edit project!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <ToastContainer />

      <ListItemButton onClick={handleClickOpen}>Edit</ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSave}
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
        >
          <DialogTitle>Edit {project?.name} project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please edit the projects information
            </DialogContentText>
            <TextField
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
              id="outlined-name-input"
              label="Name"
              type="text"
            />
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              required
              value={description}
              id="outlined-description-input"
              label="Description"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
};

export default EditProjectDialog;
