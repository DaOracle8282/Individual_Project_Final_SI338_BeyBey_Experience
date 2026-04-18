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

    const matchesFilter =
      selectedAlbum === "all" || album === selectedAlbum;

    if (matchesFilter) {
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

hideMissingImages();
setupMeaningToggles();

const filterForm = document.querySelector("#song-form");
if (filterForm) {
  filterForm.addEventListener("submit", updateVisibleSongs);
}