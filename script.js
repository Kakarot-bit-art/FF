// Psychology Department Timeline - JavaScript Implementation

// Timeline Data
const timelineData = [
  {
    "id": 1,
    "date": "2025-05-10",
    "title": "Annual Psychology Fest 2025",
    "description": "A grand celebration of psychology, featuring student presentations and guest speakers from renowned institutions.",
    "imageUrl": "Photos/image_1.png",
    "aspectRatio": "portrait"
  },
  {
    "id": 2,
    "date": "2025-03-15",
    "title": "Workshop on Cognitive Behavioral Therapy",
    "description": "Interactive session led by renowned therapist Dr. Elara Vance, focusing on practical CBT techniques.",
    "imageUrl": "./assets/images/workshop-session.jpg",
    "aspectRatio": "landscape"
  },
  {
    "id": 3,
    "date": "2024-11-20",
    "title": "Research Symposium: Mind & Brain",
    "description": "Students showcased their latest research in neuroscience and psychology, presenting groundbreaking findings.",
    "imageUrl": "https://via.placeholder.com/800x500/ffcc66/ffffff?text=Symposium+2024",
    "aspectRatio": "landscape"
  },
  {
    "id": 4,
    "date": "2024-09-05",
    "title": "PhD Graduation Ceremony",
    "description": "Celebrating our doctoral graduates as they embark on their professional psychology careers.",
    "imageUrl": "./assets/images/phd-ceremony.jpg",
    "aspectRatio": "landscape"
  },
  {
    "id": 5,
    "date": "2024-07-01",
    "title": "Summer Internship Program Begins",
    "description": "Students started their internships at various mental health organizations across the region.",
    "imageUrl": "https://via.placeholder.com/500x700/ff9999/ffffff?text=Internship+Start",
    "aspectRatio": "portrait"
  },
  {
    "id": 6,
    "date": "2024-04-22",
    "title": "Guest Lecture Series",
    "description": "Distinguished psychology professors from around the world shared their expertise with our students.",
    "imageUrl": "./assets/images/lecture-hall.jpg",
    "aspectRatio": "landscape"
  },
  {
    "id": 7,
    "date": "2024-01-15",
    "title": "New Year Academic Kickoff",
    "description": "Department-wide meeting to set goals and introduce new faculty members for the academic year.",
    "imageUrl": "https://via.placeholder.com/600x600/66b3ff/ffffff?text=New+Year+2024",
    "aspectRatio": "square"
  },
  {
    "id": 8,
    "date": "2023-10-30",
    "title": "Psychology Career Fair",
    "description": "Students connected with potential employers and learned about career opportunities in psychology.",
    "imageUrl": "Photos/image_2.png",
    "aspectRatio": "landscape"
  },
  {
    "id": 9,
    "date": "2023-08-20",
    "title": "Undergraduate Graduation",
    "description": "Proud moment as our undergraduate students received their psychology degrees.",
    "imageUrl": "./assets/images/graduation-ceremony.webp",
    "aspectRatio": "portrait"
  },
  {
    "id": 10,
    "date": "2023-01-25",
    "title": "Department Inauguration Ceremony",
    "description": "Official opening of the new Psychology Department building, marking a new chapter in our history.",
    "imageUrl": "./assets/images/department-building.jpg",
    "aspectRatio": "portrait"
  }
];

// Global Variables
let currentSlideIndex = 0;
let slideshowInterval;
let currentTrackIndex = 0;
let isPlaying = false;
let isMuted = false;

// Audio tracks
const audioTracks = [
  document.getElementById('backgroundAudio'),
  document.getElementById('track2'),
  document.getElementById('track3')
];

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const muteBtn = document.getElementById('muteBtn');
const timelineContainer = document.getElementById('timelineContainer');
const slideshowWrapper = document.getElementById('slideshowWrapper');
const slideshowIndicators = document.getElementById('slideshowIndicators');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeTimeline();
  initializeSlideshow();
  initializeMusicPlayer();
  initializeIntersectionObserver();
  
  // Add event listeners
  themeToggle.addEventListener('click', toggleTheme);
  playPauseBtn.addEventListener('click', togglePlayPause);
  prevBtn.addEventListener('click', previousTrack);
  nextBtn.addEventListener('click', nextTrack);
  muteBtn.addEventListener('click', toggleMute);
  
  // Auto-start music (with user interaction fallback)
  document.addEventListener('click', autoStartMusic, { once: true });
});

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Add smooth transition effect
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

// Timeline Generation
function initializeTimeline() {
  // Sort timeline data by date (most recent first)
  const sortedData = [...timelineData].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  timelineContainer.innerHTML = '';
  
  sortedData.forEach((item, index) => {
    const timelineItem = createTimelineItem(item, index);
    timelineContainer.appendChild(timelineItem);
  });
}

function createTimelineItem(item, index) {
  const timelineItem = document.createElement('div');
  timelineItem.className = 'timeline-item';
  timelineItem.style.animationDelay = `${index * 0.1}s`;
  
  const formattedDate = formatDate(item.date);
  
  timelineItem.innerHTML = `
    <div class="timeline-card">
      <div class="timeline-image-container ${item.aspectRatio}">
        <img src="${item.imageUrl}" alt="${item.title}" class="timeline-image" loading="lazy">
      </div>
      <div class="timeline-content">
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-date">${formattedDate}</p>
        <p class="timeline-description">${item.description}</p>
      </div>
    </div>
  `;
  
  return timelineItem;
}

// Slideshow Management
function initializeSlideshow() {
  createSlideshowIndicators();
  updateSlideshow();
  startSlideshowAutoplay();
}

function createSlideshowIndicators() {
  slideshowIndicators.innerHTML = '';
  
  timelineData.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
    indicator.addEventListener('click', () => goToSlide(index));
    slideshowIndicators.appendChild(indicator);
  });
}

function updateSlideshow() {
  const currentItem = timelineData[currentSlideIndex];
  const slideImage = document.getElementById('slideImage');
  const slideTitle = document.getElementById('slideTitle');
  const slideDate = document.getElementById('slideDate');
  const slideDescription = document.getElementById('slideDescription');
  
  // Update slide content
  slideImage.src = currentItem.imageUrl;
  slideImage.alt = currentItem.title;
  slideTitle.textContent = currentItem.title;
  slideDate.textContent = formatDate(currentItem.date);
  slideDescription.textContent = currentItem.description;
  
  // Update indicators
  document.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlideIndex);
  });
  
  // Apply dynamic aspect ratio to image container
  const imageContainer = document.querySelector('.slide-image-container');
  imageContainer.className = `slide-image-container ${currentItem.aspectRatio}`;
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateSlideshow();
  restartSlideshowAutoplay();
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % timelineData.length;
  updateSlideshow();
}

function startSlideshowAutoplay() {
  slideshowInterval = setInterval(() => {
    // Select random slide instead of sequential
    const randomIndex = Math.floor(Math.random() * timelineData.length);
    if (randomIndex !== currentSlideIndex) {
      currentSlideIndex = randomIndex;
    } else {
      // If same index, move to next
      currentSlideIndex = (currentSlideIndex + 1) % timelineData.length;
    }
    updateSlideshow();
  }, 6000); // 6 seconds interval
}

function restartSlideshowAutoplay() {
  clearInterval(slideshowInterval);
  startSlideshowAutoplay();
}

// Music Player Management
function initializeMusicPlayer() {
  // Set initial volume
  audioTracks.forEach(track => {
    track.volume = 0.3; // 30% volume
  });
  
  // Add event listeners for audio events
  audioTracks.forEach((track, index) => {
    track.addEventListener('ended', () => {
      nextTrack();
    });
    
    track.addEventListener('error', (e) => {
      console.warn(`Audio track ${index + 1} failed to load:`, e);
    });
  });
}

function autoStartMusic() {
  // Try to auto-start music after user interaction
  if (!isPlaying) {
    togglePlayPause();
  }
}

function togglePlayPause() {
  const currentTrack = audioTracks[currentTrackIndex];
  
  if (isPlaying) {
    currentTrack.pause();
    playPauseBtn.textContent = '▶️';
    isPlaying = false;
  } else {
    // Pause all other tracks
    audioTracks.forEach(track => track.pause());
    
    currentTrack.play().then(() => {
      playPauseBtn.textContent = '⏸️';
      isPlaying = true;
    }).catch(error => {
      console.warn('Audio playback failed:', error);
      // Fallback: show play button
      playPauseBtn.textContent = '▶️';
    });
  }
}

function previousTrack() {
  audioTracks[currentTrackIndex].pause();
  currentTrackIndex = (currentTrackIndex - 1 + audioTracks.length) % audioTracks.length;
  
  if (isPlaying) {
    const currentTrack = audioTracks[currentTrackIndex];
    currentTrack.currentTime = 0;
    currentTrack.play().catch(error => {
      console.warn('Audio playback failed:', error);
    });
  }
}

function nextTrack() {
  audioTracks[currentTrackIndex].pause();
  currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
  
  if (isPlaying) {
    const currentTrack = audioTracks[currentTrackIndex];
    currentTrack.currentTime = 0;
    currentTrack.play().catch(error => {
      console.warn('Audio playback failed:', error);
    });
  }
}

function toggleMute() {
  isMuted = !isMuted;
  
  audioTracks.forEach(track => {
    track.muted = isMuted;
  });
  
  muteBtn.textContent = isMuted ? '🔇' : '🔊';
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}

// Intersection Observer for Timeline Animations
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);
  
  // Observe timeline items
  setTimeout(() => {
    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
  }, 100);
}

// Image Loading Error Handling
function handleImageError(img) {
  img.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=Image+Not+Found';
  img.alt = 'Image not available';
}

// Add error handling to all images
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', () => handleImageError(img));
    });
  }, 500);
});

// Responsive Image Loading
function optimizeImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('loading');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
  switch(e.key) {
    case ' ':
      e.preventDefault();
      togglePlayPause();
      break;
    case 'ArrowLeft':
      previousTrack();
      break;
    case 'ArrowRight':
      nextTrack();
      break;
    case 'm':
    case 'M':
      toggleMute();
      break;
    case 't':
    case 'T':
      toggleTheme();
      break;
  }
});

// Performance Optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scrolling for timeline navigation
function scrollToTimeline() {
  document.querySelector('.timeline-section').scrollIntoView({
    behavior: 'smooth'
  });
}

// Export functions for potential external use
window.PsychologyTimeline = {
  goToSlide,
  toggleTheme,
  togglePlayPause,
  scrollToTimeline
};

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

