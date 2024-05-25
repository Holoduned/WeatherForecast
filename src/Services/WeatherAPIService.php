<?php

namespace App\Services;

use mysql_xdevapi\Exception;

class WeatherAPIService
{
    function sendRequest($location, $api_key) {

        $coordinates = explode(" ", $location);
        $url = "https://api.weather.yandex.ru/v2/forecast?lat=" . "$coordinates[1]" . "&lon=" . "$coordinates[0]";
        $headers = [
            'Content-Type: application/json',
            "X-Yandex-API-Key: $api_key",
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $res = curl_exec($ch);
        curl_close($ch);

        $res = json_decode($res);

        return $res;
    }
}