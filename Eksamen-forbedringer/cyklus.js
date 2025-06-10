// Baggrundsmusik

const baggrundsMusik = document.getElementById("baggrundsMusik"); // Henter baggrundsmusikken fra html
const muteKnap = document.getElementById("muteKnap");

let musikStartet = false;
let muted = false;

document.addEventListener("click", () => { 
    if (!musikStartet) { 
        baggrundsMusik.play(); 
        musikStartet = true; 
    }
});

muteKnap.addEventListener("click", (e) => {
    e.stopPropagation();

    if (muted) {
        baggrundsMusik.play();
        muteKnap.src = "img/muteknap.png";
    } else {
        baggrundsMusik.pause();
        muteKnap.src = "img/mute.png";
    }
    muted = !muted;
});





// JavaScript til at få livmoderen til at blinke

const livmoder = document.getElementById("livmoder");

const livmoderAabneOejne = "img/livmoder.png";
const livmoderLukkeOejne = "img/livmoderlukkedeoejne.png";

let aabneOejne = true;

setInterval(() => {
    if (aabneOejne) {
        livmoder.src = livmoderLukkeOejne;
    } else {
        livmoder.src = livmoderAabneOejne;
    }
    aabneOejne  = !aabneOejne;
}, 2000);

