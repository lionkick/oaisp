<?php

$administrator_email = 'infoaoisp@gmail.com';

// форма "Замовити дзвінок"

if($_GET['form'] == 'consultForm'){
    if(!$_POST['phone']){
        echo json_encode(array('state' => 'error', 'msg' => 'Введіть, будь ласка, Ваш номер телефону!'));
    } else {
        mail(
            $administrator_email,
            "Замовлення дзвінка з сайту {$_SERVER['SERVER_NAME']}",
            "Хтось залишив замовлення на сайті на зворотній дзвінок. \n".
            "Зателефонуйте, будь ласка: ".htmlspecialchars($_POST['phone']),
            "From: ISP <no-reply@{$_SERVER['SERVER_NAME']}>"
        );
        echo json_encode(array('state' => 'success', 'msg' => 'Дякуємо, Ваш запит надіслано!'));
    }
}

// форма "Отримати консультацію"

if($_GET['form'] == 'contactForm'){
    if(!$_POST['name'] || !$_POST['phone']){
        echo json_encode(array('state' => 'error', 'msg' => 'Вкажіть, будь ласка, Ваші ім\'я та телефон!'));
    } else {
        mail(
            $administrator_email,
            "Замовлення консультації з сайту {$_SERVER['SERVER_NAME']}",
            "Хтось залишив замовлення на сайті на отримання консультації."."\n".
            "Ім'я: ".htmlspecialchars($_POST['name'])."\n".
            "Телефон: ".htmlspecialchars($_POST['phone'])."\n".
            "Опис: ".($_POST['details']? htmlspecialchars($_POST['phone']): '-'),
            "From: ISP <no-reply@{$_SERVER['SERVER_NAME']}>"
        );
        echo json_encode(array('state' => 'success', 'msg' => 'Дякуємо, Ваш запит надіслано!'));
    }
}