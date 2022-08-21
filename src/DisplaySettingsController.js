const themes = {
    normalTheme: {
        primaryColour: "#75cbf3",
        secondaryColour: "#ff8f00",
        textColour: "black",
        toolbarBgColour: "white",
        backgroundColour: "#f9f9f9",
        colCursorColour: "black",
        player1Colour: "red",
        player2Colour: "yellow",
        turnIndicatorColour: "#cccccc",
    },
    darkTheme: {
        primaryColour: "purple",
        secondaryColour: "yellow",
        textColour: "white",
        toolbarBgColour: "#777",
        backgroundColour: "black",
        colCursorColour: "#777",
        player1Colour: "blue",
        player2Colour: "green",
        turnIndicatorColour: "#777",
    },
};

const toggleDarkTheme = (isDarkTheme) => {
    const theme = isDarkTheme ? 
    themes["darkTheme"] : themes["normalTheme"]
    for (const themeProp in theme) {
        document.documentElement.style.setProperty(`--${themeProp}`, `${theme[themeProp]}`);
    }
}

export { toggleDarkTheme };

