const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 106;
const currentFrame = (index) =>
  `https://gmedia.playstation.com/is/image/SIEPDC/ps5-hero-widescreen-image-sequence-${index
    .toString()
    .padStart(4, "0")}?wei=1920&hei=1080&qlt=70,1&resMode=bilin&fmt=jpg`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1920;
canvas.height = 1080;
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
