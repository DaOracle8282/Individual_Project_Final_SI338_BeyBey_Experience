function hideMissingImages() {
  const songImages = document.querySelectorAll(".song-image");

  for (let i = 0; i < songImages.length; i++) {
    const imageSource = songImages[i].getAttribute("src");

    if (imageSource && imageSource.includes("no-photo-available")) {
      songImages[i].style.display = "none";
    }
  }
}

function updateFilterButton() {
  const filterSelect = document.querySelector("#album-filter");
  const filterButton = document.querySelector("#filter-button");

  if (!filterSelect || !filterButton) {
    return;
  }

  if (filterSelect.value.toLowerCase() === "all") {
    filterButton.textContent = "Apply Filter";
  } else {
    filterButton.textContent = "Remove Filter";
  }
}

function updateVisibleSongs(event) {
  if (event) {
    event.preventDefault();
  }

  const filterSelect = document.querySelector("#album-filter");
  const songCards = document.querySelectorAll(".song-card");

  const selectedAlbum = filterSelect.value.toLowerCase();

  if (selectedAlbum === "all") {
    for (let i = 0; i < songCards.length; i++) {
      songCards[i].parentElement.style.display = "";
    }
    updateFilterButton();
    return;
  }

  for (let i = 0; i < songCards.length; i++) {
    const card = songCards[i];
    const album = card.dataset.album.toLowerCase();

    if (album === selectedAlbum) {
      card.parentElement.style.display = "";
    } else {
      card.parentElement.style.display = "none";
    }
  }

  updateFilterButton();
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

function setupFilterReset() {
  const filterButton = document.querySelector("#filter-button");
  const filterSelect = document.querySelector("#album-filter");

  if (!filterButton || !filterSelect) {
    return;
  }

  filterButton.addEventListener("click", function (event) {
    if (filterSelect.value.toLowerCase() !== "all") {
      event.preventDefault();
      filterSelect.value = "all";
      updateVisibleSongs();
    }
  });

  filterSelect.addEventListener("change", updateFilterButton);
}

hideMissingImages();
setupMeaningToggles();
setupFilterReset();
updateFilterButton();

const filterForm = document.querySelector("#song-form");
if (filterForm) {
  filterForm.addEventListener("submit", updateVisibleSongs);
}