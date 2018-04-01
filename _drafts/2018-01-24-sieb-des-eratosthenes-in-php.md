---
title: Sieb des Eratosthenes in PHP (Primzahlen)
published: false
category: Snippets
languages:
  - de
---

```php
<?php
function sieveOfEratosthenes($n) {
    $primes = array_fill(2, $n - 1, true);

    for ($i = 2; $i < sqrt($n); $i++) {
        if ($primes[$i]) {
            for ($j = $i * $i; $j <= $n; $j += $i) {
                $primes[$j] = false;
            }
        }
    }

    return array_keys(array_filter($primes));
}
```
