
class Controller {
    constructor(store, view) {
        this.store = store;
        this.view = view;
        this.initialiseEventListeners();
        this.updateInitialView();
    }

    initialiseEventListeners() {
        this.initialiseWelcomeWindow();
        this.initialiseNextQuestionButtonListener();
        this.initialiseSubmitAnswerButtonListener();
        this.initialiseGetHintButtonListener();
        this.initialiseUnblurClickableContainers();
        this.initialiseHintModalWindowCross();
        this.initialiseSideMenuButton();
        this.initialiseSideSideMenuFreestyleRouterbutton();
        this.initialiseSideSideMenuTrainerRouterbutton();
    }

    updateInitialView () {
        let currentQuestion = this.store.getCurrentQuestion();
        this.view.updateQuestion(currentQuestion.question)
    }


    getNextQuestion() {
        this.store.getNextQuestion();
        view.updateQuestion(this.store.getCurrentQuestion().question);
        view.resetAnswerAndDescriptionToBlur();
        view.makeElementWithIdApear('unblur_answer_container');
        view.makeElementWithIdApear('unblur_description_container');
    }

    initialiseNextQuestionButtonListener() {
        document.querySelector("#next_question_button").addEventListener('click', e => {
            this.getNextQuestion();
        });
    }

    initialiseSubmitAnswerButtonListener() {
        document.querySelector("#answer_submit_button").addEventListener('click', e => {
            let userInputtedCommand = document.querySelector("#console_input").textContent;
            view.goToNextLineOnConsole();
            let isInputCorrect = this.store.isInputtedCommandCorrect(userInputtedCommand);
            if (isInputCorrect) {
                view.toggleCorrectAnswerResponse();
                this.getNextQuestion();
            } else {
                view.toggleIncorrectAnswerResponse();
            }
            setTimeout(() => {
                isInputCorrect ? view.toggleCorrectAnswerResponse() : view.toggleIncorrectAnswerResponse();
            }, 1000)
        });
    }

    initialiseGetHintButtonListener() {
        document.querySelector("#question_hint_button").addEventListener('click', e => {
            view.toggleCurrentQuestionHint(this.store.getCurrentQuestion());
        });
    }

    initialiseUnblurClickableContainers() {
        this.setFilterStyleToNoneOfContainerWithid('unblur_answer_container', 'answer_hint_container', 'unblur_answer_container');
        this.setFilterStyleToNoneOfContainerWithid('unblur_description_container', 'description_hint_container', 'unblur_description_container');
    }

    initialiseHintModalWindowCross() {
        document.querySelector('#close_modal_window').addEventListener('click', e => {
            view.toggleCurrentQuestionHint(this.store.getCurrentQuestion());
        });
    }

    initialiseWelcomeWindow() {
        this.view.makeElementWithIdApear('welcome_container');
        document.querySelector('#close_welcome_window').addEventListener('click', e => {
            this.view.makeElementWithIdDissapear('welcome_container');
            this.view.toggleBlurForBodyElement();
        });
        document.querySelector('#welcome_continue_button').addEventListener('click', e => {
            this.view.makeElementWithIdDissapear('welcome_container');
            this.view.toggleBlurForBodyElement();
        })
        this.view.welcomePageTyperAnimation();
    }

    setFilterStyleToNoneOfContainerWithid(toClickId, toUnnblurId, clickableElementId) {
        document.querySelector(`#${toClickId}`).addEventListener('click', e => {
            this.view.unblurElementWithId(toUnnblurId);
            this.view.makeElementWithIdDissapear(clickableElementId);
        });
    };


    initialiseSideMenuButton() {
        document.querySelector('#sidebar_menu_button').addEventListener('click', e => {
            this.view.toggleContainerDisplayWithId('side_bar_menu');
        });
        document.querySelector('#close_side_bar').addEventListener('click', e => {
            this.view.toggleContainerDisplayWithId('side_bar_menu');
        });
    }

    initialiseSideSideMenuFreestyleRouterbutton() {
        view.addOnClickListenerToSideMenuFreeStyleRouter(() => {
            document.querySelector('#main_git_trainer_container').style.display = 'none';
            document.querySelector('#git_freestyle_container').style.display = 'block';
        });
    }

    initialiseSideSideMenuTrainerRouterbutton() {
        view.addOnClickListenerToTrainerRouter(() => {
            document.querySelector('#main_git_trainer_container').style.display = 'block';
            document.querySelector('#git_freestyle_container').style.display = 'none';
        });
    }


}