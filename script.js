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
        lat: 45.5074,
        lng: -0.1278,
        city: "London",
      },
      image: "images/time-stone.png",
    },
    {
      name: "Space Stone",
      location: {
        lat: 55.7128,
        lng: -74.006,
        city: "New York City",
      },
      image: "images/space-stone.png",
    },
    {
      name: "Reality Stone",
      location: {
        lat: -20.8651,
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
        lat: 30.0522,
        lng: -118.2437,
        city: "Los Angeles",
      },
      image: "images/power-stone.png",
    },
    {
      name: "Soul Stone",
      location: {
        lat: -18.9068,
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
      lng: -210.4194,
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
        lat: -33.8,
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

const stoneMarkers = [];
const avengerMarkers=[]

function changeMarkerPosition(map,marker,{location}) {
   var latlng = new google.maps.LatLng(location.lat,location.lng);
  console.log(location)
  console.log(latlng.lat()+" "+latlng.lng())
  marker.setPosition(latlng);
  map.setCenter(latlng)
}

function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
}

const thanos = infinityStonesAndThanosLocations.thanosLocation;
const hq={location: {
  lat: -33.89,
  lng: 151.274,}}



function initMap() {
  const myLatLng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 1,
    center: myLatLng,
  });

  addEventListener(map)

  let thanosMarker = new google.maps.Marker({
    position: thanos.location,
    map,
    draggable: true,
    title: thanos.name,
    icon: { url: thanos.image, scaledSize: new google.maps.Size(40, 40) },
  });

  google.maps.event.addListener(thanosMarker,'click',(event)=>{
    const infowindow = new google.maps.InfoWindow({
      content:
        "<p>Thanos is at : " +
       thanos.location.lat +" "+thanos.location.lng+
        "</p>",
    });

    infowindow.open(map, thanosMarker);
  })

  google.maps.event.addListener(thanosMarker, "drag", (event) => {
    thanos.location.lat = event.latLng.lat();
    thanos.location.lng = event.latLng.lng();

    thanosMarker.setPosition(thanos.location)

    console.log(thanos)
    checkCollision(thanosMarker, stoneMarkers);
  });

  infinityStonesAndThanosLocations.infinityStones?.map((stone) => {
    let marker = new google.maps.Marker({
      position: stone.location,
      map,
      title: stone.name,
      icon: { url: stone.image, scaledSize: new google.maps.Size(40, 40) },
    });

    google.maps.event.addListener(marker, "click", () => {
      const infowindow = new google.maps.InfoWindow({
        content:
          "<p>Thanos is: " +
          Math.round(haversine_distance(marker, thanosMarker)) +
          " kms away from" +
          stone.name +
          "</p>",
      });

      infowindow.open(map, marker);
    });

    stoneMarkers.push(marker);
  });

  avengersData.avengers.map((avenger) => {
    let marker = new google.maps.Marker({
      position: avenger.location,
      map,
      title: avenger.name,
      icon: { url: avenger.image, scaledSize: new google.maps.Size(40, 40) },
    });

    google.maps.event.addListener(marker, "click", () => {
      const infowindow = new google.maps.InfoWindow({
        content:
          "<p>Thanos is: " +
          Math.round(haversine_distance(marker, thanosMarker)) +
          " kms away from me ,"  +"\n i am at "+marker.position.lat()+" "+marker.position.lng()+
          "</p>",
      });
      infowindow.open(map, marker);
    });
    avengerMarkers.push(marker);
  });
}

window.initMap = initMap;

function addEventListener(map){
  let fightThanosBtns=document.querySelectorAll('.fight-thanos');
  let returnHqBtns=document.querySelectorAll('.return-hq');

fightThanosBtns.forEach(btn=>btn.addEventListener('click',(event)=>{
  const marker=avengerMarkers.find(marker=>marker.title===event.target.value);
   changeMarkerPosition(map,marker,thanos)
   document.getElementById("map").scrollIntoView()
}))

returnHqBtns.forEach(btn=>btn.addEventListener('click',(event)=>{
  const marker=avengerMarkers.find(marker=>marker.title===event.target.value);
   changeMarkerPosition(map,marker,hq)
   document.getElementById("map").scrollIntoView()
   
}))

}
function updateCard(stoneName) {
  document.getElementById(stoneName)?.remove();
  const container = document.querySelector(".info");
  // console.log(container.children.length)
  if (document.querySelector(".info").children.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `<div class="thanos-card">
  <div class="h5">I have them all</div>
  <img  src="images/icons8-infinity-gauntlet-100.png" alt="" srcset="">
</div>`;

    container.appendChild(div);
  }
}

function checkCollision(thanosMarker, stoneMarkers) {
  for (let i = 0; i < stoneMarkers.length; i++) {
    let stone = stoneMarkers[i];
    let dist = haversine_distance(thanosMarker, stone);
    if (dist < 1000) {
      // console.log(stone);
      stone.setMap(null);
      updateCard(stone.title);
    }
  }
}


