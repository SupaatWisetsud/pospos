CREATE DATABASE db_pospos CHARACTER SET utf8 COLLATE utf8_bin;

CREATE TABLE tb_category (
    c_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    c_name VARCHAR(50) NOT NULL
);

CREATE TABLE tb_product (
    p_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    p_name VARCHAR(50) NOT NULL,
    p_cost INT NOT NULL,
    p_sale INT NOT NULL,
    p_category INT NOT NULL,
    p_type VARCHAR(20) NOT NULL DEFAULT "ชิ้น",
    p_count INT NOT NULL DEFAULT 0,
    p_alert INT NOT NULL DEFAULT 5,
    p_barcode VARCHAR(250),
    p_img TEXT DEFAULT "/img/system/product.png",
    FOREIGN KEY (p_category) REFERENCES tb_category(c_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tb_personnel (
    p_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    p_name VARCHAR(120) NOT NULL,
    p_email VARCHAR(60) NOT NULL,
    p_password TEXT NOT NULL,
    p_status VARCHAR(1) DEFAULT 'u',
    p_img TEXT DEFAULT "/img/system/user.png",
    p_phone VARCHAR(10) NOT NULL
);

CREATE TABLE tb_payment (
    p_bill INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    p_order TEXT NOT NULL,
    p_dateSale DATETIME NOT NULL DEFAULT NOW(),
    p_discount INT DEFAULT 0,
    p_typediscount ENUM("฿", "%") NOT NULL,
    p_sumtotal INT NOT NULL,
    p_total INT NOT NULL,
    p_payby VARCHAR(50) NOT NULL DEFAULT "เงินสด",
    p_status VARCHAR(50) DEFAULT "สำเร็จ"
);