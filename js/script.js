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

function main() {
    getsSongs().then(songs => {
        console.log('Songs:', songs);

        let songsUL = document.querySelector(".songList").getElementsByTagName("ul")[0];

        for (const song of songs) {
            songsUL.innerHTML += `
            <li>
                <img src="/img/music.svg" alt="" class="invert">
                <div class="info">
                    <div>${song}</div>
                    <div>pakhanchi</div>
                </div>
                <img class="invert" src="/img/play.svg" alt="" set="">
            </li>`;
        }

        // Create an audio element
        var audioElement = new Audio();

        // Add an event listener to get the duration once it's loaded
        audioElement.addEventListener("loadeddata", () => {
            let duration = audioElement.duration;
            console.log('Audio duration:', duration);
        });

        // Set the source of the audio element
        audioElement.src = songs[1];

        // Play the audio
        audioElement.play();
    });

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        console.log(e.querySelector("div"));
    });
}

main();
