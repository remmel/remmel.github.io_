<?php




/**
 * 0 €    9 700 €    0%    9 700 €
 * 9 700 €    26 791 €    14%    17 091 €
 * 26 791 €    71 826 €    30%    45 035 €
 * 71 826 €    152 108 €    41%    28 174 €
 * 152 108 €        45%    0 €
 */

$revenu = $_GET['n'];
$type = $_GET['type'];
$debug = isset($_GET['debug']) && $_GET['debug'] == "true";
$totalTax = 0;
$prevTranche = 0;

$tranchesByType = [
    'FRIR2018' => [
        9700 => 0,
        26791 => 0.14,
        71826 => 0.3,
        152108 => 0.41,
        9999999 => 0.45
    ],
    'FRIS2017' => [
        38120 => 0.15,
        9999999 => 0.3333
    ],
    'FRIS2018' => [
        38120 => 0.15,
        500000 => 0.28,
        9999999 => 0.3333
    ],
    'FRIS2019' => [
        38120 => 0.15,
        500000 => 0.28,
        9999999 => 0.31
    ],
    'FRIS2020' => [
        38120 => 0.15,
        9999999 => 0.28
    ],
    'FRIS2021' => [
        38120 => 0.15,
        9999999 => 0.265
    ],
    'FRIS2022' => [
        38120 => 0.15,
        9999999 => 0.25
    ],
    'ESDI2019' => [
        6000 => 0.19,
        50000 => 0.21,
        9999999 => 0.23
    ],
    'ESIR2019' => [
        9000 => 0,
        17360 => 0.24,
        32360 => 0.28,
        52360 => 0.37,
        9999999 => 0.43
    ],
    'ESIRMAD2019' => [
        12450 => 0.19,
        17707 => 0.232,
        20200 => 0.253,
        33007 => 0.283,
        35200 => 0.329,
        53407 => 0.364,
        60000 => 0.395,
        9999999 => 0.435
    ]
];

$tranches = $tranchesByType[$type];

if($debug) {
    echo "<table border=1><tbody><td>From</td><td>To</td><td>%</td><td>Total</td></tbody>";
}

foreach ($tranches as $tranche => $percentage) {
    $taxAmount = $revenu > $tranche ? $tranche - $prevTranche : $revenu - $prevTranche;
    if ($taxAmount < 0) $taxAmount = 0;

    $tax = $taxAmount * $percentage;
    $totalTax += $tax;

    if ($debug) {
        echo "<tr><td>$prevTranche</td><td>$tranche</td><td>$percentage</td><td>$tax</td></td>\n";
    }
    $prevTranche = $tranche;
}

if ($debug) echo "<tr><td></td><td></td><td></td><td>$totalTax</td></td></table>\n";
else echo round($totalTax);
