const lngInput = document.querySelector("#lng");
const latInput = document.querySelector("#lat");
mapboxgl.accessToken = mbToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [21.389228, 54.753974],
  zoom: 7,
});

map.on("load", () => {
  let marker;
  map.on("click", (e) => {
    let { lng, lat } = e.lngLat;
    lngInput.value = lng;
    latInput.value = lat;
    if (marker) {
      marker.remove();
    }
    marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  });
});
