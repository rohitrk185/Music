//selecting all html elements and assign them to a js variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let vol_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
//global variables
let track_index = 0;
let isPlaying = false;
let updateTimer;

//create audio element
let curr_track = document.createElement('audio');

let track_list = [
    {name: "Baby Pluto", artist: "Lil Uzi Vert", image: 'Images/BabyPluto.jfif', path: "Tracks/Baby Pluto - Lil Uzi Vert.mp3"},
    {name: "Back In Blood", artist: "Pooh Shiesty ft.Lil Durk", image: 'Images/BackInBlood.jfif', path: "Tracks/Back In Blood - Pooh Shiesty(Ft Lil Durk).mp3"},
    {name: "Came And Saw", artist: "YSL, Young Thug ft.RowdyRebel", image: "Images/CameAndSaw.jpg", path: "Tracks/Came And Saw - YSL, Young Thug(ft Rowdy Rebel).mp3"},
    {name: "Diamonds Dancing", artist: "YSL, Young Thug, Gunna ft.Travis Scott", image: 'Images/CameAndSaw.jpg', path: "Tracks/Diamonds Dancing - YSL, Young Thug, Gunna(ft Travis Scott).mp3"},
    {name: "Over Your Head", artist:"Lil Uzi Vert ft.Future", image: 'Images/OverYourHead.jpg', path: "Tracks/Over Your Head - Future & Lil Uzi Vert.mp3"},
    {name: "Repercussions", artist:"NAV ft.Young Thug", image: 'Images/Repercussions.jpg', path: "Tracks/Repercussions - Nav(ft Young Thug).mp3"},
    {name: "X(21 Savage ft Future)", artist: "21 Savage, Metro Boomin ft.Future", image: 'Images/X.jpg', path: "Tracks/X - 21 Savage Ft Future.mp3"},
    {name: "Yessirskiii", artist:"Lil Uzi Vert ft.21 Savage", image: 'Images/Yessirski.jpg', path: "Tracks/Yessirskiii - Lil Uzi Vert(ft 21 Savage).mp3"},
];


// Step2
// Loading a new track from playlist

function loadTrack(track_index) {
// Clear the previous seek timer
	clearInterval(updateTimer);
	resetValues();

// Load a track
	curr_track.src = track_list[track_index].path;
	curr_track.load();

// Update details of the track
	track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
	track_artist.textContent = track_list[track_index].artist;
	now_playing.textContent = "Playing " + (track_index + 1) + " OF " + track_list.length;

// Set an interval of 1000millisec for updating the seekSlider
    updateTimer = setInterval(seekUpdate, 1000);

// Move to next song if current one is finished using 'ended' event
    curr_track.addEventListener("ended", nextTrack); 
}

// Function to reset all values to default
function resetValues() {
	curr_time.textContent = "00:00";
	total_duration.textContent = "00:00";
	seek_slider.value = 0;
}


// Step 3
// Configuring the player buttons

function playpauseTrack() {
// Switch b/w playing and pause depending on current state
	if (!isPlaying) {
		playTrack();
	} else {
		pauseTrack();
	}
}

function playTrack() {
// play the loaded track and set isPlaying to true 
	curr_track.play();
	isPlaying = true;

// replace play icon with pause icon
	playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-4x"> </i>';	
}

function pauseTrack() {
// pause the playing track and set isPlaying to false 
	curr_track.pause();
	isPlaying = false;

// replace play icon with play icon
	playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-4x"> </i>';
}

function nextTrack() {
// go back to first track if 
// the current one is the last track
    if(track_index < track_list.length - 1) {
    	track_index += 1; 
    }else {
    	track_index = 0;
    }

// load and play the track
	loadTrack(track_index);
	playTrack();
}

function prevTrack() {
// go to the last track if 
// the current one is the first track
    if(track_index > 0) {
    	track_index -= 1; 
    }else {
    	track_index = track_list.length - 1;
    }

// load and play the track
	loadTrack(track_index);
	playTrack();
}


// Step 4
// Configuring sliders portion

function seekTo() {
// calculate the seek position by the % of seek slider
// and get the relative duration to the track
    let seekto = curr_track.duration * (seek_slider.value / 100);

// set the curr track position to calculated seek position
     curr_track.currentTime = seekto;
}

function setVolume() {
// set the volume according to % of volume slider
    curr_track.volume = vol_slider.value / 100; 
}

function seekUpdate() {
	let seekPosition = 0;

// check if curr track duration is a legible number
    //if(!isNaN(curr_track.duration)) {
    	seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    	seek_slider.value = seekPosition;

    // calculate time left and total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    //}

    // add a zero to the single digit time values
    if (currentSeconds < 10) {
    	currentSeconds = "0" + currentSeconds;
    } if (durationSeconds < 10) {
    	durationSeconds = "0" + durationSeconds;
    } if (currentMinutes < 10) {
    	currentMinutes = "0" + currentMinutes;
    } if (durationMinutes < 10) {
    	durationMinutes = "0" + durationMinutes;
    } 

    // display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
}


// step 5
// load the first track in the tracklist
loadTrack(track_index);






















