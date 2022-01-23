var sanFrancisco = {
    name: "San Francisco",
    latLong: { lat: 37.76, lng: -122.45 },
    temp: "40",
    distance: "",
    imageSrc: "images/sanfrancisco.jpeg",
    imageAlt: "San Francisco, California"
};

let saltLakeCity = {
    name: "Salt Lake City",
    latLong: { lat: 40.77, lng: -111.92 },
    temp: "20",
    distance: "",
    imageSrc: "images/saltlakecity.jpeg",
    imageAlt: "Salt Lake City, Utah"
}

let sanAntonio = {
    name: "San Antonio",
    latLong: { lat: 29.46, lng: -98.57 },
    temp: "60",
    distance: "",
    imageSrc: "images/sanantonio.jpeg",
    imageAlt: "San Antonio, Texas"
}

let newYork = {
    name: "New York City",
    latLong: { lat: 40.76, lng: -74.00 },
    temp: "62",
    distance: "",
    imageSrc: "images/newyork.jpeg",
    imageAlt: "New York, New York"
}

let miami = {
    name: "Miami",
    latLong: { lat: 25.77, lng: -80.26 },
    temp: "80",
    distance: "",
    imageSrc: "images/miami.jpeg",
    imageAlt: "Miami, Florida"
}

let lasVegas = {
    name: "Las Vegas",
    latLong: { lat: 36.14, lng: -115.20 },
    temp: "100",
    distance: "",
    imageSrc: "images/lasvegas.jpeg",
    imageAlt: "Las Vegas, Nevada"
}

var sixCities = [sanFrancisco, saltLakeCity, sanAntonio, newYork, miami, lasVegas]

var startLocation = {
    latLong: { lat: "", lng: "" },
}
var desiredTemp = "";
var desiredDate = {
    dateAsString: "",
    dateWithHour: "",
    dateAsNumber: "",
};
var cityIndexByDistanceArray = [];
var cityIndexByTemperatureArray = [];

