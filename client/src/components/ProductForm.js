import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import DefaultImg from "../assets/images/defaultImage.png";
import TextField from "@mui/material/TextField";
import CustomButton from "./Controls/CustomButton";
import ConfirmDialog from "../components/Controls/ConfirmDialog";

const ProductForm = ({ initialProductData }) => {
  let navigate = useNavigate();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });
  //To keep track the state of the image
  const [imageURL, setImageURL] = useState(
    initialProductData.productImage || ""
  );

  const validationSchema = Yup.object({
    productImage: Yup.string()
      .url("Invalid URL")
      .required("Image URL is required"),
    productBrand: Yup.string().required("Brand is required"),
    productName: Yup.string().required("Name is required"),
    productBarcode: Yup.string()
      .required("Barcode is required")
      .matches(
        /^[0-9]{12}$/,
        "Barcode must be exactly 12 digits and only number 0-9 is allowed"
      ),
  });

  const formik = useFormik({
    initialValues: {
      productImage: initialProductData.productImage || "",
      productBrand: initialProductData.productBrand || "",
      productName: initialProductData.productName || "",
      productBarcode: initialProductData.productBarcode || "",
    },
    validationSchema,
    // onSubmit: (values) => {
    //   // Handle form submission (e.g., send data to the server)
    //   axios
    //     .put(`http://localhost:3001/products/update/${initialProductData.id}`, {
    //       imageUrl: formik.values.productImage,
    //       productBrand: formik.values.productBrand,
    //       productName: formik.values.productName,
    //       productBarcode: formik.values.productBarcode,
    //     })
    //     .then((response) => {
    //       // Handle success, e.g., show a success message
    //       toast.success(response.data.message, { autoClose: 650 });
    //       navigate("/");
    //     })
    //     .catch((error) => {
    //       // Handle errors, e.g., show an error message
    //       console.error("Error updating product:", error);
    //       toast.error("Error updating product:", { autoClose: 2000 });
    //     });
    // },
    onSubmit: (values) => {
      if (initialProductData.id) {
        // If initialProductData has an id, it's an existing data, perform an update
        axios
          .put(
            `http://localhost:3001/products/update/${initialProductData.id}`,
            {
              imageUrl: formik.values.productImage,
              productBrand: formik.values.productBrand,
              productName: formik.values.productName,
              productBarcode: formik.values.productBarcode,
            }
          )
          .then((response) => {
            // Handle success, e.g., show a success message
            toast.success(response.data.message, { autoClose: 650 });
            navigate("/");
          })
          .catch((error) => {
            // Handle errors, e.g., show an error message
            console.error("Error updating product:", error);
            toast.error("Error updating product:", { autoClose: 2000 });
          });
      } else {
        // If initialProductData doesn't have an id, it's a new data, perform an insert
        axios
          .post("http://localhost:3001/products/newProduct", {
            productImage: formik.values.productImage,
            productBrand: formik.values.productBrand,
            productName: formik.values.productName,
            productBarcode: formik.values.productBarcode,
          })
          .then((response) => {
            // Handle success, e.g., show a success message
            toast.success(response.data.message, { autoClose: 650 });
            navigate("/");
          })
          .catch((error) => {
            // Handle errors, e.g., show an error message
            console.error("Error adding product:", error);
            toast.error("Error adding product:", { autoClose: 2000 });
          });
      }
    },
  });

  // Handle cancel button
  const handleCancel = () => {
    if (formik.dirty) {
      // If the form is dirty (changes have been made), show the confirmation dialog
      setConfirmDialog({
        isOpen: true,
        title: "Are you sure you want to cancel?",
        onConfirm: () => {
          navigate("/");
        },
      });
    } else {
      // If the form is not dirty (no changes have been made), navigate without confirmation
      navigate("/");
    }
  };

  // Handle image URL input change
  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
    formik.handleChange(e);
  };

  return (
    <>
      <div>
        <form className="productForm" onSubmit={formik.handleSubmit}>
          <div className="image-preview">
            <img src={imageURL || DefaultImg} alt="product" />
          </div>
          <div className="product-value">
            <TextField
              id="productImage"
              className="textfield"
              name="productImage"
              label="Product Image"
              value={imageURL}
              onChange={handleImageURLChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.productImage &&
                Boolean(formik.errors.productImage)
              }
              helperText={
                formik.touched.productImage && formik.errors.productImage
              }
            />
            <TextField
              id="productBrand"
              className="textfield"
              name="productBrand"
              label="Product Brand"
              value={formik.values.productBrand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.productBrand &&
                Boolean(formik.errors.productBrand)
              }
              helperText={
                formik.touched.productBrand && formik.errors.productBrand
              }
            />
            <TextField
              id="productName"
              className="textfield"
              name="productName"
              label="Product Name"
              value={formik.values.productName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.productName && Boolean(formik.errors.productName)
              }
              helperText={
                formik.touched.productName && formik.errors.productName
              }
            />
            <TextField
              id="productBarcode"
              className="textfield"
              name="productBarcode"
              label="Product Barcode"
              value={formik.values.productBarcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.productBarcode &&
                Boolean(formik.errors.productBarcode)
              }
              helperText={
                formik.touched.productBarcode && formik.errors.productBarcode
              }
            />
            <div className="button-form">
              <CustomButton
                label="Cancel"
                variant="outlined"
                color="error"
                sx={{ textTransform: "none", marginRight: "20px" }}
                onClick={handleCancel}
              />
              <CustomButton
                label="Save"
                variant="contained"
                disabled={!formik.dirty}
                sx={{
                  textTransform: "none",
                  width: "170px",
                  transition: "transform 0.1s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  // Add styles for the disabled state
                  "&:disabled": {
                    backgroundColor: "gray", // Change the background color to gray when disabled
                    cursor: "not-allowed", // Change the cursor to not-allowed when disabled
                  },
                }}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ProductForm;
