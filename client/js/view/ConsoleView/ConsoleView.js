let consoleView = (function (){

    let goToNextLineOnConsole = () => {
        document.querySelector("#console_input").textContent +='\n>' ;
    }

    return {
        goToNextLineOnConsole : goToNextLineOnConsole
    };
})();