
const pageManager = {
    // VARIABLES
    pages: {
        "START_MENU": [
            ".bottomSection__leftSection__startMenu",
            ".bottomSection__rightSection__startMenu"
        ],
        "QUESTION": [
            ".topSection__leftSection",
            ".bottomSection__leftSection__question",
            ".bottomSection__rightSection__question"
        ],
        "SCORE": [
            ".topSection__leftSection",
            ".bottomSection__leftSection__score",
            ".bottomSection__rightSection__score"
        ]
    },
    hideInsteadOfDisplayNone : [
        ".topSection__leftSection"
    ],
    pageMap: {
        0: "START_MENU",
        1: "QUESTION",
        2: "SCORE"
    },
    topicMap: {
        0: "HTML",
        1: "CSS",
        2: "JavaScript",
        3: "Accessibility"
    },
    quizzesData: null,
    quizzesDataInitialized: false,
    currAnswer: "",

    // FUNCTIONS

    loadQuizzesData: () => {
        // Load data
        fetch('data/data.json')
            .then((response) => {
                if (!response.ok)
                    throw new Error("Error loading data.json file");
                return response.json();
            }).then((data) => {
                pageManager.quizzesData = data;
                pageManager.quizzesDataInitialized = true;
                pageManager.populateQuestionPage(1, 0); // This should be removed once the function is built
            }).catch((error) => {
                console.log(error);
            });
    },

    setPage: (index) => {
        // Validate page index
        if (index < 0 || index >= Object.keys(pageManager.pages).length) {
            console.log("Invalid index in pageManager.setPage");
            index = 0;
        }

        // Hide everything first
        for (const pageElements of Object.values(pageManager.pages)) {
            for (const pageElement of pageElements) {
                const component = document.querySelector(pageElement);
                if (!component) continue;
                
                if (pageManager.hideInsteadOfDisplayNone.includes(pageElement)) {
                    component.classList.add('hidden');
                } else {
                    component.classList.add('nonvisible');
                }
            }
        }

        // Make the selected page's components visible
        for (const pageElement of pageManager.pages[pageManager.pageMap[index]]) {
            const component = document.querySelector(pageElement);
            if (!component) continue;

            if (pageManager.hideInsteadOfDisplayNone.includes(pageElement)) {
                component.classList.remove('hidden');
            } else {
                component.classList.remove('nonvisible');
            }
        }
    },

    populateQuestionPage: (topicIndex, questionIndex) => {
        if (!pageManager.quizzesDataInitialized) return;

        // Validate input
        if (topicIndex < 0 || !Object.values(pageManager.topicMap).length) {
            console.log("Topic index not valid");
            topicIndex = 0;
        }

        const questionNumber = pageManager
                        .quizzesData
                        .quizzes[topicIndex]
                        .questions
                        .length;

        if (questionIndex < 0 || questionIndex >= questionNumber) {
            console.log("Question number not valid");
            questionIndex = 0;
        }

        console.log(topicIndex, questionIndex);

        // Get topic and questions data
        const topic = pageManager.quizzesData.quizzes[topicIndex].title;
        const questionSet = pageManager.quizzesData.quizzes[topicIndex].questions;

        const questionText = questionSet[questionIndex].question;
        const questionOptions = questionSet[questionIndex].options;
        const questionAnswer = questionSet[questionIndex].answer;
        

        // SET DATA
        // Question
        const questionElement = document.querySelector('.bottomSection__leftSection__question__top__question');
        questionElement.textContent = questionText;

        // Items
        const answerElements = document.querySelectorAll('.bottomSection__rightSection__question__item');

        for (let i = 0; i < questionOptions.length; i++) {
            const item = answerElements[i];
            const itemText = item.querySelector('.bottomSection__rightSection__question__item__text');
            itemText.textContent = questionOptions[i];
        }

        // Set value for answer variable
        pageManager.currAnswer = questionAnswer;

    }
}

// FUNCTION CALLS
pageManager.loadQuizzesData();
pageManager.setPage(1);
pageManager.populateQuestionPage(2, 4);