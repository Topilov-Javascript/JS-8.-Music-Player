const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')

const music = document.querySelector('audio')
const progressInnerContainer = document.getElementById('progress-inner-container')
const progress = document.getElementById('progress')

const currentTimeElement = document.getElementById('current-time')
const durationElement = document.getElementById('duration')

const prevBtn = document.getElementById('previous')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Music
const songs = [
  {
    name: 'music-1',
    displayName: 'Mozart music',
    artist: 'Mozart'
  },
  {
    name: 'music-2',
    displayName: 'Bethoven music',
    artist: 'Bethoven'
  },
  {
    name: 'music-3',
    displayName: 'Piano relaxing music',
    artist: 'Unknown'
  }
]

// Check if Playing
let isPlaying = false

// Play
function playSong () {
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'Pause')
  music.play()
}

// Pause
function pauseSong (e) {
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
  music.pause()
}

// ____-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-____

// Play or Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// Update DOM
function loadSong (song) {
  title.textContent = song.displayName
  artist.textContent = song.artist
  music.src = `./music/${song.name}.mp3`
  image.src = `./images/${song.name}.jpg`
  document.getElementById('current-time').textContent = '0:00'
}

// Current Song
let songIndex = 0

// Previous Song
function prevSong () {
  if (songIndex === 0) {
    songIndex = songs.length - 1
  } else {
    songIndex--
  }
  loadSong(songs[songIndex])
  if (isPlaying) {
    playSong()
  }
  progress.style.width = `0%`
}

// Next Song
function nextSong () {
  if (songIndex === songs.length - 1) {
    songIndex = 0
  } else {
    songIndex++
  }
  loadSong(songs[songIndex])
  if (isPlaying) {
    playSong()
  }
  progress.style.width = `0%`
}

// On Load
loadSong(songs[songIndex])

// Update Progress Bar & Time
function updateProgressBar (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement
    // Update Progress Bar Width
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    // Calculate display for duration
    let durationMinutes = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`
    }
    // Delay switching durationElement to avoid NaN
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`
    }
    // Calculate display for currentTime
    let currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`
    }
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`
    /* // To Next Music
    if (currentTime === duration) {
      nextSong()
    } */
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
  if (!isPlaying) {
    // Update Progress Bar Width
    const progressPercent = (music.currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    // Calculate display for currentTime
    let currentMinutes = Math.floor(music.currentTime / 60)
    let currentSeconds = Math.floor(music.currentTime % 60)
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`
    }
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`
  }
}

// ---------Event Listeners---------

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener("ended", nextSong)
music.addEventListener('timeupdate', updateProgressBar)
document.addEventListener('DOMContentLoaded', function () {
  progressInnerContainer.addEventListener("click", setProgressBar)
})

// Get Duration Time of Current Music
music.addEventListener('loadedmetadata', function (e) {
  const duration = e.srcElement.duration
  let durationMinutes = Math.floor(duration / 60)
  let durationSeconds = Math.floor(duration % 60)
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`
  }

  durationElement.textContent = `${durationMinutes}:${durationSeconds}`
})
