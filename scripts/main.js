
let dataObject;
let questionsTotal;
let questionsRight;
let questionsCurrent;
let topicCurrent;

function main() {
    return; // Not doing anything here at the moment
    // Load data
    fetch('data/data.json')
        .then((response) => {
            if (!response.ok)
                throw new Error("Error loading data.json file");
            return response.json();
        }).then((data) => {
            dataObject = data;

            initializeGame(); // TODO: perhaps have an object to control the page displayed?

            setEventListeners();

        }).catch((error) => {
            console.log(error);
        });
}

function initializeGame() {
    questionsTotal = 0;
    questionsRight = 0;
    questionsCurrent = 0;
    topicCurrent = "";
}

function setEventListeners() {
    console.log("Setting event listeners");

    setStartmenuEventListeners();
}

function setStartmenuEventListeners() {
    const startMenuItems = document.querySelectorAll('.bottomSection__rightSection__startMenu__item');
    for (const menuItem of startMenuItems) {
        menuItem.addEventListener('click', () => {
            const topic = menuItem.dataset.topic;
            console.log(topic + " was chosen");

            // Make next stage appear
        })
    }
}

main();