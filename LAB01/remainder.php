<?php
$dividend = 35;
$divisor = 4;
$remainder = $dividend % $divisor;

echo "<h2>Залишок від ділення:</h2>";
echo "<p>$dividend ÷ $divisor = " . intdiv($dividend, $divisor) . " (ціла частина)</p>";
echo "<p>Залишок: <strong>$remainder</strong></p>";
?>
