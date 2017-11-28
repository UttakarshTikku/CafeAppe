-- -----------------------------------------------------
-- Schema CafeAppe
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS CafeAppe;
SET search_path TO CafeAppe ;

-- -----------------------------------------------------
-- Table `CafeAppe`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.state (
  stateId VARCHAR(4) NOT NULL,
  stateName VARCHAR(50) NOT NULL,
  activeFlag BOOLEAN NOT NULL,
  PRIMARY KEY (stateId))
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`postcode`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.postcode (
  postcodeId VARCHAR(4) NOT NULL,
  stateId VARCHAR(4) NOT NULL,
  activeFlag BOOLEAN NOT NULL,
  PRIMARY KEY (postcodeId)
 ,
  CONSTRAINT postcodeState
    FOREIGN KEY (stateId)
    REFERENCES CafeAppe.state (stateId)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`suburb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.suburb (
  suburbId INT NOT NULL,
  suburbName VARCHAR(100) NOT NULL,
  postcodeId VARCHAR(4) NOT NULL,
  activeFlag BOOLEAN NOT NULL,
  PRIMARY KEY (suburbId)
 ,
  CONSTRAINT suburbPostcode
    FOREIGN KEY (postcodeId)
    REFERENCES CafeAppe.postcode (postcodeId)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
;



-- -----------------------------------------------------
-- Table `CafeAppe`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.address (
  addressId INT NOT NULL,
  unitNumber VARCHAR(100) NOT NULL,
  streetName VARCHAR(100) NOT NULL,
  suburbId INT NOT NULL,
  PRIMARY KEY (addressId)
 ,
  CONSTRAINT addressSuburb
    FOREIGN KEY (suburbId)
    REFERENCES CafeAppe.suburb (suburbId)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
;



-- -----------------------------------------------------
-- Table `CafeAppe`.`userRole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.userRole (
  userRoleCode SMALLINT NOT NULL,
  description VARCHAR(100) NOT NULL,
  PRIMARY KEY (userRoleCode))
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.user (
  userid INT NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  contact VARCHAR(15) NOT NULL,
  addressId INT NULL DEFAULT NULL,
  activeFlag BOOLEAN NOT NULL,
  userRoleCode SMALLINT NOT NULL,
  PRIMARY KEY (userid)
 ,
  CONSTRAINT userAddress
    FOREIGN KEY (addressId)
    REFERENCES CafeAppe.address (addressId)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT user_role_ref
    FOREIGN KEY (userRoleCode)
    REFERENCES CafeAppe.userRole (userRoleCode)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;



-- -----------------------------------------------------
-- Table `CafeAppe`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.location (
  locationId INT NOT NULL,
  latitude DECIMAL(10,6) NOT NULL,
  longitude DECIMAL(10,6) NOT NULL,
  PRIMARY KEY (locationId))
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`cafe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.cafe (
  cafeId INT NOT NULL,
  addressId INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  locationId INT NOT NULL,
  activeFlag BOOLEAN NOT NULL,
  createdBy INT NOT NULL,
  createdDateTime TIMESTAMP(0) NOT NULL,
  modifiedDateTime TIMESTAMP(0) NOT NULL,
  modifiedBy INT NOT NULL,
  PRIMARY KEY (cafeId)
 ,
  CONSTRAINT cafeAddress
    FOREIGN KEY (addressId)
    REFERENCES CafeAppe.address (addressId)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT cafeLocation
    FOREIGN KEY (locationId)
    REFERENCES CafeAppe.location (locationId)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT cafeCreatedByUser
    FOREIGN KEY (createdBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT cafeModifiedBy
    FOREIGN KEY (modifiedBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;



-- -----------------------------------------------------
-- Table `CafeAppe`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.product (
  cafeId INT NOT NULL,
  productId INT NOT NULL,
  productName VARCHAR(45) NOT NULL,
  activeFlag BOOLEAN NOT NULL,
  createdBy INT NOT NULL,
  createdDateTime TIMESTAMP(0) NOT NULL,
  modifiedDateTime TIMESTAMP(0) NOT NULL,
  modifiedBy INT NOT NULL,
  PRIMARY KEY (productId)
 ,
  CONSTRAINT cafeProducts
    FOREIGN KEY (cafeId)
    REFERENCES CafeAppe.cafe (cafeId)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT cafeProductsCreator
    FOREIGN KEY (createdBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT cafeProductModifier
    FOREIGN KEY (modifiedBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;



-- -----------------------------------------------------
-- Table `CafeAppe`.`productSize`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.productSize (
  productId INT NOT NULL,
  productSizeId VARCHAR(100) NOT NULL,
  price DECIMAL(3,2) CHECK (price > 0) NOT NULL,
  tax DECIMAL(3,2) CHECK (tax > 0) NOT NULL,
  activeFlag BOOLEAN NOT NULL,
  createdBy INT NOT NULL,
  createdDateTime TIMESTAMP(0) NOT NULL,
  modifiedDateTime TIMESTAMP(0) NOT NULL,
  modifiedBy INT NOT NULL,
  PRIMARY KEY (productId, productSizeId),
  CONSTRAINT productId_UNIQUE UNIQUE  (productId)
 ,
  CONSTRAINT productMultipleSizes
    FOREIGN KEY (productId)
    REFERENCES CafeAppe.product (productId)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT productSizesCreator
    FOREIGN KEY (createdBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT productSizeModifier
    FOREIGN KEY (modifiedBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;



-- -----------------------------------------------------
-- Table `CafeAppe`.`offer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.offer (
  promoCode VARCHAR(50) NOT NULL,
  discount DECIMAL(3,2) NOT NULL,
  modulus INT NOT NULL,
  productId INT NULL DEFAULT NULL,
  cafeId INT NULL DEFAULT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  createdBy INT NOT NULL,
  createdDateTime TIMESTAMP(0) NOT NULL,
  modifiedBy INT NOT NULL,
  modifiedDateTime TIMESTAMP(0) NOT NULL,
  PRIMARY KEY (promoCode)
 ,
  CONSTRAINT productOfferId
    FOREIGN KEY (productId)
    REFERENCES CafeAppe.product (productId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT cafeOfferId
    FOREIGN KEY (cafeId)
    REFERENCES CafeAppe.cafe (cafeId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT offerCreatedById
    FOREIGN KEY (createdBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT offerModifiedById
    FOREIGN KEY (modifiedBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;



-- -----------------------------------------------------
-- Table `CafeAppe`.`orderType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.orderType (
  orderTypeId SMALLINT NOT NULL,
  description VARCHAR(50) NOT NULL,
  PRIMARY KEY (orderTypeId))
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.Order (
  OrderId INT NOT NULL,
  userId INT NOT NULL,
  cafeId INT NOT NULL,
  locationId INT NOT NULL,
  promoCode VARCHAR(50) NULL DEFAULT NULL,
  deliveryTime TIMESTAMP(0) NOT NULL,
  orderTime TIMESTAMP(0) NOT NULL,
  isDeliveredFlag BOOLEAN NOT NULL,
  orderTypeId SMALLINT NOT NULL,
  isCancelledFlag BOOLEAN NOT NULL,
  PRIMARY KEY (OrderId)
 ,
  CONSTRAINT orderLocation
    FOREIGN KEY (locationId)
    REFERENCES CafeAppe.location (locationId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT userOrder
    FOREIGN KEY (userId)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT order_orderType
    FOREIGN KEY (orderTypeId)
    REFERENCES CafeAppe.orderType (orderTypeId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT orderOffer
    FOREIGN KEY (promoCode)
    REFERENCES CafeAppe.offer (promoCode)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`orderItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.orderItem (
  orderId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT NOT NULL,
  productSizeId VARCHAR(100) NOT NULL,
  itemCost DECIMAL(10,2) CHECK (itemCost > 0) NOT NULL,
  PRIMARY KEY (orderId)
 ,
  CONSTRAINT order_orderItems
    FOREIGN KEY (orderId)
    REFERENCES CafeAppe.Order (OrderId)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT orderItem_productId
    FOREIGN KEY (productId , productSizeId)
    REFERENCES CafeAppe.productSize (productId , productSizeId)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`programRule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.programRule (
  programId INT NOT NULL,
  rewardThreshold INT NOT NULL,
  visitPoints INT NOT NULL,
  paybackPoints INT NOT NULL,
  createdBy INT NOT NULL,
  createDateTime TIMESTAMP(0) NOT NULL,
  modifiedDateTime TIMESTAMP(0) NOT NULL,
  modifiedBy INT NOT NULL,
  PRIMARY KEY (programId)
 ,
  CONSTRAINT programRuleCreatedByRef
    FOREIGN KEY (createdBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT programRuleModifier
    FOREIGN KEY (modifiedBy)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`userReward`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.userReward (
  programId INT NOT NULL,
  userId INT NOT NULL,
  pointsEarned INT CHECK (pointsEarned > 0) NOT NULL,
  lastUpdated TIMESTAMP(0) NOT NULL,
  PRIMARY KEY (programId)
 ,
  CONSTRAINT program_userReward_ref
    FOREIGN KEY (programId)
    REFERENCES CafeAppe.programRule (programId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_userReward_ref
    FOREIGN KEY (userId)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`cafeProgram`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.cafeProgram (
  programId INT NOT NULL,
  cafeId INT NOT NULL,
  activeFlag BOOLEAN NOT NULL,
  PRIMARY KEY (programId, cafeId)
 ,
  CONSTRAINT cafeProgramRef
    FOREIGN KEY (cafeId)
    REFERENCES CafeAppe.cafe (cafeId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT cafeProgramRuleRef
    FOREIGN KEY (programId)
    REFERENCES CafeAppe.programRule (programId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`redemption`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.redemption (
  userId INT NOT NULL,
  cafeId INT NOT NULL,
  programId INT NOT NULL,
  redeemedTime TIMESTAMP(0) NOT NULL,
  PRIMARY KEY (userId)
 ,
  CONSTRAINT user_rewardRedemption_ref
    FOREIGN KEY (userId)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_CafeRewards_ref
    FOREIGN KEY (cafeId , programId)
    REFERENCES CafeAppe.cafeProgram (cafeId , programId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `CafeAppe`.`userLocation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CafeAppe.userLocation (
  userId INT NOT NULL,
  locationId INT NOT NULL,
  locationTime TIMESTAMP(0) NOT NULL,
  PRIMARY KEY (userId, locationId)
 ,
  CONSTRAINT location_userId_Ref
    FOREIGN KEY (userId)
    REFERENCES CafeAppe.user (userid)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT userLocation_locationId_ref
    FOREIGN KEY (locationId)
    REFERENCES CafeAppe.location (locationId)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;