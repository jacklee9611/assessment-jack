const express = require("express");
const router = express.Router();
const { Products } = require("../models"); // require Products model to perform APIs

// To fetch products
router.get("/fetchProduct", async (req, res) => {
  const productsList = await Products.findAll();
  res.json(productsList);
});

// To fetch products by Id
router.get("/fetchProductbyId/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Products.findOne({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});

// To insert new product into db
router.post("/newProduct", async (req, res) => {
  const postProduct = req.body;

  try {
    // Attempt to create the new product in the database
    const createdProduct = await Products.create(postProduct);

    // If the product was successfully created, send a success response
    res.status(201).json({
      message: "Product added successfully",
      product: createdProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);

    // If an error occurred, send an error response
    res.status(500).json({ error: "Failed to add the product" });
  }
});

// To update an existing product by product ID
router.put("/update/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { productBrand, productName, productBarcode, imageUrl } = req.body;

    // Find the product by product ID param
    const product = await Products.findOne({
      where: { id: productId },
    });

    // If the product is not found, return an error
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the selected product's fields
    product.productBrand = productBrand;
    product.productName = productName;
    product.productBarcode = productBarcode;

    // Update the image URL if it's provided in the request
    if (imageUrl) {
      product.productImage = imageUrl;
    }

    await product.save(); // Save the updated product data

    // Respond with a success message
    return res.json({ message: "Product updated successfully!" });
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({ error: "Failed to update the product" });
  }
});

// To delete a product by product ID
router.delete("/delete/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find and delete the product by product ID param
    const deletedProduct = await Products.destroy({
      where: { id: productId },
    });

    // If product not found, return error
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Respond with success message
    return res.json({ message: "Product deleted successfully!" });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).json({ error: "Failed to delete the product" });
  }
});

module.exports = router;
