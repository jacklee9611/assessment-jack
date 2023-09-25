import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Banner from "../../components/Banner/Banner";
import ProductForm from "../../components/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (id === "new") {
      // For a new product, initialize with empty data
      setProductData({
        productImage: "",
        productBrand: "",
        productName: "",
        productBarcode: "",
      });
    } else {
      // Fetch product data by ID
      axios
        .get(`http://localhost:3001/products/fetchProductbyId/${id}`)
        .then((response) => {
          setProductData(response.data);
        });
    }
  }, [id]);

  return (
    <>
      {/* <Banner title="Add/Edit a Product" /> */}
      <Banner title={id === "new" ? "Add Product" : "Edit Product"} />
      <div className="wrapper">
        {productData && <ProductForm initialProductData={productData} />}
      </div>
    </>
  );
};

export default EditProduct;
