(function () {

    'use strict';

    angular.module('orchard.client-service', [])
    .factory('ClientService', ClientService);

    ClientService.$inject = [];

    function ClientService() {
        var clientService = {
            getClients: getClients
        };

        return clientService;

        function getClients() {
            return [{
                "id": 1,
                "title": "AMC",
                "nodes": []
            },
            {
                "id": 2,
                "title": "Belersdorf",
                "nodes": []
            },
            {
                "id": 3,
                "title": "DST",
                "nodes": []
            },
            {
                "id": 4,
                "title": "Eletrolux",
                "nodes": []
            },
            {
                "id": 5,
                "title": "Fox",
                "nodes": []
            },
            {
                "id": 6,
                "title": "Galderma",
                "nodes": []
            },
            {
                "id": 7,
                "title": "Investa",
                "nodes": []
            },
            {
                "id": 8,
                "title": "MCN",
                "nodes": []
            },
            {
                "id": 9,
                "title": "Merisant",
                "nodes": [
                    {
                        "id": 91,
                        "title": "Equal - APAC",
                        "nodes": [
                            {
                                "id": 911,
                                "title": "Design",
                                "nodes": []
                            },
                            {
                                "id": 912,
                                "title": "Stage",
                                "nodes": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 10,
                "title": "Orchard",
                "nodes": []
            },
            {
                "id": 11,
                "title": "Pfizer",
                "nodes": []
            },
            {
                "id": 12,
                "title": "Variety",
                "nodes": []
            },
            {
                "id": 13,
                "title": "Video Ezy",
                "nodes": []
            }];
        }
    }

}());