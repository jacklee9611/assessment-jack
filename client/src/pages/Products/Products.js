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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Function to toggle sorting direction
  const toggleSortDirection = () => {
    setSortDirection((prevSortDirection) =>
      prevSortDirection === "asc" ? "desc" : "asc"
    );
    updateFilteredProducts(); // Update filtered products after changing sort direction
  };

  // Handle search button click
  const handleSearchClick = () => {
    setCurrentPage(1); // Reset to the first page when searching
    updateFilteredProducts();
  };

  // Handle close button click
  const clearInput = () => {
    setSearchKeyword("");
    setCurrentPage(1); // Reset to the first page when clearing search
    setFilteredProducts(getProducts);
  };

  // Update filtered products based on search and pagination
  const updateFilteredProducts = (initialProducts = getProducts) => {
    let updatedProducts = [...initialProducts]; // Make a copy of all products

    if (searchKeyword.trim() !== "") {
      // Filter products based on searchKeyword
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.productBrand
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          product.productName
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
      );
    }

    // Sort products by Product Name in alphabetical order
    updatedProducts.sort((a, b) => {
      const nameA = a.productName.toLowerCase();
      const nameB = b.productName.toLowerCase();

      if (sortDirection === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/fetchProduct`)
      .then((response) => {
        const products = response.data;
        setGetProducts(products);
        // Initialize filteredProducts with all products and sort them alphabetically initially
        updateFilteredProducts(products); // Pass the products as an argument to set the initial sorting
      });
  }, []);

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
        setCurrentPage(1);
        updateFilteredProducts(); // Update filtered products
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

  // Calculate pagination indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
            {/* {filteredProducts.map((value, key) => { */}
            {currentItems.map((value, key) => {
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
              count={Math.ceil(filteredProducts.length / itemsPerPage)}
              page={currentPage}
              shape="rounded"
              onChange={(event, value) => setCurrentPage(value)}
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
