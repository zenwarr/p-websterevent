<?php

// выбираем переменную, из которой будем получать переменные. $_GLOBALS не подходит, так как включает
// еще и переменные из $_COOKIE
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $request = $_GET;
} else {
  $request = $_POST;
}

if (isset($request['name'])) {
  $form_name = $request['name'];
} else {
  $form_name = 'Не указано';
}

if (isset($request['phone'])) {
  $form_phone = $request['phone'];
} else {
  $form_phone = 'Не указано';
}

if (isset($request['email'])) {
  $form_email = $request['email'];
} else {
  $form_email = 'Не указано';
}


// почта, на которую отправляется письмо с сообщением о заявке
$master_email = 'zenw@yandex.ru';

// тема сообщения
$message_subject = 'Заявка с сайта';

// обратный адрес
$message_sender = 'admin@example.com';

// текст сообщения
$message_text = "На вашем сайте была оставлена заявка. Клиент оставил следующие данные о себе:\n" .
                "Имя: $form_name\n" .
                "Номер телефона: $form_phone\n" .
                "E-mail: $form_email\n";

$message_headers = "Content-Type:text/plain;charset=utf-8\r\n" .
                   "From:$message_sender";

// отправляем сообщение
$send = mail($master_email, $message_subject, $message_text, $message_headers);

// перенаправление пользователя обратно на страницу через 3 секунды
$redirect_url = "index.html";
$redirect_time = 3; // в секундах
header("Refresh: $redirect_time; URL=$redirect_url");

// эта страничка будет показываться пользователю, пока браузер не перенаправил его обратно
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Спасибо за заявку!</title>
  </head>

  <body>
    <h1>Спасибо за заявку!</h1>

    <script>
    setTimeout(function() {
      location.replace("<?php echo $redirect_url; ?>");
    }, <?php echo $redirect_time * 1000; ?>);
    </script>
  </body>
</html>

