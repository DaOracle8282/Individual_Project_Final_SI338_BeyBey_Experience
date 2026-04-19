function hideMissingImages() {
  const songImages = document.querySelectorAll(".song-image");

  for (let i = 0; i < songImages.length; i++) {
    const imageSource = songImages[i].getAttribute("src");

    if (imageSource && imageSource.includes("no-photo-available")) {
      songImages[i].style.display = "none";
    }
  }
}

function updateVisibleSongs(event) {
  if (event) {
    event.preventDefault();
  }

  const filterSelect = document.querySelector("#album-filter");
  const songCards = document.querySelectorAll(".song-card");
  const selectedAlbum = filterSelect.value.toLowerCase();

  for (let i = 0; i < songCards.length; i++) {
    const card = songCards[i];
    const album = card.dataset.album.toLowerCase();

    if (selectedAlbum === "all" || album === selectedAlbum) {
      card.parentElement.style.display = "";
    } else {
      card.parentElement.style.display = "none";
    }
  }
}

function setupMeaningToggles() {
  const toggleButtons = document.querySelectorAll(".toggle-meaning");

  for (let i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener("click", function () {
      const meaningBox = this.parentElement.nextElementSibling;

      if (meaningBox.hidden) {
        meaningBox.hidden = false;
        this.textContent = "Hide meaning";
      } else {
        meaningBox.hidden = true;
        this.textContent = "Reveal meaning";
      }
    });
  }
}

function setupVideoToggles() {
  const videoButtons = document.querySelectorAll(".toggle-video");

  for (let i = 0; i < videoButtons.length; i++) {
    videoButtons[i].addEventListener("click", function () {
      const card = this.closest(".song-card");
      const videoBox = card.querySelector(".video-container");
      const videoUrl = card.dataset.video;

      if (videoBox.hidden) {
        if (videoBox.innerHTML.trim() === "") {
          const iframe = document.createElement("iframe");
          iframe.src = videoUrl;
          iframe.title = card.dataset.song + " music video";
          iframe.width = "560";
          iframe.height = "315";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
          iframe.allowFullscreen = true;
          iframe.referrerPolicy = "strict-origin-when-cross-origin";

          const wrapper = document.createElement("div");
          wrapper.className = "video-wrapper";
          wrapper.appendChild(iframe);

          videoBox.appendChild(wrapper);
        }

        videoBox.hidden = false;
        this.textContent = "Hide video";
      } else {
        videoBox.hidden = true;
        this.textContent = "Watch video";
      }
    });
  }
}

hideMissingImages();
setupMeaningToggles();
setupVideoToggles();

const filterForm = document.querySelector("#song-form");
if (filterForm) {
  filterForm.addEventListener("submit", updateVisibleSongs);
}