module.exports = (sequelize, DataTypes) => {
  // create Products model
  const Products = sequelize.define("Products", {
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productBarcode: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });

  return Products;
};
