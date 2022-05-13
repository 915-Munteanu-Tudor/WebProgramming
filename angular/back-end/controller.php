<?php
header("Access-Control-Allow-Origin: *");
require_once './model.php';
require_once './view.php';

class Controller
{
    private $view;
    private $model;

    public function __construct(){
        $this->model = new Model ();
        $this->view = new View();
    }

    public function service() {
        if (isset($_GET['action']) && !empty($_GET['action'])) {
            if ($_GET['action'] == "getUser") {
                $this->{$_GET['action']}($_GET['user']);
            } else if($_GET['action'] == "getProductsForUserPassword") {
                $this->{$_GET['action']}($_GET['user'], $_GET['password']);
            } else if($_GET['action'] == "validateUser") {
                $this->{$_GET['action']}($_GET['user'], $_GET['password']);
            } else if($_GET['action'] == "deletePurchase") {
                $this->{$_GET['action']}($_GET['prid'], $_GET['uid']);
            } else if($_GET['action'] == "getAllProductsByCategory") {
                $this->{$_GET['action']}($_GET['category']);

            }else if($_GET['action'] == "update") {
                $this->{$_GET['action']}($_GET['d'], $_GET['uid'], $_GET['pid']);
            } else if($_GET['action'] == "getUserPassword") {
                $this->{$_GET['action']}($_GET['user'], $_GET['password']);
            } else if($_GET['action'] == "addPurchase") {
                $this->{$_GET['action']}($_GET['user'], $_GET['prod'], $_GET['quantity']);
            }
            else {
                $this->{$_GET['action']}();
            }
        }
    }

    public function addPurchase($user_id, $prod_id, $quantity) {
        $this->model->addPurchase($user_id, $prod_id, $quantity);
    }

    public function getUser($usr) {
        $usr = $this->model->getUser($usr);
        return $this->view->output($usr);
    }

    public function update($qt, $uid, $pid) {
        $this->model->update($qt, $uid, $pid);
    }

    public function deletePurchase($pid, $uid) {
        $this->model->deletePurchase($uid, $pid);
    }


    public function getProductsForUserPassword($user, $pass) {
        $rooms = $this->model->getProductsForUser($user, $pass);
        return $this->view->output($rooms);
    }

    public function getAllUsers() {
        $users = $this->model->getAllUsers();
        return $this->view->output($users);
    }

    public function getAllProducts() {
        $rooms = $this->model->getAllProducts();
        return $this->view->output($rooms);
    }

    public function getAllProductsByCategory($category) {
        $rooms = $this->model->getAllProductsByCategory($category);
        return $this->view->output($rooms);
    }

    public function validateUser($user, $pass) {
        $result = $this->model->validateUser($user, $pass);
        echo $result;
    }

    public function getUserPassword($user, $pass) {
        $result = $this->model->getUserPassword($user, $pass);
        return $this->view->output($result);
    }
}

$controller = new Controller();
$controller->service();

