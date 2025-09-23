console.log("Hello from darkmode.js");

// TODO: There's a problem with the moon and sun icons

let darkmodeElements = []

// Is dark mode activated?
let darkMode = false; 

function main() {
    
    // Populate array with elements from JSON file
    fetch('data/darkmode-elements.json')
        .then((response) => {
            if (!response.ok) throw new Error("Error reading the darkmode-elements.json file");
            return response.json();
        }).then((data) => {
            darkmodeElements = data;

            // After loading the elements, set the event listener on the toggle button
            setEventListener();

        }).catch((error) => {
            console.log(error);
        });
}

function setEventListener() {
    const toggleButton = document.querySelector('.topSection__rightSection__toggleButton');
    toggleButton.addEventListener('click', (event) => {

        // Go through all the CSS selectors that point to elements that change in dark mode
        for (const elementType of darkmodeElements) {

            let elements, darkmodeStyle;

            // Some darkmode classes can be built just adding '--dark' to the base class, others can't
            // Those that can't are represented as an object in the JSON file
            // Thus, we have to differentiate between both types
            if (elementType['selector']) {
                elements = document.querySelectorAll(elementType['selector']);
                darkmodeStyle = elementType['darkmodeClass'];
            } else {
                elements = document.querySelectorAll(elementType);
                darkmodeStyle = elementType + "--dark";
            }

            // Loop through the array and toggle the style of every element for the current CSS selector
            for (const element of elements) {
                element.classList.toggle(darkmodeStyle);
            }
        }

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