<?php
$startTime = microtime(true);

$product = 1;
for ($i = 1; $i <= 10; $i++) {
    $product *= $i;
}

$endTime = microtime(true);
$executionTime = $endTime - $startTime;

echo "<h2>Добуток чисел від 1 до 10:</h2>";
echo "<p>Результат: <strong>$product</strong></p>";
echo "<p>Час виконання: <strong>" . number_format($executionTime, 10) . "</strong> секунд</p>";
?>
