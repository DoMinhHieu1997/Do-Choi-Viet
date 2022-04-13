const { findProductById, findListProduct, createProduct } = require("../database/product");

const getProductById = async (productId) => {
    const product = await findProductById(productId);

    if (!product) {
        throw new Error("Không tìm thấy sản phẩm phù hợp");
    } 

    return product;
};

const getListClassifiedProduct = async (classify) => {
    const listProduct = await findListProduct(classify);

    if (!listProduct) {
        throw new Error("Không tìm thấy danh sách sản phẩm phù hợp");
    }

    return listProduct;
} 

const createNewProduct = async (product) => {
    const newProduct = await createProduct(product);

    if (!newProduct) {
        throw new Error("Tạo sản phẩm không thành công");
    }

    return newProduct;
}

module.exports = { getProductById, getListClassifiedProduct, createNewProduct };