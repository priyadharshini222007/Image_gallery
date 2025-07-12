// script.js
const allImages = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const filterButtons = document.querySelectorAll('.filter-btn');

let visibleImages = Array.from(allImages);
let currentIndex = 0;

// Initial click binding
visibleImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage();
  });
});

function showImage() {
  lightbox.style.display = 'flex';
  lightboxImg.src = visibleImages[currentIndex].src;
  document.getElementById("image-caption").innerText = visibleImages[currentIndex].alt;
  document.getElementById("downloadBtn").href = visibleImages[currentIndex].src;
}

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  showImage();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  showImage();
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    visibleImages = [];

    // Remove active from all, add to current
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    allImages.forEach(img => {
      const category = img.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        img.style.display = 'block';
        visibleImages.push(img);
      } else {
        img.style.display = 'none';
      }
    });

    visibleImages.forEach((img, index) => {
      img.onclick = () => {
        currentIndex = index;
        showImage();
      };
    });
  });
});

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % visibleImages.length;
      showImage();
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
      showImage();
    } else if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    }
  }
});

// Dark mode toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

let slideshow;
let slideshowRunning = false;

function startSlideshow() {
  if (!slideshowRunning) {
    slideshow = setInterval(() => {
      currentIndex = (currentIndex + 1) % visibleImages.length;
      showImage();
    }, 3000);
    slideshowRunning = true;
  }
}

function stopSlideshow() {
  clearInterval(slideshow);
  slideshowRunning = false;
}