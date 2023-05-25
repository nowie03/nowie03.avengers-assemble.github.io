const infinityStonesAndThanosLocations = {
  infinityStones: [
    {
      name: "Avengers HQ",
      location: {
        lat: -33.89,
        lng: 151.274,
        city: "Sydney",
      },
      image: "images/avengers.png",
    },
    {
      name: "Time Stone",
      location: {
        lat: 51.5074,
        lng: -0.1278,
        city: "London",
      },
      image: "images/time-stone.png",
    },
    {
      name: "Space Stone",
      location: {
        lat: 40.7128,
        lng: -74.006,
        city: "New York City",
      },
      image: "images/space-stone.png",
    },
    {
      name: "Reality Stone",
      location: {
        lat: -33.8651,
        lng: 151.2099,
        city: "Sydney",
      },
      image: "images/reality-stone.png",
    },
    {
      name: "Mind Stone",
      location: {
        lat: -26.2041,
        lng: 28.0473,
        city: "Johannesburg",
      },
      image: "images/mind-stone.png",
    },
    {
      name: "Power Stone",
      location: {
        lat: 34.0522,
        lng: -118.2437,
        city: "Los Angeles",
      },
      image: "images/power-stone.png",
    },
    {
      name: "Soul Stone",
      location: {
        lat: -22.9068,
        lng: -43.1729,
        city: "Rio de Janeiro",
      },
      image: "images/soul-stone.png",
    },
  ],
  thanosLocation: {
    name: "Thanos",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      city: "San Francisco",
    },
    image: "images/thanos.png",
  },
};
const avengersData = {
  avengers: [
    {
      name: "Iron Man",
      location: {
        lat: 40.7128,
        lng: -74.006,
        city: "New York City",
      },
      image: "images/iron-man-removebg-preview.png",
    },
    {
      name: "Captain America",
      location: {
        lat: 34.0522,
        lng: -118.2437,
        city: "Los Angeles",
      },
      image: "images/captain-america-removebg-preview.png",
    },
    {
      name: "Thor",
      location: {
        lat: 51.5074,
        lng: -0.1278,
        city: "London",
      },
      image: "images/thor-icon-removebg-preview.png",
    },
    {
      name: "Black Widow",
      location: {
        lat: -33.80,
        lng: 151.274,
        city: "Sydney",
      },
      image: "images/black-widow-removebg-preview.png",
    },
    {
      name: "Hulk",
      location: {
        lat: -23.5505,
        lng: -46.6333,
        city: "São Paulo",
      },
      image: "images/hulk-icon-removebg-preview.png",
    },
  ],
};

function initMap() {
  const myLatLng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 1,
    center: myLatLng,
  });

  infinityStonesAndThanosLocations.infinityStones?.map((stone) => {
    new google.maps.Marker({
      position: stone.location,
      map,
      title: stone.name,
      icon: { url: stone.image, scaledSize: new google.maps.Size(40, 40) },
    });
  });

  const thanos=infinityStonesAndThanosLocations.thanosLocation;
  new google.maps.Marker({
    position: thanos.location,
    map,
    title: thanos.name,
    icon: { url: thanos.image, scaledSize: new google.maps.Size(40, 40) },
  });


avengersData.avengers.map(avenger=>{
  new google.maps.Marker({
    position: avenger.location,
    map,
    title: avenger.name,
    icon: { url: avenger.image, scaledSize: new google.maps.Size(40, 40) },
  });
})

}

window.initMap = initMap;
