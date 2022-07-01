import GenericService from "./GenericService";

class ProductsService extends GenericService {
  constructor() {
    super();
  }
  addProduct = (data) => this.post("/products", data);
  getProducts = (page = 1, perPage = 10) =>
    this.get("/products?page=" + page + "&perPage=" + perPage);
  updateProduct = (_id, data) => this.put("/products/" + _id, data);
  deleteProduct = (_id) => this.delete("/products/" + _id);
  getProduct = (_id) => this.get("/products/" + _id);
}

let productsService = new ProductsService();
export default productsService;
