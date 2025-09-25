console.log("Hello from pagemanager.js");


const pageManager = {
    pages: {
        "START_MENU": [
            ".topSection__leftSection",
            ".bottomSection__leftSection__startMenu",
            ".bottomSection__rightSection__startMenu"
        ],
        "QUESTION": [
            ".bottomSection__leftSection__question",
            ".bottomSection__rightSection__question"
        ],
        "SCORE": [
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
    }
}

pageManager.setPage(5);