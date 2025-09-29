
let currentTopic = -1;
let currentQuestion = -1;
let questionsTotal = -1;
let questionsRight = -1;

let currentSelectedAnswer = "";
let roundFinished = false;

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
    currentSelectedAnswer = "";
    roundFinished = false;
}

function setEventListeners() {
    console.log("Setting event listeners");

    setStartmenuEventListeners();
}

function setStartmenuEventListeners() {
    // Go from start menu to topic questions
    const startMenuItems = document.querySelectorAll('.bottomSection__rightSection__startMenu__item');
    for (const menuItem of startMenuItems) {
        menuItem.addEventListener('click', () => {
            const topic = menuItem.dataset.topic;
            initializeGame(topic);

            // Make next stage appear
            pageManager.setTopIcon(currentTopic);
            pageManager.setPage(1);
            pageManager.populateQuestionPage(currentTopic, currentQuestion);
        });
    }

    // Select answer
    const questionAnswerElements = document.querySelectorAll('.bottomSection__rightSection__question__item');
    const submitButton = document.querySelector('.bottomSection__rightSection__question__btn');
    for (const selectedItem of questionAnswerElements) 
        selectedItem.onclick = function() {
            if (roundFinished) return;

            for (const item of questionAnswerElements) 
                item.classList.remove('answer--selected');
            selectedItem.classList.add('answer--selected');
            submitButton.classList.remove('btn--notactive');
        }

    // Submit answer
    submitButton.onclick = function() {
        if (!roundFinished) {
            if (submitButton.classList.contains('btn--notactive')) return;
            console.log("Submitting");

            // Get selected answer 
            let answerSelectedElement = null;
            for (const answerItem of questionAnswerElements) {
                if (answerItem.classList.contains('answer--selected')) {
                    answerSelectedElement = answerItem;
                    currentSelectedAnswer = answerItem.querySelector('.bottomSection__rightSection__question__item__text').textContent;
                    break;
                }
            }
            console.log("Answer selected is " + currentSelectedAnswer);

            // Get real answer from data
            const realAnswer = pageManager.getQuestionAnswer(currentTopic, currentQuestion);

            // Compare answers and apply style
            answerSelectedElement.classList.remove('answer--selected');
            if (currentSelectedAnswer == realAnswer) {
                answerSelectedElement.classList.add('answer--correct');
                questionsRight += 1;
            } else {
                answerSelectedElement.classList.add('answer--wrong');

                // Give style to correct answer
                for (const answerItem of questionAnswerElements) {
                    if (answerItem
                            .querySelector('.bottomSection__rightSection__question__item__text')
                            .textContent == realAnswer
                    ) {
                        answerItem.classList.add('answer--correct');
                    }
                }
            }

            roundFinished = true;
            // Switch text to "Next question" or something like that?
            this.textContent = "Next Question";
        } else {
            // Reset button
            this.textContent = "Submit Answer";
            this.classList.add('btn--notactive');
            
            // Reset answers
            for (const answerItem of questionAnswerElements) {
                answerItem.classList.remove('answer--selected');
                answerItem.classList.remove('answer--correct');
                answerItem.classList.remove('answer--wrong');
            }

            // Logic for next round
            currentQuestion += 1;
            roundFinished = false;

            if (currentQuestion < questionsTotal) {
                pageManager.populateQuestionPage(currentTopic, currentQuestion);
            } else {
                // Go to score page
                pageManager.setScorePageData(currentTopic, questionsRight, questionsTotal);
                pageManager.setPage(2);
            }
        }
    }

    // Play again
    const playAgainButton = document.querySelector('.bottomSection__rightSection__score__btn');
    playAgainButton.onclick = function() {
        pageManager.setPage(0);
    }
}

main();