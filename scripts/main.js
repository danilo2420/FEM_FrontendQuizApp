
let currentTopic = -1;
let currentQuestion = -1;
let questionsTotal = -1;
let questionsRight = -1;

function main() {
    setEventListeners();
}

function initializeGame(topicIndex) {
    if (!pageManager.quizzesDataInitialized) {
        alert("Data could not be loaded. Try again.");
        return;
    }

    // Initialize variables
    currentTopic = topicIndex;
    currentQuestion = 0;
    questionsTotal = pageManager.quizzesData.quizzes[topicIndex].questions.length;
    questionsRight = 0;
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
            initializeGame(topic);

            // Make next stage appear
            pageManager.setTopIcon(currentTopic);
            pageManager.setPage(1);
            pageManager.populateQuestionPage(currentTopic, currentQuestion);
        })
    }
}

main();