const { 
    findProductById, 
    findListProduct, 
    createProduct, 
    updatedProduct, 
    deletedProduct,
    findRandomProducts 
} = require("../database/product");
const responseMessage = require("../message");

const getProductById = async (productId) => {
    const result = await findProductById(productId);

    if (!result) {
        throw new Error("Không tìm thấy sản phẩm phù hợp");
    } 

    return responseMessage("success",0,result);
};

const getListClassifiedProduct = async (classify) => {
    const result = await findListProduct(classify);

    if (!result) {
        throw new Error("Không tìm thấy danh sách sản phẩm phù hợp");
    }

    return responseMessage("success",0,result);
}; 

const getRandomProducts = async (productId) => {
    const result = await findRandomProducts(productId);

    if (!result) {
        return responseMessage("fail",1,"Không lấy được danh sách sản phẩm");
    }

    return responseMessage("success",0,result);
}

const createNewProduct = async (product) => {
    const result = await createProduct(product);

    if (!result) {
        return responseMessage("fail",1,"Tạo sản phẩm không thành công");
    }

    return responseMessage("success",0,result);
};

const updateProduct = async (forUpdate) => {
    const result = await updatedProduct(forUpdate);

    if (!result) {
        throw new Error("Cập nhật sản phẩm không thành công");
    }

    return responseMessage("success",0,result);
};

const deleteProduct = async (productId) => {
    const result = await deletedProduct(productId);

    if (!result) {
        throw new Error("Xóa sản phẩm không thành công");
    }

    return responseMessage("success",0,result);
};

module.exports = { getProductById, getListClassifiedProduct, createNewProduct, updateProduct, deleteProduct, getRandomProducts };