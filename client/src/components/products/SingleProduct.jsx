import React from "react";
import { Grid, Button } from "@mui/material";
import productsService from "../../services/ProductsService";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";

const SingleProduct = ({ product, onDelete }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={4}>
      <h2>
        {product.name}
        {userService.isAdmin() && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                navigate("/products/update/" + product._id);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                productsService
                  .deleteProduct(product._id)
                  .then((data) => {
                    console.log(data);
                    onDelete();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Delete
            </Button>
          </>
        )}
      </h2>
      <p>{product.price}</p>
      <hr />
    </Grid>
  );
};

export default SingleProduct;
