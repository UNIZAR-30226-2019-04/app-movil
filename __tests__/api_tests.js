import React from 'react';
import mockAxios from "axios";
import UploadProduct from "../components/UploadProduct"
import renderer from 'react-test-renderer';

let GoogleLocationCall =  {
    "results": [
        {
            "address_components": [
                {
                    "long_name": "Zaragoza",
                    "short_name": "Zaragoza",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "Zaragoza",
                    "short_name": "Z",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "Aragon",
                    "short_name": "Aragon",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "Spain",
                    "short_name": "ES",
                    "types": [
                        "country",
                        "political"
                    ]
                }
            ],
            "formatted_address": "Zaragoza, Spain",
            "geometry": {
                "bounds": {
                    "northeast": {
                        "lat": 41.6894079,
                        "lng": -0.8427317
                    },
                    "southwest": {
                        "lat": 41.6139746,
                        "lng": -0.9472301000000001
                    }
                },
                "location": {
                    "lat": 41.6488226,
                    "lng": -0.8890853
                },
                "location_type": "APPROXIMATE",
                "viewport": {
                    "northeast": {
                        "lat": 41.6894079,
                        "lng": -0.8427317
                    },
                    "southwest": {
                        "lat": 41.6139746,
                        "lng": -0.9472301000000001
                    }
                }
            },
            "place_id": "ChIJkY5hXt0UWQ0RqImEFfET30k",
            "types": [
                "locality",
                "political"
            ]
        }
    ],
    "status": "OK"
};

it("calls axios in getCoordinatesFromAddress", async () => {
    // Setup
    const uProduct = renderer.create(<UploadProduct />).getInstance();
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: { results: GoogleLocationCall }
        })
    );

    // Work
    const coords = await uProduct.getCoordinatesFromAddress("Zaragoza");

    // Test
    console.warn(uProduct.state.latitud);
    console.warn(41.6488226);
    //expect(uProduct.state.latitud).toEqual("");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });