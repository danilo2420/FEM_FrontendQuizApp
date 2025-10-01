// *** 
// This script sets and modifies the typographies of the different elements
// You have to define the fonts for the different elements in /data/typographies.json
// This is a solution to the ugly bandaid that I used to use until now
// *** 

let typographiesArray = null;
const versionMinWidth = {
    "mobile": 0,
    "tablet": 600,
    "desktop": 1100
}
let currVersion = "";

function typographiesMain() {

    // Read json file
    fetch('data/typographies.json') // reads it from index.html location
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error trying to fetch the typographies.json file');
            }
            return response.json();
        }).then((data) => {
            typographiesArray = data;

            setTypographies();
            setEventListeners_typographies();
        }).catch((error) => {
            console.error(error);
        });
}

function setEventListeners_typographies() {
    
    // This might not be necessary because we call setTypographies when reloading
    // window.onload = () => {
    //     setTypographies();
    // }

    window.onresize = () => {
        setTypographies();
    }
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


typographiesMain();