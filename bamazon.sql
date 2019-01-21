DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;


CREATE TABLE products
(
    item_id INTEGER(11)
    AUTO_INCREMENT NOT NULL,
    product_name VARCHAR
    (100),
    department_name VARCHAR
    (100),
    price DECIMAL
    (5,2),
    stock_quantity INTEGER
    (11),
  PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ('Scythe', "Games", 69.99, 7);

    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ("To All the Boys I've Loved Before", "Books", 9.99, 10);

    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ('Voss Water', "Produce", 3.99, 102);

    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ('Nutella', "Produce", 5.99, 18);

    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ('Risk', "Games", 39.99, 5);
    
    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ('Scythe Expansion: Invaders from Afar', "Games", 29.99, 3);

    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ("Grey", "Books", 9.99, 15);

    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ('Watermelon', "Produce", 1.99, 6);

    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ('Almond Butter', "Produce", 4.99, 20);

    INSERT INTO products
        (product_name,department_name, price, stock_quantity)
    values
        ('Scrabble', "Games", 19.99, 8);