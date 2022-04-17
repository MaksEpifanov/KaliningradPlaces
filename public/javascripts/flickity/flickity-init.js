const elem = document.querySelector(".main-carousel");
const flkty = new Flickity(elem, {
  // options
  cellAlign: "left",
  contain: true,
  autoPlay: true,
  // fullscreen: true,
  adaptiveHeight: true,
  wrapAround: true,
  bgLazyLoad: true,
});
