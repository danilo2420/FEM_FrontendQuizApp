console.log("Hello from darkmode.js");

// Is dark mode activated?
let darkMode = false; 

function main() {
    const toggleButton = document.querySelector('.topSection__rightSection__toggleButton');

    toggleButton.addEventListener('click', (event) => {

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
            item.classList.toggle('customList__item--dark');
        }

        const questionsButton = document.querySelector('.bottomSection__rightSection__question__btn');
        questionsButton.classList.toggle('bottomSection__rightSection__question__btn--dark');

        // Question: title at the top that shows the number of the question
        const questionNumberInfo = document.querySelector('.bottomSection__leftSection__question__top__questionNumber');
        questionNumberInfo.classList.toggle('bottomSection__leftSection__question__top__questionNumber--dark');

        // Progress bar
        const progressBar = document.querySelector('.bottomSection__leftSection__question__bottom');
        progressBar.classList.toggle('bottomSection__leftSection__question__bottom--dark');

        // Keep state in a variable in case we need it
        darkMode = !darkMode;
        console.log(
            darkMode ? 
                "Website is now in dark mode" :
                "Website is now in light mode"
        )
    });
}

main();