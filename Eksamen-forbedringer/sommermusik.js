
const sommerMusik = document.getElementById("sommerMusik");
const muteKnap = document.getElementById("muteKnap");

let musikStartet = false;
let muted = false; // Variabel der holder styr på om musikken er muted eller ej



function startMusikVedKlik() {
    if (!musikStartet) { // Hvis musikken ikke allerede er startet
        sommerMusik.play(); // Spiller musikken
        musikStartet = true; // Sætter musikStartet til true så musikken ikke starter igen
    }
}

document.addEventListener("click", startMusikVedKlik); // Når brugeren klikker på siden, kaldes funktionen startMusikVedKlik()
document.addEventListener("touchstart", startMusikVedKlik); // Når brugeren rører ved skærmen, kaldes funktionen startMusikVedKlik()




function muteMusik(e) {
    e.stopPropagation(); // Forhindrer at mute-klikket også tæller som et klik på siden

    if (muted) {
        sommerMusik.play(); // Spiller musikken hvis den er muted
        muteKnap.src = "img/muteknap.png"; // Skifter billedet til mute
    } else {
        sommerMusik.pause(); // Pauser musikken hvis den ikke er muted
        muteKnap.src = "img/mute.png"; // Skifter billedet til unmute
    }
    muted = !muted; // Skifter værdien af muted til det modsatte
}

muteKnap.addEventListener("click", muteMusik); // Når mute knappen bliver klikket på, kaldes funktionen muteKnap()
muteKnap.addEventListener("touchstart", muteMusik); // Når mute knappen bliver rørt ved, kaldes funktionen muteKnap()

