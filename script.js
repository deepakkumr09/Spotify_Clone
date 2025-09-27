console.log("Spotify Clone Loading...");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentSongCover = document.getElementById('currentSongCover');
let volumeBar = document.getElementById('volumeBar');
let volumeIcon = document.getElementById('volumeIcon');
let songItemContainer = document.getElementsByClassName('songItemContainer')[0];

// Songs array - Replace with your actual song files and covers
let songs = [
    {songName: "Kabira - Yeh Jawaani Hai Deewani", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Tum Hi Ho - Aashiqui 2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Channa Mereya - Ae Dil Hai Mushkil", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Agar Tum Saath Ho - Tamasha", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Kal Ho Naa Ho - Title Track", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Kun Faya Kun - Rockstar", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Galliyan - Ek Villain", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Kesariya - Brahmāstra", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tera Yaar Hoon Main - Sonu Ke Titu Ki Sweety", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Shayad - Love Aaj Kal (2020)", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Muskurane - CityLights", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Hawayein - Jab Harry Met Sejal", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "Janam Janam - Dilwale", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "Ae Dil Hai Mushkil - Title Track", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Raabta (Title Song) - Raabta", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    {songName: "Phir Le Aya Dil - Barfi!", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"},
    {songName: "Khamoshiyan - Khamoshiyan", filePath: "songs/17.mp3", coverPath: "covers/17.jpg"},
    {songName: "Sun Saathiya - ABCD 2", filePath: "songs/18.mp3", coverPath: "covers/18.jpg"},
    {songName: "Jeene Laga Hoon - Ramaiya Vastavaiya", filePath: "songs/19.mp3", coverPath: "covers/19.jpg"},
    {songName: "Tera Ban Jaunga - Kabir Singh", filePath: "songs/20.mp3", coverPath: "covers/20.jpg"},
    {songName: "So High - Sidhu Moose Wala", filePath: "songs/21.mp3", coverPath: "covers/21.jpg"},
    {songName: "Dollar - Sidhu Moose Wala", filePath: "songs/22.mp3", coverPath: "covers/22.jpg"},
    {songName: "SYL - Sidhu Moose Wala", filePath: "songs/23.mp3", coverPath: "covers/23.jpg"}
];

// Create song items dynamically
function createSongItems() {
    songItemContainer.innerHTML = '';
    
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('songItem');
        songItem.innerHTML = `
            <img src="${song.coverPath}" alt="${song.songName}" onerror="this.src='https://via.placeholder.com/50x50/1db954/ffffff?text=♪'">
            <span class="songName">${song.songName}</span>
            <span class="songlistplay">
                <span class="timestamp">
                    ${getRandomTime()}
                    <i id="${index}" class="far songItemPlay fa-play-circle"></i>
                </span>
            </span>
        `;
        
        // Add click event to the entire song item
        songItem.addEventListener('click', () => {
            playSong(index);
        });
        
        songItemContainer.appendChild(songItem);
    });
}

// Generate random time for display
function getRandomTime() {
    const minutes = Math.floor(Math.random() * 3) + 3; // 3-5 minutes
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize the player
function initializePlayer() {
    createSongItems();
    audioElement.volume = 0.8;
    
    // Set first song as default
    if (songs.length > 0) {
        masterSongName.innerText = songs[0].songName;
        audioElement.src = songs[0].filePath;
        currentSongCover.src = songs[0].coverPath;
        currentSongCover.onerror = function() {
            this.src = 'https://via.placeholder.com/42x42/1db954/ffffff?text=♪';
        };
    }
}

// Play/Pause functionality
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playCurrentSong();
    } else {
        pauseCurrentSong();
    }
});

function playCurrentSong() {
    audioElement.play()
        .then(() => {
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            updateActiveState();
        })
        .catch(error => {
            console.log("Playback error:", error);
            // If there's an error playing the file, you might want to show a message
            alert("Could not play this song. Please check if the audio file exists.");
        });
}

function pauseCurrentSong() {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}

// Play specific song
function playSong(index) {
    if (index < 0 || index >= songs.length) return;
    
    songIndex = index;
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    
    // Update bottom player cover image
    currentSongCover.src = songs[index].coverPath;
    currentSongCover.onerror = function() {
        this.src = 'https://via.placeholder.com/42x42/1db954/ffffff?text=♪';
    };
    
    audioElement.currentTime = 0;
    
    playCurrentSong();
}

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Progress bar change event
myProgressBar.addEventListener('change', () => {
    if (audioElement.duration) {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    }
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
    playSong(songIndex);
});

// Auto play next song when current ends
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Volume control
volumeBar.addEventListener('input', () => {
    const volume = volumeBar.value / 100;
    audioElement.volume = volume;
    
    // Update volume icon
    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
});

// Volume icon click to mute/unmute
volumeIcon.addEventListener('click', () => {
    if (audioElement.volume === 0) {
        audioElement.volume = 0.8;
        volumeBar.value = 80;
        volumeIcon.className = 'fas fa-volume-up';
    } else {
        audioElement.volume = 0;
        volumeBar.value = 0;
        volumeIcon.className = 'fas fa-volume-mute';
    }
});

// Update active state of song items
function updateActiveState() {
    // Remove active class from all items
    const allSongItems = document.querySelectorAll('.songItem');
    allSongItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current song
    if (allSongItems[songIndex]) {
        allSongItems[songIndex].classList.add('active');
    }
    
    // Update play icons
    const allPlayIcons = document.querySelectorAll('.songItemPlay');
    allPlayIcons.forEach((icon, index) => {
        if (index === songIndex && !audioElement.paused) {
            icon.classList.remove('fa-play-circle');
            icon.classList.add('fa-pause-circle');
        } else {
            icon.classList.remove('fa-pause-circle');
            icon.classList.add('fa-play-circle');
        }
    });
}

// Listen for play/pause events to update UI
audioElement.addEventListener('play', updateActiveState);
audioElement.addEventListener('pause', updateActiveState);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            masterPlay.click();
            break;
        case 'ArrowRight':
            document.getElementById('next').click();
            break;
        case 'ArrowLeft':
            document.getElementById('previous').click();
            break;
    }
});

// Error handling for audio loading
audioElement.addEventListener('error', (e) => {
    console.error('Audio error:', e);
    console.log(`Could not load: ${songs[songIndex].songName}`);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePlayer();
    console.log("Spotify Clone Ready!");
});

// For debugging - you can remove this in production
window.spotifyClone = {
    songs,
    audioElement,
    songIndex,
    playSong,
    pauseCurrentSong,
    playCurrentSong
};