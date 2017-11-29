module.exports = Object.freeze({
    ADMIN_PAGE_PATH: 'C:/Users/Uttakarsh/Desktop/CafeAppe/CafeAppeSrc/CafeAppeClient/html/admin.html',
    ADD_CAFE_PATH: 'C:/Users/Uttakarsh/Desktop/CafeAppe/CafeAppeSrc/CafeAppeClient/html/addCafe.html',
    VIEW_CAFE_PATH: 'C:/Users/Uttakarsh/Desktop/CafeAppe/CafeAppeSrc/CafeAppeClient/html/viewCafes.html',
    CAFE_ADMIN_PATH: 'C:/Users/Uttakarsh/Desktop/CafeAppe/CafeAppeSrc/CafeAppeClient/html/cafeAdmin.html',
    ADD_PRODUCT_PATH: 'C:/Users/Uttakarsh/Desktop/CafeAppe/CafeAppeSrc/CafeAppeClient/html/addProduct.html',
    VIEW_PRODUCT_PATH: 'C:/Users/Uttakarsh/Desktop/CafeAppe/CafeAppeSrc/CafeAppeClient/html/viewProduct.html',
    VIEW_ARCHIVED_CAFES: 'C:/Users/Uttakarsh/Desktop/CafeAppe/CafeAppeSrc/CafeAppeClient/html/archivedCafes.html'
});


module.exports.SQL = Object.freeze({
    CREATE_PRODUCT: 'insert into CafeAppe.Product values ($1, $2, $3, $4, $5, $6, $7, $8)',
    VIEW_PRODUCT: 'select * from CafeAppe.Product',
    VIEW_PRODUCT_BY_ID: 'select * from CafeAppe.product where productId = ($1)',
    CREATE_PRODUCT_SIZE: 'insert into CafeAppe.ProductSize values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    VIEW_PRODUCT_SIZE_BY_ID: 'select * from CafeAppe.productSize where productSizeId = ($1) and productId = ($2)'
})
