
// Elements
const toggleButton = document.querySelector('.topSection__rightSection__toggleButton');

// Is dark mode activated?
let darkMode = false; 

function darkmodeMain() {
    toggleButton.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    // Dark mode toggle button and its icons
    toggleButton.classList.toggle('topSection__rightSection__toggleButton--dark');

    const toggleButtonSunIcon = document.querySelector('.topSection__rightSection__sunIcon');
    const toggleButtonMoonIcon = document.querySelector('.topSection__rightSection__moonIcon');
    toggleButtonSunIcon.classList.toggle('topSection__rightSection__sunIcon--dark');
    toggleButtonMoonIcon.classList.toggle('topSection__rightSection__moonIcon--dark');

    // General font
    const bodyElement = document.querySelector('body');
    bodyElement.classList.toggle('body--dark'); 

    // Start menu - Subtitle text
    const startMenuSubtitle = document.querySelector('.bottomSection__leftSection__startMenu__subtitle');
    startMenuSubtitle.classList.toggle('bottomSection__leftSection__startMenu__subtitle--dark');

    // List items 
    const customListItems = document.querySelectorAll('.customList > *:not(.bottomSection__rightSection__question__btn)');
    for (const item of customListItems) {
        if (item.classList.contains('bottomSection__rightSection__question__errorMessage')) 
            continue;
        item.classList.toggle('customList__item--dark');
    }

    const buttons = document.querySelectorAll('.btn');
    for (const button of buttons) {
        button.classList.toggle('btn--dark');
    }

    // Question: title at the top that shows the number of the question
    const questionNumberInfo = document.querySelector('.bottomSection__leftSection__question__top__questionNumber');
    questionNumberInfo.classList.toggle('bottomSection__leftSection__question__top__questionNumber--dark');

    // Progress bar
    const progressBar = document.querySelector('.bottomSection__leftSection__question__bottom');
    progressBar.classList.toggle('bottomSection__leftSection__question__bottom--dark');

    const scoreBoard = document.querySelector('.bottomSection__rightSection__score__result');
    scoreBoard.classList.toggle('bottomSection__rightSection__score__result--dark');

    const scoreBoardSubtitle = document.querySelector('.bottomSection__rightSection__score__result__bottom__subtext');
    scoreBoardSubtitle.classList.toggle('bottomSection__rightSection__score__result__bottom__subtext--dark');

    // Keep state in a variable in case we need it
    darkMode = !darkMode;
}

darkmodeMain();