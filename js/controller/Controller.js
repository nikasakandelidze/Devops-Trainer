let controller = (function (store,view){

    let getNextQuestion = () => {
        store.getNextQuestion();
        view.updateQuestion(store.getCurrentQuestion().question);
        view.resetAnswerAndDescriptionToBlur();
        view.makeElementWithIdApear('unblur_answer_container');
        view.makeElementWithIdApear('unblur_description_container');
    }

    let initialiseNextQuestionButtonListener = () => {
        document.querySelector("#next_question_button").addEventListener('click', e => {
           getNextQuestion();
        });
    }

    let initialiseSubmitAnswerButtonListener = () => {
        document.querySelector("#answer_submit_button").addEventListener('click', e => {
            let userInputtedCommand = document.querySelector("#console_input").textContent;
            view.goToNextLineOnConsole();
            let isInputCorrect = store.isInputtedCommandCorrect(userInputtedCommand);
            if (isInputCorrect){
                view.toggleCorrectAnswerResponse();
                getNextQuestion();
            } else{
                view.toggleIncorrectAnswerResponse();
            }
            setTimeout(()=>{
                isInputCorrect ? view.toggleCorrectAnswerResponse() : view.toggleIncorrectAnswerResponse();
            },1000)
        });
    }

    let initialiseGetHintButtonListener = () => {
        document.querySelector("#question_hint_button").addEventListener('click', e => {
            view.toggleCurrentQuestionHint(store.getCurrentQuestion());
        });
    }

    let initialiseUnblurClickableContainers = () => {
        setFilterStyleToNoneOfContainerWithid('unblur_answer_container', 'answer_hint_container', 'unblur_answer_container');
        setFilterStyleToNoneOfContainerWithid('unblur_description_container', 'description_hint_container', 'unblur_description_container');
    }

    let initialiseHintModalWindowCross = () => {
        document.querySelector('#close_modal_window').addEventListener('click', e => {
            view.toggleCurrentQuestionHint(store.getCurrentQuestion());
        });
    };

    let initialiseWelcomeWindow = () => {
        view.makeElementWithIdApear('welcome_container');
        document.querySelector('#close_welcome_window').addEventListener('click', e=>{
            view.makeElementWithIdDissapear('welcome_container');
            view.toggleBlurForBodyElement();
        });
        document.querySelector('#welcome_continue_button').addEventListener('click', e=>{
            view.makeElementWithIdDissapear('welcome_container');
            view.toggleBlurForBodyElement();
        })
        view.welcomePageTyperAnimation();
    };

    let setFilterStyleToNoneOfContainerWithid = (toClickId, toUnnblurId, clickableElementId) => {
        document.querySelector(`#${toClickId}`).addEventListener('click', e=>{
            view.unblurElementWithId(toUnnblurId);
            view.makeElementWithIdDissapear(clickableElementId);
        });
    };


    let initialiseSideMenuButton = () => {
        document.querySelector('#sidebar_menu_button').addEventListener('click', e=>{
            view.toggleContainerDisplayWithId('side_bar_menu');
        });
        document.querySelector('#close_side_bar').addEventListener('click', e=> {
            view.toggleContainerDisplayWithId('side_bar_menu');
        });
    }

    let initialiseSideSideMenuFreestyleRouterbutton = () => {
        view.addOnClickListenerToSideMenuFreeStyleRouter(()=>{
            document.querySelector('#main_git_trainer_container').style.display='none';
            document.querySelector('#git_freestyle_container').style.display='block';
            });
    }

    let initialiseSideSideMenuTrainerRouterbutton = () => {
        view.addOnClickListenerToTrainerRouter(()=>{
            document.querySelector('#main_git_trainer_container').style.display='block';
            document.querySelector('#git_freestyle_container').style.display='none';
        });
    }

    let initialiseEventListeners = () => {
        initialiseWelcomeWindow();
        initialiseNextQuestionButtonListener();
        initialiseSubmitAnswerButtonListener();
        initialiseGetHintButtonListener();
        initialiseUnblurClickableContainers();
        initialiseHintModalWindowCross();
        initialiseSideMenuButton();
        initialiseSideSideMenuFreestyleRouterbutton();
        initialiseSideSideMenuTrainerRouterbutton();
    }

    let updateInitialView = () => {
        let currentQuestion = store.getCurrentQuestion();
        console.log(store.getCurrentQuestion())
        view.updateQuestion(currentQuestion.question)
    }

    //Api
    return {
        init : () => {
            initialiseEventListeners();
            updateInitialView();
        }
    };
})(store,view);