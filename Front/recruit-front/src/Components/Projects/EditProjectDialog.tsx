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
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import Theme from "../../Styles/Theme";
import ValidEmailTextField from "../ValidEmailTextField";
import { NordProduct, Project } from "../../Types/types";
import axios from "axios";

const EditProjectDialog = (props: any) => {
  const [projectId, setProjectId] = React.useState(props.projectId);
  const [project, setProject] = React.useState<Project>();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [email, setEmail] = React.useState(props.email);
  const [selectedProduct, setSelectedProduct] = React.useState("0");

  const productChanged = (event: SelectChangeEvent) => {
    setSelectedProduct(event.target.value as string);
  };

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

  const nordProducts = Object.keys(NordProduct).filter(
    (x) => !(parseInt(x) >= 0)
  );

  const addProject = async (): Promise<void> => {
    const projectDto = {
      name: name,
      description: description,
      product: selectedProduct,
      responsiblePersonEmail: email,
    };

    const response = await axios.put(`projects/${projectId}`, projectDto);

    console.log(response);
    if (response.status === 200) {
      location.reload();
    } else {
      toast.error("Failed to edit collection!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  function handleEmailChange(value: string) {
    setEmail(value);
  }

  return (
    <ThemeProvider theme={Theme}>
      <div>
        <ToastContainer />

        <Button size="small" onClick={handleClickOpen}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit {project?.name} project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please edit the projects information
            </DialogContentText>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
            >
              <div>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                  id="outlined-name-input"
                  label="Name"
                  type="text"
                />{" "}
              </div>

              <div>
                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  value={description}
                  id="outlined-description-input"
                  label="Description"
                  type="text"
                />
              </div>
              <div>
                <FormControl sx={{ m: 1, width: 0.966 }}>
                  <InputLabel id="demo-simple-select-label">
                    Product *
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedProduct}
                    required
                    label="Product"
                    onChange={productChanged}
                  >
                    {nordProducts.map((productMapped) => (
                      <MenuItem
                        key={productMapped}
                        value={Object.values(NordProduct).indexOf(
                          productMapped
                        )}
                      >
                        {productMapped}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <ValidEmailTextField
                  onChange={handleEmailChange}
                  value={email}
                  required
                  id="outlined-email-input"
                  label="Responsible employee email"
                  type="email"
                  fieldName={""}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default EditProjectDialog;
