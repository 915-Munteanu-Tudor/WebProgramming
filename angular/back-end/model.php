<?php

require_once './DBUtils.php';
require_once 'user.php';

class Model {
    private $db;

    public function __construct() {
        $this->db = new DBUtils ();
    }

    public function getUser($user) {
        $resultset = $this->db->selectUser($user);
        //var_dump($resultset);
        $usr = new User($resultset[0]['Id'], $resultset[0]['Name'], $resultset[0]['Password']);
        return $usr;
    }

    public function getAllPurchases() {
        $resultset = $this->db->selectAllUsers();
        $students = array();
        foreach($resultset as $key=>$val) {
            $stud = $val;

            $purchases = $this->db->selectProductsForUser($stud['Id']);
            $stud['purchases'] = $purchases;

            array_push($students, $stud);
        }

        return $students;
    }

    public function addPurchase($user_id, $prod_id, $quantity) {
        return $this->db->addPurchase($user_id, $prod_id, $quantity);
    }

    public function validateUser($user, $pass) {
        return $this->db->validateUser($user, $pass);
    }

    public function deletePurchase($user, $purchase) {
        return $this->db->deletePurchase($user, $purchase);
    }

    public function getProductsForUser($user, $pass) {
        $id = $this->db->selectUser($user, $pass)[0]['Id'];
        $purchases = $this->db->selectProductsForUser($id);
        $all_products = array();
        foreach($purchases as $key=>$val) {
            $prch = $val;
            $prch_details = $this->db->selectProductsById($val['product_id']);
            $prch['product_id'] = $prch_details[0]['Id'];
            $prch['Name'] = $prch_details[0]['Name'];
            $prch['Categoty'] = $prch_details[0]['Category'];
            $prch['Price'] = $prch_details[0]['Price'];
            array_push($all_products, $prch);
        }
        return $all_products;

    }

    public function getPurchaseByUser($user) {
        $resultset = $this->db->selectUser($user);
        $user_products = $this->db->selectProductsForUser($resultset[0]['Id']);
    }

    public function update($qt, $uid, $pid) {
        return $this->db->update($qt, $uid, $pid);

    }

    public function getAllUsers() {
        $resultset = $this->db->selectAllUsers();
        return $resultset;
    }

    public function getUserPassword($u, $p) {
        $resultset = $this->db->selectUser($u, $p);
        return $resultset;
    }

    public function getAllProducts() {
        $resultset = $this->db->selectAllProducts();
        return $resultset;
    }

    public function getAllProductsByCategory($category) {
        $resultset = $this->db->selectAllProductsByCategory($category);
        return $resultset;
    }

}
