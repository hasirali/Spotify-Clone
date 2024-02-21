let currentSong = new Audio();


async function getsSongs() {
    try {
        let response = await fetch('http://127.0.0.1:5500/table.html');
        let htmlContent = await response.text();

        htmlContent = htmlContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

        let div = document.createElement("div");
        div.innerHTML = htmlContent;

        let as = div.getElementsByTagName("a");
        let songs = [];

        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                songs.push(element.href.split("/songs/")[1].replaceAll("%20", " "));
            }
        }
        return songs;
    } catch (error) {
        console.error('Error fetching and parsing songs:', error);
        return [];
    }
}

const playMusic = (track) => {
    // let audio = new Audio("/songs/" + track);
    currentSong.src = ("/songs/"+ track);
    currentSong.play();
};

async function main() {
    try {
        let songs = await getsSongs();
        console.log('Songs:', songs);

        let songsUL = document.querySelector(".songList").getElementsByTagName("ul")[0];

        for (const song of songs) {
            songsUL.innerHTML += `<li><img class="invert" width="34" src="img/music.svg" alt="">
            <div class="info">
                <div> ${song.replaceAll("%20", " ")}</div>
                <div>Harry</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg" alt="">
            </div> </li>`;
        }

        // Create an audio element
        var audioElement = new Audio();

        if (songs.length > 0) {
            // Add an event listener to get the duration once it's loaded
            audioElement.addEventListener("loadeddata", () => {
                let duration = audioElement.duration;
                console.log('Audio duration:', duration);
            });

            // Set the source of the audio element to the first song
            audioElement.src = "/songs/" + songs[0];

            // Play the audio
            audioElement.play();
        }
    } catch (error) {
        console.error('Error in main:', error);
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    });
}

main();
