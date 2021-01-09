


let animations = (function (welcomePageTyper) {

    let scaleElementToMaxWithInterval = (id) => {
        let initialScale = 1;

        let element = document.querySelector(`#${id}`);

       let a = () => {window.setInterval(() => {
            if ((initialScale === 1)) window.clearInterval(a)
            element.style.transform = `scale(${initialScale})`;
            initialScale += 0.1;
        }, 50)};

    };

    return {
        scaleElementToMaxWithInterval: scaleElementToMaxWithInterval,
        welcomePageTyper : welcomePageTyper.welcomePageTyper
    };
})(welcomePageAnimation);