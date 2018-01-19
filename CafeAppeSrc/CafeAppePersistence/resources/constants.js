module.exports.SQL = Object.freeze({
    DATASOURCE: 'postgres://localhost:5432/postgres',
    CREATE_PRODUCT: "insert into CafeAppe.Product values ($1, (select nextval('CafeAppe.product_id_seq')), $2, $3, $4, $5, $6, $7)",
    VIEW_PRODUCT: 'select p.productid, p.productname, ps.productsizeid, ps.price from CafeAppe.Product p , CafeAppe.productsize ps where p.productid = ps.productid and p.activeflag = true',
    VIEW_PRODUCT_BY_ID: 'select * from CafeAppe.product where productId = ($1)',
    CREATE_PRODUCT_SIZE: "insert into CafeAppe.ProductSize values ((select currval('CafeAppe.product_id_seq')) , (select nextval('CafeAppe.productsize_id_seq')), $1, $2, $3, $4, $5, $6, $7)",
    VIEW_PRODUCT_SIZE_BY_ID: 'select * from CafeAppe.productSize where productSizeId = ($1) and productId = ($2)',
    GET_ALL_STATES: 'select * from cafeappe.state',
    ADD_NEW_CAFE: "insert into CafeAppe.cafe(name,activeflag,createdby,createddatetime,modifieddatetime,modifiedby) values ($1,true, $2, current_timestamp, current_timestamp, $3)",
    ADD_NEW_ADDRESS: "insert into CafeAppe.address(unitnumber,streetname,suburbid) values ($1, $2, $3)",
    ADD_NEW_LOCATION: "insert into CafeAppe.location (latitude,longitude) values ($1, $2)",
    GET_ALL_SUBURBS_FOR_STATE: 'select suburbid, suburbname from cafeappe.suburb where postcodeid in (select postcodeid from cafeappe.postcode p inner join cafeappe.state s on s.stateid = p.stateid and s.stateid = ($1) )',
    GET_ALL_CAFES: 'select c.cafeid, c.name as cafename, a.unitNumber, a.streetName, p.stateId from cafeappe.cafe c inner join cafeappe.address a on c.addressId = a.addressId inner join cafeappe.suburb s on a.suburbid = s.suburbid inner join cafeappe.postcode p on s.postcodeid = p.postcodeid where c.activeflag = true and s.activeflag = true and p.activeflag = true',
    GET_ARCHIVED_CAFES: 'select c.cafeid, c.name as cafename, a.unitNumber, a.streetName, p.stateId from cafeappe.cafe c inner join cafeappe.address a on c.addressId = a.addressId inner join cafeappe.suburb s on a.suburbid = s.suburbid inner join cafeappe.postcode p on s.postcodeid = p.postcodeid where c.activeflag = false and s.activeflag = true and p.activeflag = true',
    GET_PRODUCT: 'select p.productname, ps.productsizeid, ps.price from CafeAppe.product p, CafeAppe.productsize ps where p.productid = ps.productid and p.productid = ($1)',
    UPDATE_PRODUCT: "update CafeAppe.product set productname = ($2), modifieddatetime = ($3), modifiedby = ($4) where productid = ($1) ",
    ARCHIVE_PRODUCT: "update CafeAppe.product set activeflag = false where productid = ($1) ",
    SET_ACTIVE_CAFE_FALSE: "update CafeAppe.cafe set activeflag = false where cafeid = ($1)",
    UPDATE_ADDRESS: "update CafeAppe.address set unitnumber = ($1) ,streetname = ($2), suburbid = ($3) where addressid = (select addressid from CafeAppe.cafe where cafeId = ($4))",
    UPDATE_CAFE_INFO: "update CafeAppe.cafe set name = ($1),modifieddatetime = now() ,modifiedby = ($2) where cafeid = ($3)",
    GET_ORDERS_BY_CAFE_ID: "select orderid, userid, cafeid, locationid, promocode, cast(deliverytime - now() as time) as expectedDeliveryTime, cast(now() - ordertime as time) as orderPlacedAt, isdeliveredflag, ordertypeid, iscancelledflag from CafeAppe.order where cafeid = ($1) and isdeliveredflag = ($2) and iscancelledflag = ($3) and ordertime >= (now() - interval '12 hours')",
    GET_ORDER_ITEMS_BY_ORDER_ID: "select pr.productname, ps.productsizeid, oi.quantity, oi.itemcost, oi.isItemReady from CafeAppe.orderitem oi inner join CafeAppe.product pr on oi.productid = pr.productid inner join CafeAppe.productsize ps on oi.productsizeid = ps.productsizeid where oi.orderid = ($1)",
    COMPLETE_ORDER_BY_ORDER_ID: "update CafeAppe.order set isdeliveredflag = true where orderid = ($1)",
    COMPLETE_ALL_ITEMS_FOR_ORDER_ID: "update CafeAppe.orderitem set isItemReady = true where orderid = ($1)",
    CANCEL_ORDER_BY_ORDER_ID: "update CafeAppe.order set isdeliveredflag = false, iscancelledflag = true where orderid = ($1)",
    SET_ACTIVE_CAFE_TRUE: "update CafeAppe.cafe set activeflag = true where cafeid = ($1)",
    UNDO_CANCEL_ORDER_BY_ORDER_ID: "update CafeAppe.order set isdeliveredflag = false, iscancelledflag = false where orderid = ($1)",
    UNDO_COMPLETED_ORDER_BY_ORDER_ID: "update CafeAppe.order set isdeliveredflag = false, iscancelledflag = false where orderid = ($1)",
    GET_ALL_OFFERS: "select * from CafeAppe.offer",
    ADD_NEW_OFFER: "insert into cafeappe.offer (promocode,discount,startdate,enddate,createdby,createddatetime,modifiedby,modifieddatetime,billedquantity,soldquantity,description) values (($1),($2),($3),($4),1,now(),1,now(),($5),($6),($7))",
    ADD_PRODUCTS_FOR_NEW_OFFER: "INSERT INTO cafeappe.offer_product (promocode, productid, activeflag) VALUES (($1), ($2),true )",
    ADD_CAFES_FOR_NEW_OFFER: "INSERT INTO cafeappe.offer_cafe (promocode, cafeid, activeflag) VALUES (($1), ($2),true )",
    GET_PRODUCTS_FOR_CAFE_IDS: "select * from cafeappe.product p inner join cafeappe.productsize ps on ps.productid = p.productid inner join cafeappe.menu m on ps.productid = m.productid and ps.productsizeid = m.productsizeid inner join cafeappe.cafe c on m.cafeid = c.cafeid where c.cafeid in ("
})
