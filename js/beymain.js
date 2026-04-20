// Hide any song image if its file source is a placeholder image.
// This keeps the page from showing broken or generic "no photo available" images.
function hideMissingImages() {
  // Select all album/song images on the page.
  const songImages = document.querySelectorAll(".song-image");

  // Loop through each image one at a time.
  for (let i = 0; i < songImages.length; i++) {
    // Get the value of the image's src attribute.
    const imageSource = songImages[i].getAttribute("src");

    // If the image source exists AND includes the placeholder file name,
    // hide that image from the page.
    if (imageSource && imageSource.includes("no-photo-available")) {
      songImages[i].style.display = "none";
    }
  }
}

// Show only the songs that match the selected album filter.
// This runs when the form is submitted.
function updateVisibleSongs(event) {
  // Prevent the form from refreshing/reloading the page.
  if (event) {
    event.preventDefault();
  }

  // Get the dropdown menu.
  const filterSelect = document.querySelector("#album-filter");

  // Get every song card on the page.
  const songCards = document.querySelectorAll(".song-card");

  // Read the selected album value and make it lowercase
  // so comparison is consistent.
  const selectedAlbum = filterSelect.value.toLowerCase();

  // Check each song card.
  for (let i = 0; i < songCards.length; i++) {
    const card = songCards[i];

    // Read the custom data-album value from the HTML.
    // Example: data-album="renaissance"
    const album = card.dataset.album.toLowerCase();

    // If "all" is selected OR the card's album matches the selected album,
    // keep that card visible.
    if (selectedAlbum === "all" || album === selectedAlbum) {
      // card.parentElement is the <li> holding the article.
      // Empty string resets display back to normal.
      card.parentElement.style.display = "";
    } else {
      // Otherwise hide that song card.
      card.parentElement.style.display = "none";
    }
  }
}

// Add click behavior for all "Reveal meaning" buttons.
function setupMeaningToggles() {
  // Select every meaning button on the page.
  const toggleButtons = document.querySelectorAll(".toggle-meaning");

  // Loop through each button and attach a click event.
  for (let i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener("click", function () {
      // Find the nearest parent song card for the button that was clicked.
      // closest() walks up the HTML tree until it finds a matching ancestor.
      const card = this.closest(".song-card");

      // Inside that card, find the matching hidden meaning box.
      const meaningBox = card.querySelector(".song-meaning");

      // The hidden property is a built-in HTML way to show/hide content.
      // hidden = true means the element is not displayed.
      if (meaningBox.hidden) {
        // Show the meaning text.
        meaningBox.hidden = false;

        // Update button text so the user knows clicking again will hide it.
        this.textContent = "Hide meaning";
      } else {
        // Hide the meaning text again.
        meaningBox.hidden = true;

        // Reset button text.
        this.textContent = "Reveal meaning";
      }
    });
  }
}

// Add click behavior for all "Watch video" buttons.
function setupVideoToggles() {
  // Select every video button on the page.
  const videoButtons = document.querySelectorAll(".toggle-video");

  // Loop through each button and attach a click event.
  for (let i = 0; i < videoButtons.length; i++) {
    videoButtons[i].addEventListener("click", function () {
      // Find the song card connected to the clicked button.
      const card = this.closest(".song-card");

      // Find the empty/hideable video container inside that card.
      const videoBox = card.querySelector(".video-container");

      // Read the custom video URL from the HTML data-video attribute.
      const videoUrl = card.dataset.video;

      // Read the custom song title from the HTML data-song attribute.
      // This is used for the iframe title, which helps accessibility.
      const songTitle = card.dataset.song;

      // If the video box is currently hidden, show it.
      if (videoBox.hidden) {
        // Only create the video if the box is empty.
        // This prevents duplicates from being added.
        if (videoBox.innerHTML.trim() === "") {
          // Create the iframe element for the YouTube embed.
          const iframe = document.createElement("iframe");

          // Set the YouTube video URL.
          iframe.src = videoUrl;

          // Give the iframe an accessible title.
          // Screen readers use this to describe the embedded content.
          iframe.title = songTitle + " music video";

          // loading = "lazy" means:
          // "Do not load this iframe immediately when the page loads."
          // Instead, the browser waits until it is needed/visible.
          // This helps page speed and performance.
          iframe.loading = "lazy";

          // allow lists which browser/media features the iframe is allowed to use.
          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"; //permissions the video player can use, based on YouTube's recommended settings

          // referrerPolicy controls how much referral information is sent
          // when loading the video from YouTube.
          iframe.referrerPolicy = "strict-origin-when-cross-origin";

          // Allow fullscreen mode for the embedded video.
          iframe.allowFullscreen = true;

          // Make the iframe fit inside its wrapper cleanly.
          iframe.style.border = "0";
          iframe.style.width = "100%";
          iframe.style.height = "100%";

          // Create a wrapper div that controls aspect ratio/responsive sizing.
          const wrapper = document.createElement("div");
          wrapper.className = "video-wrapper";

          // Put the iframe inside the wrapper.
          wrapper.appendChild(iframe);

          // Put the wrapper inside the hidden video container.
          videoBox.appendChild(wrapper);
        }

        // Reveal the video container.
        videoBox.hidden = false;

        // Update the button text.
        this.textContent = "Hide video";
      } else {
        // Hide the video container.
        videoBox.hidden = true;

        // Remove the iframe completely.
        // This stops the YouTube video from continuing to play in the background.
        videoBox.innerHTML = "";

        // Reset the button text.
        this.textContent = "Watch video";
      }
    });
  }
}

// Run these functions as soon as the script loads.
hideMissingImages();
setupMeaningToggles();
setupVideoToggles();

// Find the filter form on the page.
const filterForm = document.querySelector("#song-form");

// Only attach the submit event if the form exists.
if (filterForm) {
  filterForm.addEventListener("submit", updateVisibleSongs);
}