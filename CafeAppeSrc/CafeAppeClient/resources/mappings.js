module.exports.PATH = Object.freeze({
    ADMIN_PAGE_PATH: '/Users/adtalkguest/Documents/GitHub/CafeAppe/CafeAppeSrc/CafeAppeClient/html/admin.html',
    ADD_CAFE_PATH: '/Users/adtalkguest/Documents/Github/CafeAppe/CafeAppeSrc/CafeAppeClient/html/addCafe.html',
    VIEW_CAFE_PATH: '/Users/adtalkguest/Documents/Github/CafeAppe/CafeAppeSrc/CafeAppeClient/html/viewCafes.html'
});


module.exports.SQL = Object.freeze({
    CREATE_PRODUCT: 'insert into CafeAppe.Product values ($1, $2, $3, $4, $5, $6, $7, $8)',
    VIEW_PRODUCT: 'select * from CafeAppe.Product',
    VIEW_PRODUCT_BY_ID: 'select * from CafeAppe.product where productId = ($1)',
    CREATE_PRODUCT_SIZE: 'insert into CafeAppe.ProductSize values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    VIEW_PRODUCT_SIZE_BY_ID: 'select * from CafeAppe.productSize where productSizeId = ($1) and productId = ($2)'
})
