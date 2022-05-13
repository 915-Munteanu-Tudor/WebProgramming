<?php

class DBUtils{
    private  $host = '127.0.0.1';
    private $db = 'ecommerceangular';
    private $user = 'root';
    private $password = '';
    private $charset = 'utf8';

    private $pdo;
    private $error;

    public function __construct(){
        $dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
        $opt = array(PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false);
        try {
            $this->pdo = new PDO($dsn, $this->user, $this->password, $opt);
        }
        catch (PDOException $e) {
            $this->error = $e->getMessage();
            echo "Error connecting to DB: " . $this->error;
        }
    }

    public function selectAllUsers() {
        $stmt = $this->pdo->query("SELECT * FROM Users");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function selectUser($name, $pass) {
        $stmt = $this->pdo->query("SELECT * FROM Users where Name='" . $name ."' and Password='" . $pass . "'");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function validateUser($name, $pass) {
        $stmt = $this->pdo->query("SELECT * FROM Users where Name='" . $name ."' and Password='" . $pass . "'");
        return $stmt->rowCount()>0;
    }

    public function selectAllProducts() {
        $stmt = $this->pdo->query("SELECT * FROM Products");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function selectAllProductsByCategory($category) {
        $stmt = $this->pdo->query("SELECT * FROM Products where Category='" . $category . "'");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function selectProductsForUser($userid) {
        $stmt = $this->pdo->query("SELECT * FROM Purchases where user_id=" . $userid);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function selectProductsByPrice($value) {
        $stmt = $this->pdo->query("SELECT * FROM Products where Price <=" . $value);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function selectProductsById($productid) {
        $stmt = $this->pdo->query("SELECT * FROM Products where Id=" . $productid);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($qt, $uid, $pid) {
        $affected_rows = $this->pdo->exec("UPDATE Purchases SET quantity=" . $qt ." where user_id=" . $uid . " and product_id=" . $pid);

    }

    public function addPurchase($user_id, $prod_id, $quantity) {
        $affected_rows = $this->pdo->exec("INSERT into Purchases values(" . $user_id . "," . $prod_id ."," . $quantity . ");");
        return $affected_rows;

    }

    public function deletePurchase($user_id, $prod_id) {
        $stmt = $this->pdo->exec("DELETE FROM Purchases where user_id=" . $user_id ." and product_id=" . $prod_id);
        return $stmt;
    }

}