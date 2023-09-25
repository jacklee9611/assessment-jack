import "./Products.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Banner from "../../components/Banner/Banner";
import CustomButton from "../../components/Controls/CustomButton";
import ConfirmDialog from "../../components/Controls/ConfirmDialog";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Products = () => {
  const [getProducts, setGetProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // state variable to hold the search keyword.
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc"); // Add state for sorting direction
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });
  const [page, setPage] = useState(1); // Current page
  const itemsPerPage = 20;

  // Function to toggle sorting direction
  const toggleSortDirection = () => {
    setSortDirection((prevSortDirection) =>
      prevSortDirection === "asc" ? "desc" : "asc"
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/fetchProduct`)
      .then((response) => {
        const products = response.data;

        // Sort products by Product Name in alphabetical order
        products.sort((a, b) => {
          const nameA = a.productName.toLowerCase();
          const nameB = b.productName.toLowerCase();

          if (sortDirection === "asc") {
            return nameA.localeCompare(nameB);
          } else {
            return nameB.localeCompare(nameA);
          }
        });

        // Display the first 20 products by default
        const defaultProducts = products.slice(0, 20);

        setGetProducts(response.data);
        setFilteredProducts(defaultProducts); // Set filteredProducts initially
      });
  }, [sortDirection]);

  // Handle Delete Button
  const handleDeleteClick = (productId) => {
    axios
      .delete(`http://localhost:3001/products/delete/${productId}`)
      .then((response) => {
        toast.success(response.data.message, { autoClose: 650 });
        // Remove the deleted product from the product list in the state
        setGetProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.", { autoClose: 2000 });
      });
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (searchKeyword.trim() === "") {
      // If searchKeyword is empty, display all products
      setFilteredProducts(getProducts); // Set filteredProducts to all products
    } else {
      // Filter products based on searchKeyword
      const newFilteredProducts = getProducts.filter(
        (product) =>
          product.productBrand
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          product.productName
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
      );
      setFilteredProducts(newFilteredProducts);
    }
  };

  // Handle close search icon
  const clearInput = () => {
    setFilteredProducts(getProducts);
    setSearchKeyword("");
  };

  // Calculate the number of pages
  const numPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Calculate the starting and ending indices for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the products for the current page
  const productsForPage = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <Banner title="Products List" />
      <div className="wrapper">
        {/* Search container */}
        <div className="search-container">
          <input
            type="text"
            id="search"
            placeholder="Search by Brand or Name"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <div className="search-icon">
            {searchKeyword.length !== 0 ? (
              <CloseIcon onClick={clearInput} />
            ) : null}
            <SearchIcon onClick={handleSearchClick} />
          </div>
        </div>

        {/* Setting container */}
        <div className="setting-container">
          <Link to="/editproduct/new">
            <CustomButton
              label="Add Product"
              variant="contained"
              sx={{ textTransform: "none" }}
            />
          </Link>
          <SortByAlphaIcon
            onClick={() => {
              toggleSortDirection(); // Toggle sorting direction on click
            }}
          />
        </div>

        {/* Product container wrapper with scrollbar */}
        <div className="product-container-wrapper">
          {/* Product container */}
          <div className="product-container">
            {filteredProducts.map((value, key) => {
              return (
                <div className="product-card" key={key}>
                  <div className="img-container">
                    <img src={value.productImage} alt="product" />
                  </div>
                  <div className="product-detail">
                    <div className="product-info">
                      <h3>Brand:</h3>
                      <p>{value.productBrand}</p>
                    </div>
                    <div className="product-info">
                      <h3>Name: </h3>
                      <p>{value.productName}</p>
                    </div>
                    <div className="product-info">
                      <h3>UPC12:</h3>
                      <p>{value.productBarcode}</p>
                    </div>
                    <div className="product-setting">
                      <Link to={`/editproduct/${value.id}`}>
                        <CustomButton
                          label="Edit"
                          variant="contained"
                          color="primary"
                          sx={{
                            marginBottom: "20px",
                            textTransform: "none",
                            width: "170px",
                            transition: "transform 0.1s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        />
                      </Link>
                      <CustomButton
                        label="Delete"
                        variant="contained"
                        color="primary"
                        sx={{
                          textTransform: "none",
                          width: "170px",
                          transition: "transform 0.1s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure want to delete?",
                            onConfirm: () => {
                              handleDeleteClick(value.id);
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Stack className="pagination" spacing={2}>
            <Pagination
              count={numPages}
              page={page}
              shape="rounded"
              onChange={(event, value) => setPage(value)}
            />
          </Stack>
        </div>
      </div>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Products;
