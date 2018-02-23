
var app = (function () {
    var style =
        [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#1d1d1d"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "weight": "10.00"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fcfcfc"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#788c40"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "geometry",
                "stylers": [
                    {
                        "invert_lightness": true
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#bebebe"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#aeaeae"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#777777"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "0.01"
                    },
                    {
                        "saturation": "-33"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "weight": "0.01"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#7088b0"
                    }
                ]
            }
        ]
    //pas de let car pas de transpileur
    var endpoint;
    var style;
    var marker;
    var map;
    var position;
    var trajet;
    var container = document.getElementById("map");




    return {
        initialize: function () {
            //Version mobile avec serveur phonegap: 
            //document.addEventListener('deviceready', this.render.bind(this), false);//quand le device est ready, j'active

            //Version desktop si on veux utiliser un localHoast:
            window.onload = function () { this.render() }.bind(this);
        },

        render: function () {
            // a la place de getCurrentPosition on peux utiliser watchPosition 
            // qui se met a jour en temps réél pour les téléphone (voir 2e render)
            navigator.geolocation.getCurrentPosition(
                (function (e) {
                    position = {
                        lat: e.coords.latitude,
                        lng: e.coords.longitude,
                    };
                    alert("localisation OK");
                    map.setCenter(position);
                    //appel de la fonction getMarker 
                    marker = this.getMarker(map, position, "./img/icon.png");
                }).bind(this),
                function (e) {
                    alert(e.code);
                }
            );
            //exécuté avant malgrés son positionnement en bas
            //on peux le positionné avant getCurrentPosition aussi
            map = this.getMap();
            this.getEndpoint();
        },

        // render: function () {
        //     navigator.geolocation.watchPosition(
        //         function (e) {
        //             alert(e.coords.latitude);
        //         },
        //         function e() {
        //             alert("error");
        //         },
        //         {
        //             //pour de la haute précision
        //             enableHighAccuracy: true,
        //         }

        //     )
        // },

        //recuperer un fichier de position en ligne
        getEndpoint: function () {

            var xhr = new XMLHttpRequest;
            xhr.open("GET", "http://universal-code-description.alwaysdata.net/plug.php");

            xhr.onload = (function () {
                if (200 == xhr.status) {
                    this.displayPlugMarker(window.JSON.parse(xhr.response).plug);
                }
            }).bind(this);
            xhr.onerror = () => {
                alert("erreur de connexion");
            };
            xhr.abord = () => {
                alert("coupure inattendue");
            };
            xhr.send();
        },

        displayPlugMarker: function (plug) {
            var plugMarkerEvent
            for (var i = 0; i < plug.length; i++) {
                plug[i].lat;
                plug[i].lng;
                myLatlng = new google.maps.LatLng(plug[i].lat, plug[i].lng)
                plugMarkerEvent = this.getMarker(map, myLatlng, "./img/icon.png")
                this.registerMarkerEvent(plugMarkerEvent);
            }
        },

        registerMarkerEvent: function (plugMarker) {
            plugMarker.addListener('click', this.getDirection);
        },

        getDirection: function () {

            //si un trajet est existant, alors on le nettoie
            if (trajet) {
                trajet.setMap(null);

            }

            var directionsService = new google.maps.DirectionsService();
            trajet = new google.maps.DirectionsRenderer();
            var request = {
                origin: position,
                destination: { lat: this.getPosition().lat(), lng: this.getPosition().lng() },
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    trajet.setDirections(response);
                    trajet.setMap(map);
                }

            });
        },

        getMarker: function (googleMap, latLng, imgScr) {
            return new google.maps.Marker({
                position: latLng,
                map: googleMap,
                title: 'hello map',
                icon: imgScr
            });

        },

        getMap: function () {
            //trouvé sur le site de google
            return new google.maps.Map(container, {
                center: { lat: 45.1667, lng: 4.8167 },
                zoom: 15,
                disableDefautUI: true,
                styles: style
            });
        }
    };
})();


