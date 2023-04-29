import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { NordProduct } from "../../Types/types";
import axios from "axios";

const AddProjectDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState(0);

  const productChanged = (event: SelectChangeEvent) => {
    setSelectedProduct(parseInt(event.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    await addProject();
    setOpen(false);
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

    const response = await axios.post("projects", projectDto);

    if (response.status === 201) {
      location.reload();
    } else {
      toast.error("Failed to add collection!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add new project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box onSubmit={handleAdd} component="form" autoComplete="off">
          <DialogTitle>Add new project</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              Please enter the projects information
            </DialogContentText>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
              width="500px"
            >
              <TextField
                onChange={(e) => setName(e.target.value)}
                required
                id="outlined-name-input"
                label="Name"
                type="text"
              />{" "}
              <TextField
                onChange={(e) => setDescription(e.target.value)}
                required
                id="outlined-description-input"
                label="Description"
                type="text"
              />
              <FormControl sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-label">Product *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedProduct.toString()}
                  required
                  label="Product"
                  onChange={productChanged}
                >
                  {nordProducts.map((product) => (
                    <MenuItem
                      key={product}
                      value={Object.values(NordProduct).indexOf(product)}
                    >
                      {product}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
                id="outlined-email-input"
                label="Responsible employee email"
                type="email"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default AddProjectDialog;
