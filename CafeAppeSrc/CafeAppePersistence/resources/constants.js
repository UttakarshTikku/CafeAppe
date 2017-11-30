module.exports.SQL = Object.freeze({
    DATASOURCE: 'postgres://dev:dev@localhost:5432/postgres',
    CREATE_PRODUCT: 'insert into CafeAppe.Product values ($1, $2, $3, $4, $5, $6, $7, $8)',
    VIEW_PRODUCT: 'select * from CafeAppe.Product',
    VIEW_PRODUCT_BY_ID: 'select * from CafeAppe.product where productId = ($1)',
    CREATE_PRODUCT_SIZE: 'insert into CafeAppe.ProductSize values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    VIEW_PRODUCT_SIZE_BY_ID: 'select * from CafeAppe.productSize where productSizeId = ($1) and productId = ($2)',
    GET_ALL_STATES: 'select * from cafeappe.state'
})
