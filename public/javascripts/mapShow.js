mapboxgl.accessToken = mbToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: place.geometry.coordinates,
  zoom: 10,
});
const marker = new mapboxgl.Marker()
  .setLngLat(place.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${place.title}</h3><p>${place.location}</p>`
    )
  )
  .addTo(map);
