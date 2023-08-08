const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors module

const server = express();
server.use(bodyParser.json());
server.use(cors()); 

//database connection
const db=mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'productapp_node'

});

db.connect(function (error) {
    if (error) {
      console.error('Error connecting to MySQL:', error);
    } else {
      console.log('Connected to MySQL');
    }
  });
  
//port
  server.listen(8088,function check(error)
  {
    if(error){
        console.log("Error....!!!!");
    }
    else{
        console.log("server started....8088");
    }
  }
  );
   //insert record
   server.post('/api/products/add', (req, res) => {
    let details = {
      product_name: req.body.product_name,
      compony_name: req.body.compony_name,
      price: req.body.price,
    };
    let sql = 'INSERT INTO products SET ?';
    db.query(sql, details, (error) => {
      if (error) {
        console.error('Error inserting product:', error);
        res.status(500).send({ status: false, message: 'Product creation failed' });
      } else {
        res.status(200).send({ status: true, message: 'Product created successfully' });
      }
    });
  });

  //view the Records
server.get("/api/products", (req, res) => {
    var sql = "SELECT * FROM products";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
//Search the Records
server.get("/api/products/:product_id", (req, res) => {
    var prod_id = req.params.id;
    var sql = "SELECT * FROM products WHERE product_id=" + prod_id;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
//Update the Records
server.put("/api/products/update/:product_id", (req, res) => {
    let sql =
      "UPDATE products SET product_name='" +
      req.body.product_name +
      "', compony_name='" +
      req.body.compony_name +
      "',price='" +
      req.body.price +
      "'  WHERE product_id=" +
      req.params.product_id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "product Updated Failed" });
      } else {
        res.send({ status: true, message: "product  Updated successfully" });
      }
    });
  });
  //Delete the Records
  server.delete("/api/products/delete/:product_id", (req, res) => {
    let sql = "DELETE FROM products WHERE product_id=" + req.params.product_id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "product Deleted Failed" });
      } else {
        res.send({ status: true, message: "product Deleted successfully" });
      }
    });
  });
  