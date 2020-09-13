if ("geolocation" in navigator) {
  console.log("geo location available");
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    data = { lat, lon };
    renderDOM(lat, lon);
    initMap(lat, lon);
    postToServer(data);
  });
} else {
  console.log("geo location not available");
}

async function postToServer(data) {
  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json_response = await response.json();
  console.log(json_response);
}

function initMap(xs, ys) {
  const mymap = L.map("map").setView([xs, ys], 15);
  const marker = L.marker([xs, ys]).addTo(mymap);
  const attribution =
    '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  const url = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tiles = L.tileLayer(url, { attribution });
  tiles.addTo(mymap);
}

function renderDOM(lat, lon) {
  document.getElementById("lat").innerHTML = lat;
  document.getElementById("lon").innerHTML = lon;
}
