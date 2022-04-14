const { db } = require("./");
const { ObjectId } = require("mongodb");
const req = require("express/lib/request");

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

const updatedProduct = async(productInfo) => {
    const result = await db.products.updateOne(
        {
            _id: ObjectId(productInfo.id)
        },
        {
            $set: {
                name: productInfo?.name,
                size: productInfo?.size,
                classify: productInfo?.classify,
                type: productInfo?.type,
                images: productInfo?.images,
                content: productInfo?.content,
                description: productInfo?.description
            }
        }
    );
    return result;
};

const deletedProduct = async(productId) => {
    const result = await db.products.deleteOne({
        _id: ObjectId(productId)
    });
    return {
        deletedId: productId
    };
};

module.exports = { findProductById, findListProduct, createProduct, updatedProduct, deletedProduct };

