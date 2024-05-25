<?php

namespace App\Controller;

use App\Entity\Geolocation;
use App\Services\GeoCoderAPIService;
use App\Services\WeatherAPIService;
use mysql_xdevapi\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', methods: ['GET'])]
    public function Home(){
        return new Response($this->render("LocationsPage.twig"));
    }

    #[Route('searchGeolocation', methods: ['GET'])]
    public function searchGeolocationByName(Request $request){

        $location = $request->query->get("name");
        $api_key = $this->getParameter('geocode.api.key');
        $geocoderAPI = new GeoCoderAPIService();

        return new JsonResponse($geocoderAPI->sendRequest($location, $api_key));
    }

    #[Route('getWeather', methods: ['GET'])]
    public function getWeatherByGeolocation(Request $request){

        $location = $request->query->get("location");
        $api_key = $this->getParameter('yandex.api.key');
        $weatherAPI = new WeatherAPIService();

        return new JsonResponse($weatherAPI->sendRequest($location, $api_key));

    }

}