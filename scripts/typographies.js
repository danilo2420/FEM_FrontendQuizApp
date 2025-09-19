// *** 
// This script sets and modifies the typographies of the different elements
// This is a solution to the ugly bandaid that I used to use until now
// *** 

// Elements with different typographies
// Enter all the elements here and their different typographies

// TODO: can I put this into a JSON?
const typographiesArray = [
    {
        "element": ".topSection__leftSection__title",
        "typographies": {
            "mobile": "tp4-mobile",
            "tablet": "tp4",
            "desktop": "tp4"
        }
    },
    {
        "element": ".bottomSection__leftSection__startMenu__title",
        "typographies": {
            "mobile": "tp2-light-mobile",
            "tablet": "tp2-light",
            "desktop": "tp2-light"
        }
    },
    {
        "element": ".bottomSection__leftSection__startMenu__title span",
        "typographies": {
            "mobile": "tp2-medium-mobile",
            "tablet": "tp2-medium",
            "desktop": "tp2-medium"
        }
    },
    {
        "element": ".bottomSection__leftSection__startMenu__subtitle",
        "typographies": {
            "mobile": "tp5-mobile",
            "tablet": "tp6",
            "desktop": "tp6"
        }
    },
    {
        "element": ".customList > * > *:last-child",
        "typographies": {
            "mobile": "tp4-mobile",
            "tablet": "tp4",
            "desktop": "tp4"
        }
    }
];


const versionMinWidth = {
    "mobile": 0,
    "tablet": 600,
    "desktop": 1100
}

let currVersion = "";

// Events
window.onload = () => {
    setTypographies();
}

window.onresize = () => {
    setTypographies();
}

// Functions
function setTypographies() {
    // Check what version is relevant now and whether it has changed
    const version = calculateVersion();
    if (version == "") return;

    // Go through all the elements and change their typography
    for (let elementObject of typographiesArray) {
        const severalElements = document.querySelectorAll(elementObject.element);
        for (const element of severalElements) {
            setElementTypography(elementObject, element, version);    
        }
    }
}

function calculateVersion() {
    // Only returns a version if it's different from the previous one
    const screenWidth = window.screen.width;
    if (screenWidth < versionMinWidth["tablet"]) {
        if (currVersion == "mobile") return "";
        currVersion = "mobile";
        return "mobile";
    } else if (screenWidth < versionMinWidth["desktop"]) {
        if (currVersion == "tablet") return "";
        currVersion = "tablet";
        return "tablet";
    } else {
        if (currVersion == "desktop") return "";
        currVersion = "desktop";
        return "desktop";
    }
}

function setElementTypography(elementObject, element, version) {
    // Remove previous typography
    for (const cssClass of element.classList) {
        if (cssClass.startsWith("tp")) {
            element.classList.remove(cssClass);
        }
    }
    // Add new typography as a function of the version
    element.classList.add(elementObject.typographies[version]);
}
