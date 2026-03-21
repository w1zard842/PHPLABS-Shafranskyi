<?php
$true_val = true;
$false_val = false;

$true_num = (int)$true_val;
$false_num = (int)$false_val;

$sum = $true_num + $true_num + $false_num;
$product = $true_num * 25;

echo "<h2>Робота з булевими значеннями:</h2>";
echo "<p>true у числовому вигляді: <strong>$true_num</strong></p>";
echo "<p>false у числовому вигляді: <strong>$false_num</strong></p>";
echo "<p>Тип змінної \$true_val: <strong>" . gettype($true_val) . "</strong></p>";
echo "<p>Тип змінної \$true_num після перетворення: <strong>" . gettype($true_num) . "</strong></p>";
echo "<p>Сума (true + true + false): <strong>$sum</strong></p>";
echo "<p>Добуток (true × 25): <strong>$product</strong></p>";
?>
