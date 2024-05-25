<?php

namespace App\Services;

use http\Client\Request;
use mysql_xdevapi\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;

class GeoCoderAPIService
{
    function sendRequest($address, $api_key) {

        $url = "https://geocode-maps.yandex.ru/1.x/" . '?' . 'apikey=' . $api_key . '&geocode=' . urlencode($address) . '&format=json';;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $res = curl_exec($ch);
        curl_close($ch);

        $res = json_decode($res);
        $locations = $res->response->GeoObjectCollection->featureMember;

        return $locations;
    }

}