import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import productsService from "../../services/ProductsService";
import userService from "../../services/UserService";
import Pagination from "@mui/material/Pagination";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const params = useParams();
  const page = params.page ? params.page : 1;
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const getData = () => {
    productsService
      .getProducts(page, perPage)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(getData, [page, perPage]);
  let navigate = useNavigate();

  const handleNewProductClick = () => {
    navigate("/products/new");
  };

  return (
    <div>
      <h1>Products</h1>
      Records Per Page:
      <select
        value={perPage}
        onChange={(e) => {
          setPerPage(e.target.value);
        }}
        style={{ width: "100px", height: "30px" }}
      >
        <option value="2">Two</option>
        <option value="10">Ten</option>
      </select>
      {userService.isLoggedIn() && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleNewProductClick}
          style={{ position: "absolute", bottom: "20px", right: "20px" }}
        >
          <AddIcon />
        </Fab>
      )}
      {products.length === 0 ? (
        <p>There are no Products</p>
      ) : (
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <SingleProduct key={index} product={product} onDelete={getData} />
          ))}
        </Grid>
      )}
      <Grid item xs={12}>
        <Pagination
          count={Math.ceil(total / perPage)}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => {
            console.log(value);
            navigate("/products/" + value);
          }}
        />{" "}
        Total: {total} Showing {(page - 1) * perPage} to{" "}
        {(page - 1) * perPage + products.length}
      </Grid>
    </div>
  );
};

export default Products;
