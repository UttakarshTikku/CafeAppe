module.exports.SQL = Object.freeze({
    DATASOURCE: 'postgres://localhost:5432/akhileshlamba',
    CREATE_PRODUCT: 'insert into CafeAppe.Product values ($1, $2, $3, $4, $5, $6, $7, $8)',
    VIEW_PRODUCT: 'select p.productid, p.productname, ps.productsizeid, ps.price from CafeAppe.Product p , CafeAppe.productsize ps where p.productid = ps.productid',
    VIEW_PRODUCT_BY_ID: 'select * from CafeAppe.product where productId = ($1)',
    CREATE_PRODUCT_SIZE: 'insert into CafeAppe.ProductSize values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    VIEW_PRODUCT_SIZE_BY_ID: 'select * from CafeAppe.productSize where productSizeId = ($1) and productId = ($2)',
    GET_ALL_STATES: 'select * from cafeappe.state',
    ADD_NEW_CAFE: 'insert into CafeAppe.cafe values ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp, $7)',
    ADD_NEW_ADDRESS: 'insert into CafeAppe.address(addressid,unitnumber,streetname,suburbid) values ($1, $2, $3, $4)',
    ADD_NEW_LOCATION: 'insert into CafeAppe.location values ($1, $2, $3)',
    GET_ALL_SUBURBS_FOR_STATE: 'select suburbid, suburbname from cafeappe.suburb where postcodeid in (select postcodeid from cafeappe.postcode p inner join cafeappe.state s on s.stateid = p.stateid and s.stateid = ($1) )',
    GET_ALL_CAFES: 'select c.cafeid, c.name as cafename, a.unitNumber, a.streetName, p.stateId from cafeappe.cafe c inner join cafeappe.address a on c.addressId = a.addressId inner join cafeappe.suburb s on a.suburbid = s.suburbid inner join cafeappe.postcode p on s.postcodeid = p.postcodeid'
})
