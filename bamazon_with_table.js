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
    queryData();
});

function queryData() {
    // display list of items
    conn.query('SELECT * FROM products', (err, response) => {
        printData(response);

    });

}


function printData(row) {

    // instantiate
    var table = new Table({
        head: ['ID', 'Product', "Price", "Quantity"],
        colWidths: [10, 50, 10, 10]
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends

    for (var i = 0; i < row.length; i++) {
        let data = [row[i].item_id, row[i].product_name, row[i].price, row[i].stock_quantity]
        table.push(data);
    }
    console.log(table.toString());

    makePurchaseQuestion(row);
}

function makePurchaseQuestion() {
    inquirer
        .prompt([{
                name: 'purchase',
                type: "list",
                message: "Do you wish to make a purchase?",
                choices: ["yes", "no"]
            }

        ]).then((data) => {
            if (data.purchase === "no") {
                process.exit();
            } else {
                conn.query('SELECT * FROM products', (err, response) => {
                    askQ1(response);
                });
            }
        })
}

function askQ1(product) {

    // prompt user to what they want to buy (by id) and  then quantity
    inquirer
        .prompt([{
                name: 'id',
                message: "Enter the ID number of the product you wish to purchase.",
            }, {
                name: 'quantity',
                message: "How many do you wish to buy?"
            }

        ])
        .then((data) => {


            // check to see if enough quantity in the database
            if (data.quantity < product[data.id - 1].stock_quantity) {
                conn.query(`UPDATE products SET stock_quantity= stock_quantity-${data.quantity} WHERE item_id=${data.id}`, (err, response) => {
                    queryData();
                });
            } else {
                console.log("Sorry! We suck at restocking, please try again another month!");
                makePurchaseQuestion();
            }
        })
}