import { Button, Grid, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import productsService from "../../services/ProductsService";
import Admin from "../auth/Admin";

const UpdateProduct = (props) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  React.useEffect(() => {
    productsService
      .getProduct(id)
      .then((data) => {
        setName(data.name);
        setPrice(data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Admin>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Update Product</h1>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            label="Price"
            variant="standard"
            fullWidth
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              console.log("send api call to Add Product");
              productsService
                .updateProduct(id, { name, price })
                .then((data) => {
                  console.log(data);
                  navigate("/products");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Admin>
  );
};

export default UpdateProduct;
