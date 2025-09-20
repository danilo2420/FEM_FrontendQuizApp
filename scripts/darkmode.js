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

        // List items 
        const customListItems = document.querySelectorAll('.customList > *');
        for (const item of customListItems) {
            item.classList.toggle('customList__item--dark');
        }

        // Keep state in a variable in case we need it
        darkMode = !darkMode;
    });
}

main();