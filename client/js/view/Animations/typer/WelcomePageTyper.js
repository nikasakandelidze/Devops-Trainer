let welcomePageAnimation = (function (typerEffect){

    let welcomePageTyper = () => {
        let welcomeMessage = 'This trainer was created as a final project of web development subject.\n' +
            '            Here\'s the link to : https://github.com/nikasakandelidze/VCS-Trainer \n' +
            '            \n' +
            '            \n' +
            '            \n' +
            '            Please don\'t judge extensively :)\n' +
            '            \n' +
            '            \n' +
            '            Enjoy your time in VCS trainer using GIT!\n' +
            '            \n' +
            '            \n' +
            '            Please press button below.';

        typerEffect.typerEffect(welcomeMessage, 'welcome_text', 35);
    }

    return {
        welcomePageTyper : welcomePageTyper
    }

})(typerEffect);

