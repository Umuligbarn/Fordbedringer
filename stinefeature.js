// ------------------------------Variable---------------------------------

const ramme = document.querySelector(".videoramme");
const video = document.getElementById("video");
const afspil = document.getElementById("playknap");
const livmoder = document.getElementById("vinterLivmoder");
const tilbageknap = document.getElementById("tilbageknapVideo");
const mute = document.getElementById("muteVinterVideo");
const skygge = document.querySelector(".skygge");
const doneVideo = document.getElementById("doneVideo");
const doneVideoJa = document.getElementById("doneVideoJa");
const spilIgen = document.getElementById("spiligen");


// ----------------------------Hjælpefunktioner------------------------


function fadeUd(element) {
    element.style.animationName = "fadeUd";
}

function fadeInd(element) {
    element.style.display = "inline-flex";
    element.style.animationName = "fadeInd";
}

function resetVideoUI() {
    // Nulstil UI for video
    video.style.borderRadius = "500px";
    ramme.classList.remove("videoAaben");
    skygge.classList.remove("moerk");
    tilbageknap.style.display = "none";
    mute.src = "img/muteknap.png";
    video.muted = false;
}

//---------------------- Event listeners til knapperne -------------------------------

["click", "touchstart"].forEach(event => {
    // Event listeners til playknappen
    afspil.addEventListener(event, startVideo);

    // Event listeners til tilbageknappen
    tilbageknap.addEventListener(event, stopVideo);

    // Event listeners til mute knappen
    mute.addEventListener(event, muteFunktion);

    // Event listeners til doneVideo knappen
    doneVideoJa.addEventListener(event, lukVideo);
    spilIgen.addEventListener(event, replayVideo);
})

//------------------- Åbn video -------------------------------

function startVideo(e) {
    e.stopPropagation(); // Stop event bubbling
    // Knap og livmoder fader ud
    fadeUd(afspil);
    fadeUd(livmoder);
    vinterMusik.pause();

    // Eventlistener på livmoder-animationen
    livmoder.addEventListener("animationend", aabnVideo, { once: true });

    function aabnVideo() {
        // Video går fra cirkel til firkant, rammen udvides og placeres i midten, der kommer skygge
        video.style.borderRadius = "0";
        ramme.classList.toggle("videoAaben");
        skygge.classList.toggle("moerk");

        // Eventlistener på rammens transition ml. classerne
        ramme.addEventListener("transitionend", playVideo, { once: true });

        // Video starter
        function playVideo() {
            video.play();

            //Tilbage- og muteknap fader ind
            fadeInd(tilbageknap);
            fadeInd(mute);
        }
    }
}


//-------------------------- Luk video -------------------------------

function stopVideo() {
    // Video stopper og tilbageknap fader ud
    video.pause();
    fadeUd(tilbageknap);
    fadeUd(mute);

    // Eventlistener på tilbageknap animationen
    tilbageknap.addEventListener("animationend", lukVideo, { once: true });
}


//------------------- Spørg om stop video -------------------------------
video.addEventListener("ended", askStopVideo);

function askStopVideo() {
    doneVideo.classList.toggle("visDoneVideo");
    fadeUd(tilbageknap);
}

function replayVideo() {
    doneVideo.classList.toggle("visDoneVideo");
    video.currentTime = 0;
    video.play();
    fadeInd(tilbageknap);
    fadeInd(mute);
}


// LukVideo er en ekstern funktion, da den både skal kaldes ved stopVideo og ved askStopVideo

function lukVideo() {

    // Video går fra firkant til cirkel, rammen skrumper og placeres til venstre og skygge fjernes
    if (doneVideo.classList.contains("visDoneVideo")) {
        fadeUd(doneVideo);
        fadeUd(mute);
        doneVideo.classList.toggle("visDoneVideo");

        mute.addEventListener("animationend", () => {
            resetVideoUI()
        }, { once: true });
    }

    else {
     resetVideoUI();
    }

    // Eventlistener på rammens transition ml. classerne
    ramme.addEventListener("transitionend", visKnap, { once: true });

    function visKnap() {
        // knap og livmoder fader ind og video nulstilles
        fadeInd(afspil);
        fadeInd(livmoder);
        video.currentTime = 0;
        vinterMusik.play();
    }
}


//------------------- Mute video -------------------------------

mute.addEventListener("click", muteFunktion);

function muteFunktion() {
    if (video.muted === true) {
        video.muted = false;
        mute.src = "img/muteknap.png";
    } else {
        video.muted = true;
        mute.src = "img/mute.png";
    }
}

