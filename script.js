console.log("Welcome to Auracle");

// Initialize the variables 
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songInfo = document.querySelector('.songinfo'); // Song name display
let songGif = document.querySelector('.songinfo img'); // GIF display
let songCover = document.getElementById('songCover'); // Song cover display

let songs = [
    { songName: "Perfect - Ed Sheeran", filePath: "1.mp3", coverPath: "c1.jpeg" },
    { songName: "Stitches - Shawn Mendes", filePath: "2.mp3", coverPath: "c2.jpeg" },
    { songName: "Yellow - ColdPlay", filePath: "3.mp3", coverPath: "c3.jpeg" },
    { songName: "Adore - Amrinder Gill", filePath: "4.mp3", coverPath: "c4.jpeg" },
    { songName: "One Love - Shubh", filePath: "5.mp3", coverPath: "c5.jpeg" },
];

// Load the first song initially
audioElement.src = songs[songIndex].filePath;
songInfo.textContent = songs[songIndex].songName;
songCover.src = songs[songIndex].coverPath;

// Function to update all UI elements for play state
const updatePlayUI = (isPlaying) => {
    // Update master play button
    if (isPlaying) {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        songGif.style.opacity = 1;
    } else {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        songGif.style.opacity = 0;
    }

    // Update individual song play buttons
    const songButtons = document.getElementsByClassName('songItemPlay');
    Array.from(songButtons).forEach((element, index) => {
        if (index === songIndex) {
            element.classList.remove(isPlaying ? 'fa-play-circle' : 'fa-pause-circle');
            element.classList.add(isPlaying ? 'fa-pause-circle' : 'fa-play-circle');
        } else {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
    });
};

// Function to play the selected song
const playSong = (index) => {
    songIndex = index;

    // Update audio source and song details
    audioElement.src = songs[songIndex].filePath;
    songInfo.textContent = songs[songIndex].songName;

    // Update the cover image
    songCover.src = songs[songIndex].coverPath;

    // Reset and play the audio
    audioElement.currentTime = 0;
    audioElement.play();

    // Update UI for play state
    updatePlayUI(true);
};

// Handle master play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updatePlayUI(true);
    } else {
        audioElement.pause();
        updatePlayUI(false);
    }
});

// Handle next and previous buttons
document.querySelector('.fa-forward').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

document.querySelector('.fa-backward').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Change song position when progress bar is changed
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Handle individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', () => {
        if (index === songIndex) {
            // Toggle play/pause if clicking the same song
            if (audioElement.paused) {
                audioElement.play();
                updatePlayUI(true);
            } else {
                audioElement.pause();
                updatePlayUI(false);
            }
        } else {
            // Play the selected song
            playSong(index);
        }
    });
});

// Update song info display when song ends
audioElement.addEventListener('ended', () => {
    updatePlayUI(false);
});
