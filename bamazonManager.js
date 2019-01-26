const mysql = require('mysql');
const inquirer = require("inquirer");
var Table = require('cli-table');



const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'
});


conn.connect((err) => {
    if (err) throw err;
    console.log(`Database connected on thread: ${conn.threadId}`);
    managerMenu();
});

function queryData() {
    // display list of items
    conn.query('SELECT * FROM products', (err, response) => {
        printData(response);
        managerMenu();
    });

}


function printData(row) {

    // making the table
    var table = new Table({
        head: ['ID', 'Product', "Price", "Quantity"],
        colWidths: [10, 50, 10, 10]
    });
    // putting data into the table from mysql
    for (var i = 0; i < row.length; i++) {
        let data = [row[i].item_id, row[i].product_name, row[i].price, row[i].stock_quantity]
        table.push(data);
    }
    console.log(table.toString());
}

function managerMenu() {
    inquirer
        .prompt([{
                name: 'menu',
                type: "list",
                message: "Please select one of the following",
                choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Exit"]
            }

        ]).then((data) => {

            switch (data.menu) {
                case "View products for sale":
                    queryData();
                    return;
                case "View low inventory":
                    lowInventory();
                    return;
                case "Add to inventory":
                    updateInventory();
                    return;
                case "Add new product":
                    addProduct()
                    return;

                default:
                    process.exit();
                    break;
            }
        })
}

function updateInventory() {
    inquirer.prompt([{
        name: 'id',
        message: "Enter the ID number of the product you wish to add 10 more to in quantity."
    }]).then((data) => {
        console.log("Updating inventory...\n");
        conn.query(
            "UPDATE products SET stock_quantity= stock_quantity + 10 WHERE ?",
            [{
                item_id: data.id
            }],
            function (err, res) {
                managerMenu()
            }
        );
    })

}

function addProduct() {

    inquirer.prompt([{
        name: 'product_name',
        message: "Enter the name of the product."
    }, {
        name: 'department_name',
        message: "Enter the department of the product."
    }, {
        name: 'price',
        message: "Enter the price of the product."
    }, {
        name: 'stock_quantity',
        message: "Enter the stock quantity of the product."
    }]).then((data) => {
        console.log("Inserting a new product...\n");
        conn.query(
            "INSERT INTO products SET ?", {
                product_name: data.product_name,
                department_name: data.department_name,
                price: data.price,
                stock_quantity: data.stock_quantity
            },
            function (err, res) {
                managerMenu();
            }
        );
    })

}

function lowInventory() {
    var query = "SELECT * FROM products HAVING stock_quantity < 5";
    conn.query(query, function (err, res) {
        printData(res);
        managerMenu();
    });
}