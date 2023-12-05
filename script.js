
let lastSelectedSong = null;

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audioElement');
    const playPauseButton = document.getElementById('playPauseButton');
    const stopButton = document.getElementById('stopButton');
    const seekSlider = document.getElementById('seekSlider');
    const artistInfo = document.getElementById('artistInfo');
    const trackInfo = document.getElementById('trackInfo');
    const areas = document.querySelectorAll('a[data-audio-url]');
  

    // Function to play audio from a given URL
    function playAudioFromUrl(url) {
        audio.src = url;
        audio.load();
        audio.play();
        playPauseButton.innerHTML = '&#10074;&#10074;'; // Pause symbol
        
    
        let selectedSongAnchor = document.querySelector(`a[data-audio-url="${url}"]`);
        let selectedSong = selectedSongAnchor ? selectedSongAnchor.closest('a') : null;

          // Extract artist and track name
    const artist = selectedSong ? selectedSong.getAttribute('data-artist') : 'Unknown Artist';
    const track = selectedSong ? selectedSong.getAttribute('data-track-name') : 'Unknown Track';

    // Update the display in the player
    artistInfo.textContent = `${artist}`;
    trackInfo.textContent = `${track}`;

    
        // Remove 'selected' class from the previously selected song, if any
        if (lastSelectedSong && lastSelectedSong !== selectedSong) {
            lastSelectedSong.classList.remove('selected');
        }
    
        // Add 'selected' class to the current song
        if (selectedSong) {
            selectedSong.classList.add('selected');
        }
    
        // Update lastSelectedSong
        lastSelectedSong = selectedSong;
    }
    

    // Add event listeners to each clickable area
    areas.forEach(area => {
        area.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const audioUrl = this.getAttribute('data-audio-url');
            playAudioFromUrl(audioUrl);
        });
    });


    function handleSongEnd() {
        // Get all <a> elements with a data-audio-url attribute
        const songElements = document.querySelectorAll('a[data-audio-url]');
        if (songElements.length === 0) return; // If no songs are available, do nothing
    
        // Pick a random <a> element
        const randomIndex = Math.floor(Math.random() * songElements.length);
        const randomSong = songElements[randomIndex];
    
        // Play the random song
        if (randomSong) {
            let randomSongUrl = randomSong.getAttribute('data-audio-url');
            playAudioFromUrl(randomSongUrl);
        }
    }
    

    // Toggle Play/Pause
    playPauseButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '&#10074;&#10074;'; // Pause symbol
        } else {
            audio.pause();
            playPauseButton.innerHTML = '&#9658;'; // Play symbol
        }
    });

    // Stop Button
    stopButton.addEventListener('click', function() {
        audio.pause();
        audio.currentTime = 0;
        playPauseButton.innerHTML = '&#9658;'; // Play symbol
        seekSlider.value = 0;
        document.getElementById('progressBar').style.width = `0%`;
    });

    // Update progress bar as audio plays
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        seekSlider.value = audio.currentTime;
    });

    // Update slider max value when audio metadata is loaded
    audio.addEventListener('loadedmetadata', function() {
        seekSlider.max = audio.duration;
    });

    audio.addEventListener('ended', handleSongEnd);


    // Seek in the audio when the slider value changes
    seekSlider.addEventListener('input', function() {
        audio.currentTime = seekSlider.value;
    });
   
   
    

});


