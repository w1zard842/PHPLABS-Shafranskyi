<?php
$alpha = 30;
$r = 7;

$alpha_rad = deg2rad($alpha);
$S = ($alpha_rad * pow($r, 2)) / 2;

echo "<h2>Площа сектора круга:</h2>";
echo "<p>Кут α = {$alpha}°</p>";
echo "<p>Радіус r = $r</p>";
echo "<p>Площа S = α·r²/2 = <strong>" . round($S, 4) . "</strong></p>";
?>
