CREATE DATABASE IF NOT EXISTS luisascakeBD;

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