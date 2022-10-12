CREATE DATABASE luisascakeBD;

USE luisascakeBD;

CREATE TABLE person
(
	id_person INT PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(50) NULL,
	last_name VARCHAR(50) NULL,
	phone VARCHAR(11) NULL,
	address VARCHAR(90) NULL,
	reference VARCHAR(90) NULL,
	image VARCHAR(250) NULL
);

CREATE TABLE user
(
	id_user INT PRIMARY KEY AUTO_INCREMENT,
	name_user VARCHAR(50) NOT NULL,
	email_user VARCHAR(100) NOT NULL,
	status_user BOOL NULL DEFAULT 1,
	password VARCHAR(100) NOT NULL,
	token VARCHAR(256) NULL,
	verified_email BOOL NULL,
	created DATETIME DEFAULT NOW(),
	person_id INT NOT NULL,
	UNIQUE KEY (email_user),
	FOREIGN KEY (person_id) REFERENCES person(id_person)
);

CREATE TABLE category
(
	id_category INT PRIMARY KEY AUTO_INCREMENT,
	name_category VARCHAR(80) NOT NULL,
	link_category VARCHAR(80) NULL,
	picture VARCHAR(100) NULL,
	code_category VARCHAR(100) NULL,
	status BOOL DEFAULT 1
);

CREATE TABLE product
(
	id_product INT PRIMARY KEY AUTO_INCREMENT,
	name_product VARCHAR(90) NOT NULL,
	link_product VARCHAR(80) NULL,
	description VARCHAR(256) NULL,
	stock INT NULL,
	price DOUBLE(18,2) NOT NULL,
	picture VARCHAR(256) NULL,
	status VARCHAR(80) DEFAULT 'active',
	code_product VARCHAR(100) NULL,
	discount BOOL DEFAULT 0,
	discount_value INT NULL,
	cake BOOL DEFAULT 0,
	cake_value JSON NULL,
	padding BOOL DEFAULT 0,
	padding_value JSON NULL,
	category_id INT,
	FOREIGN KEY (category_id) REFERENCES category(id_category)
);

CREATE TABLE favorite
(
	id_favorite INT PRIMARY KEY AUTO_INCREMENT,
	product_id INT,
	user_id INT,
	FOREIGN KEY(product_id) REFERENCES product(id_product),
	FOREIGN KEY(user_id) REFERENCES user(person_id)
);

-- DROP TABLE category;
-- DROP TABLE product;
-- DROP TABLE favorite;

--------------------------------------------------------------------------------------------------

CREATE TABLE orderBuy
(
	uidOrderBuy INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	receipt VARCHAR(100),
	created_at DATETIME DEFAULT NOW(),
	amount DOUBLE(11,2),
	FOREIGN KEY(user_id) REFERENCES users(persona_id)
);

CREATE TABLE orderDetails
(
	uidOrderDetails INT PRIMARY KEY AUTO_INCREMENT,
	orderBuy_id INT,
	product_id INT,
	quantity INT,
	price DOUBLE(11,2),
	FOREIGN KEY(orderBuy_id) REFERENCES orderBuy(uidOrderBuy),
	FOREIGN KEY(product_id) REFERENCES Products(uidProduct)
)


-------------------------------------------------------------------------------------------------

-- LIST NEWEST PRODUCTS
DELIMITER //
CREATE PROCEDURE SP_LIST_NEWEST_PRODUCTS()
BEGIN
	SELECT p.id_product, p.name_product, p.link_product, p.description, p.stock, p.price, p.picture, p.status, p.code_product, p.discount, p.discount_value, c.name_category,
	(SELECT COUNT(fa.id_favorite) FROM favorite fa WHERE fa.product_id = p.id_product ) AS is_favorite
	FROM product AS p
	INNER JOIN category AS c ON p.category_id = c.id_category
	ORDER BY p.id_product DESC LIMIT 6;
END

--- LIST PRODUCTS FOR CATEGORY
DELIMITER //
CREATE PROCEDURE SP_LIST_PRODUCTS_FOR_CATEGORY(IN LINK_CATEGORY VARCHAR(80))
BEGIN
	SELECT p.id_product, p.name_product, p.link_product, p.description, p.stock, p.price, p.picture, p.status, p.code_product, p.discount, p.discount_value, c.name_category, c.link_category,
	(SELECT COUNT(fa.id_favorite) FROM favorite fa WHERE fa.product_id = p.id_product ) AS is_favorite
	FROM product AS p
	INNER JOIN category AS c ON p.category_id = c.id_category
	LEFT JOIN favorite AS f ON p.id_product = f.product_id
	WHERE c.link_category = LINK_CATEGORY;
END

--- GET PRODUCT
DELIMITER //
CREATE PROCEDURE SP_GET_PRODUCT(IN LINK_PRODUCT VARCHAR(90))
BEGIN
	SELECT p.id_product, p.name_product, p.link_product, p.description, p.stock, p.price, p.picture, p.status, p.code_product, p.discount, p.discount_value, p.cake, p.cake_value, p.padding, p.padding_value, c.name_category, c.link_category,
	(SELECT COUNT(fa.id_favorite) FROM favorite fa WHERE fa.product_id = p.id_product ) AS is_favorite
	FROM product AS p
	INNER JOIN category AS c ON p.category_id = c.id_category
	LEFT JOIN favorite AS f ON p.id_product = f.product_id
	WHERE p.link_product = LINK_PRODUCT;
END




--- GET SEARCH FOR PRODUCT
DELIMITER //
CREATE PROCEDURE SP_GET_SEARCH_FOR_PRODUCT(IN NAME_PRODUCT VARCHAR(80))
BEGIN
	SELECT p.id_product, p.name_product, p.link, p.description, p.stock, p.price, p.picture, p.status, p.code_product, c.name_category, c.id_category
	FROM products AS p
	INNER JOIN categories AS c ON p.category_id = c.id_category
	WHERE p.name_product = NAME_PRODUCT;
END

------------------------------------------------------------------------------------------------


DELIMITER //
CREATE PROCEDURE SP_GET_USER_BY_ID(IN UID INT )
BEGIN
	SELECT pe.uid, pe.firstName, pe.lastName, pe.phone, pe.address, pe.reference, pe.image, us.users, us.email 
	FROM person pe
	INNER JOIN users us ON pe.uid = us.persona_id
	WHERE pe.uid = UID;
END//


-- Add new users
DELIMITER //
CREATE PROCEDURE SP_REGISTER_USER (IN usu VARCHAR(50), IN email VARCHAR(100), IN passwordd VARCHAR(100) )
BEGIN
	INSERT INTO person ( firstName ) VALUE ( usu );
	INSERT INTO users ( users, email, passwordd , persona_id ) VALUE (usu, email, passwordd, LAST_INSERT_ID());
END//


DELIMITER //
CREATE PROCEDURE SP_UPDATE_INFORMATION( IN uid INT, IN nam VARCHAR(90), IN lastt VARCHAR(90), IN phone VARCHAR(11), IN address VARCHAR(90), IN reference VARCHAR(90))
BEGIN
	UPDATE person
		SET firstName = nam, 
			 lastName = lastt,
			 phone = phone, 
			 address = address, 
			 reference = reference
	WHERE person.uid = uid;
END//


-- Update Street Address - user
DELIMITER //
CREATE PROCEDURE SP_UPDATE_STREET(IN uid INT, IN ADDRESS VARCHAR(90), IN REFERENCESS VARCHAR(90) )
BEGIN
	UPDATE person
		SET address = ADDRESS, 
			 reference = REFERENCESS
	WHERE person.uid = uid;
END//


-- LIST PRODUCTS HOME
DELIMITER //
CREATE PROCEDURE SP_LIST_PRODUCTS_HOME(IN UID INT)
BEGIN
	SELECT uidProduct, nameProduct, description, codeProduct, stock, price, p.status, p.picture, c.category,
	(SELECT COUNT(fa.uidFavorite) FROM favorite fa WHERE fa.user_id = UID AND fa.product_id = p.uidProduct ) AS is_favorite
	FROM Products AS p
	INNER JOIN Category AS c ON p.category_id = c.uidCategory
	ORDER BY uidProduct DESC LIMIT 10;
END//


--- LIST FAVORITE OF PRODUCTS
DELIMITER //
CREATE PROCEDURE SP_LIST_FAVORITE_PRODUCTS( IN UID INT )
BEGIN
	SELECT uidProduct, nameProduct, description, codeProduct, stock, price, p.status, p.picture, c.category,
	(SELECT COUNT(fa.uidFavorite) FROM favorite fa WHERE fa.user_id = UID AND fa.product_id = p.uidProduct ) AS is_favorite
	FROM Products AS p
	INNER JOIN Category AS c ON p.category_id = c.uidCategory
	INNER JOIN favorite AS f ON p.uidProduct = f.product_id
	INNER JOIN users AS u ON f.user_id = u.id
	WHERE u.id = UID;
END//

--- LIST PRODUCTS FOR CATEGORIES
DELIMITER //
CREATE PROCEDURE SP_LIST_PRODUCTS_FOR_CATEGORY(IN UIDCATEGORY INT, IN UIDUSER INT)
BEGIN
	SELECT uidProduct, nameProduct, description, codeProduct, stock, price, p.status, p.picture, c.category,
	(SELECT COUNT(fa.uidFavorite) FROM favorite fa WHERE fa.user_id = UIDUSER AND fa.product_id = p.uidProduct ) AS is_favorite
	FROM Products AS p
	INNER JOIN Category AS c ON p.category_id = c.uidCategory
	LEFT JOIN favorite AS f ON p.uidProduct = f.product_id
	LEFT JOIN users AS u ON f.user_id = u.id
	WHERE c.uidCategory = UIDCATEGORY;
END//


-- GET PRODUCTS FOR ID USER
DELIMITER //
CREATE PROCEDURE SP_ORDER_DETAILS( IN ID INT )
BEGIN
	SELECT o.uidOrderDetails, o.product_id, p.nameProduct, p.picture, o.quantity, o.price  FROM orderdetails o
	INNER JOIN products p ON o.product_id = p.uidProduct
	WHERE o.orderBuy_id = ID;
END//











