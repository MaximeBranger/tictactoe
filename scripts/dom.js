const cards = document.querySelectorAll(".card");
const restartButton = document.querySelector("#restart");
const resultDiv = document.querySelector(".result");

const teamAcolorInput = document.querySelector("#teamA");
const teamBcolorInput = document.querySelector("#teamB");

let turn = true;
const teamColor = ["red", "blue"];
let color = teamColor[0];
let isPlaying = true;

const teamA = [];
const teamB = [];

const winCases = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

cards.forEach(c => {
    c.addEventListener("click", checkCard);
    c.addEventListener("mouseenter", hoverCard);
    c.addEventListener("mouseleave", unhoverCard);
});

document.addEventListener("DOMContentLoaded", () => {
    teamAcolorInput.value = "#FF0000";
    teamBcolorInput.value = "#0000FF";
});

teamAcolorInput.addEventListener("change", updateColor);
teamBcolorInput.addEventListener("change", updateColor);

restartButton.addEventListener("click", restart);

function checkCard(ev) {
    if (!isPlaying) {
        return;
    }
    ev.target.style.backgroundColor = color;
    ev.target.dataset.status = "checked";
    turn = !turn;
    if (turn) {
        color = teamColor[0];
        teamA.push(ev.target.id);
        checkWinner(teamA);
    } else {
        color = teamColor[1];
        teamB.push(ev.target.id);
        checkWinner(teamB);
    }
}

function checkWinner(team) {
    const teamId = team.map(c => parseInt(c.split('').slice(4).join('')));
    teamId.sort((a, b) => a - b);

    const isWinner = winCases.some(wc => {
        return wc.every(v => {
            return teamId.includes(v)
        })
    })

    if (isWinner) {
        isPlaying = false;
        const p = document.createElement("p");
        p.textContent = "We have a winner !";
        resultDiv.appendChild(p);
        resultDiv.classList.add("winner");
    } else if (teamA.length + teamB.length === 9) {
        isPlaying = false;
        const p = document.createElement("p");
        p.textContent = "No winner this time !";
        resultDiv.appendChild(p);
        resultDiv.classList.add("draw");
    }
}

function hoverCard(ev) {
    if (ev.target.dataset.status !== "checked") {
        ev.target.style.backgroundColor = color;
    }
}

function unhoverCard(ev) {
    if (ev.target.dataset.status !== "checked") {
        ev.target.style.backgroundColor = "white";
    }
}

function restart(ev) {
    if (ev !== null) {
        ev.preventDefault();
    }
    teamA.length = 0;
    teamB.length = 0;
    cards.forEach(c => {
        c.style.backgroundColor = "white";
        c.dataset.status = "";
    });
    resultDiv.innerHTML = "";
    resultDiv.className = "result";
    isPlaying = true;
    color = teamColor[0];
    turn = true;
}

function updateColor(ev) {
    const newColor = ev.target.value;
    if (ev.target.id === "teamA") {
        teamColor[0] = newColor;
    } else {
        teamColor[1] = newColor;
    }
    restart(null);
}