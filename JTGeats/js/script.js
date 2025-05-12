const carousel = document.querySelector(".carousellist");
const wrapper = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".carousel svg");
const firstCardWidth = carousel.querySelector(".carouselcard").offsetWidth;
let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;
const carousselChildrens = [...carousel.children];

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
carousselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
carousselChildrens.slice(0, -cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn.id);
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};
const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 1500);
};
autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.scrollLeft = carousel.offsetWidth;
  }
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.getElementsByClassName("custom_video");

  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    const controls = video.nextElementSibling; // Get the controls element
    // Function to update controls based on video state
    function updateControls() {
      if (video.paused) {
        controls.innerHTML = "▶"; // Change to play symbol
      } else {
        controls.innerHTML = "| |"; // Change to pause symbol
      }
    }
    // Click event for the video element
    video.addEventListener("click", function () {
      if (video.paused) {
        video.play(); // Play the video
      } else {
        video.pause(); // Pause the video
      }
      updateControls(); // Update controls based on the current state
    });
    // Click event for the controls element
    controls.addEventListener("click", function () {
      if (video.paused) {
        video.play(); // Play the video
      } else {
        video.pause(); // Pause the video
      }
      updateControls(); // Update controls based on the current state
    });
    // Event listener for when the video ends
    video.addEventListener("ended", function () {
      controls.innerHTML = "▶"; // Reset controls when video ends
    });
    // Update controls on video play/pause
    video.addEventListener("play", updateControls);
    video.addEventListener("pause", updateControls);
  }
});
