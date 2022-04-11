const playAudio = (color) => {
    let audio_path;

    switch (color) {
        case 'R':
            audio_path = "./sounds/Red.mp3";
            break;

        case 'B':
            audio_path = "./sounds/Blue.mp3";
            break;

        case 'G':
            audio_path = "./sounds/Green.mp3";
            break;

        case 'Y':
            audio_path = "./sounds/Yellow.mp3";
            break;
    }

    const audio = new Audio(audio_path);
    audio.play();
}

const colors = ["Blue", "Red", "Green", "Yellow"];
let gameActive = false;

for (let idx in colors) {
    let color = colors[idx];
    const quarterDiv = document.getElementById(color);
    quarterDiv.addEventListener('click', () => playAudio(color[0]));
    quarterDiv.addEventListener('click', () => {
        if (gameActive) {
            inputSequence.push(color);
            checkInputArray();
        }
    });
}

const buttonHandler = (buttonDisabled) => {
    const button = document.getElementById("newGame");
    button.disabled = buttonDisabled;
};

const toggleLevelVisibility = (visibility) => {
    const levelElement = document.getElementById("Level");
    if (visibility) {
        levelElement.style.display = "block";
    } else {
        levelElement.style.display = "none";
    }
};

const setElementTextContent = (element, text) => {
    const htmlElement = document.getElementById(element);
    htmlElement.textContent = text;
};


const newGame = document.getElementById("newGame");
let level = 0;
let sequence = [], inputSequence = [];

const checkInputArray = () => {
    const endGame = () => {
        setElementTextContent("Level-num", "0");
        toggleLevelVisibility(false);
        buttonHandler(false);
        level = 0;

        const banner = document.getElementById("gameOver");

        setTimeout(() => {
            banner.classList.toggle("active");
        }, 0);


        setTimeout(() => {
            banner.classList.toggle("active");
        }, 3000);
    };

    if (sequence.length === inputSequence.length) {
        let flag = false;
        for (let idx in inputSequence) {
            if (inputSequence[idx] !== sequence[idx]) {
                flag = true;
                break;
            }
        }

        if (flag) {
            endGame();
        } else {
            setTimeout(() => {
                nextLevel();
            }, 2000);
        }
    } else {
        let flag = false;

        for (let k = 0; k < inputSequence.length; k++) {
            if (sequence[k] !== inputSequence[k]) {
                flag = true;
                break;
            }
        }

        if (flag) {
            endGame();
        }
    }
}

const nextLevel = () => {
    sequence = [];
    inputSequence = [];
    level += 1;
    setElementTextContent("Level-num", `${level}`);

    let index = 0;
    let idx, color;

    for (let i = 0; i < level; i += 1) {

        idx = Math.floor(Math.random() * 4);
        color = colors[idx];
        sequence.push(color);

        setTimeout(() => {
            let col = sequence[index];
            let quarterDiv = document.getElementById(`${col}`);
            quarterDiv.classList.toggle(`${col}-active`);
            quarterDiv.classList.toggle('scale');
            playAudio(col[0]);
        }, i * 2500 + 500);

        setTimeout(() => {
            let col = sequence[index];
            let quarterDiv = document.getElementById(`${col}`);
            quarterDiv.classList.toggle(`${col}-active`);
            quarterDiv.classList.toggle('scale');
            index += 1;
        }, (i + 1) * 2500 - 500);
    }
};

newGame.addEventListener('click', async () => {
    gameActive = true;
    setElementTextContent("Level-num", "0");
    toggleLevelVisibility(true);
    buttonHandler(true);

    nextLevel();
}); 