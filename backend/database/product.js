const { db } = require("./");
const { ObjectId } = require("mongodb");

const findProductById = async (productId) => {
    const product = await db.products
        .find({
            _id: ObjectId(productId)
        })
        .toArray();
    return product;
};

const findListProduct = async (classify) => {
    const listProduct = await db.products
        .find({
            classify: 2
        })
        .toArray();
    return listProduct;
};

const createProduct = async (product) => {
    const insertedProduct = await db.products
        .insertOne(product);
    return {
        insertedId: insertedProduct.insertedId,
        product: product
    };
};

const updatedProduct = async(productId) => {

};

const deletedProduct = async(productId) => {

};

module.exports = { findProductById, findListProduct, createProduct, updatedProduct, deletedProduct };

