let view = (function (animations, commitsView, questionsView, answersView, consoleView, sideMenuView) {

    let toggleContainerDisplayWithId = id => {
        let displayStyle = document.querySelector(`#${id}`);
        if (displayStyle.style.display === 'none') {
            displayStyle.style.display = 'block';
        } else {
            displayStyle.style.display = 'none';
        }
    }


    let unblurElementWithId = (toUnnblurId) => {
        document.querySelector(`#${toUnnblurId}`).style.filter = 'none';
    }

    let makeElementWithIdDissapear = (id) => {
        document.querySelector(`#${id}`).style.display = 'none';
    }

    let makeElementWithIdApear = (id) => {
        document.querySelector(`#${id}`).style.display = 'block';
    }

    let toggleBlurForBodyElement = () => {
        let blurry = document.querySelector('body').style.filter;
        if (blurry === 'none') {
            document.querySelector('body').style.filter = 'blur(20px)';
        } else {
            document.querySelector('body').style.filter = 'none';
        }
    }

    let toggleBlurForElementWithId = (id) => {
        let blurry = document.querySelector(`#${id}`).style.filter;
        if (blurry === 'none') {
            document.querySelector(`#${id}`).style.filter = 'blur(20px)';
        } else {
            document.querySelector(`#${id}`).style.filter = 'none';
        }
    }

    let initialiseNextQuestionButtonListener = (callbackFn) => {
        document.querySelector("#next_question_button").addEventListener('click', e => {
            callbackFn();
        });
    }

    let initialiseSubmitAnswerButtonListener = (isInputCommandCorrect, getNextQuestion) => {
        document.querySelector("#user_input").addEventListener('submit', e => {
            e.preventDefault();
            let userInputtedCommand = document.querySelector("#console_input").value;
            view.goToNextLineOnConsole();
            let isInputCorrect = isInputCommandCorrect(userInputtedCommand);
            if (isInputCorrect) {
                view.toggleCorrectAnswerResponse();
                getNextQuestion();
            } else {
                view.toggleIncorrectAnswerResponse();
            }

            let newElement = document.createElement('div');
            newElement.innerHTML = '$ '+userInputtedCommand;
            document.querySelector('#console_input').value='';
            document.querySelector('#history_of_inputs').appendChild(newElement);
            newElement.blur();
            setTimeout(() => {
                isInputCorrect ? view.toggleCorrectAnswerResponse() : view.toggleIncorrectAnswerResponse();
            }, 1000)
        });
    }

    let initialiseGetHintButtonListener = (getCurrentQuestion) => {
        document.querySelector("#question_hint_button").addEventListener('click', e => {
            view.toggleCurrentQuestionHint( getCurrentQuestion());
        });
    }

    let  initialiseHintModalWindowCross =(getCurrentQuestion) => {
        document.querySelector('#close_modal_window').addEventListener('click', e => {
            view.toggleCurrentQuestionHint(getCurrentQuestion());
        });
    }

    let setFilterStyleToNoneOfContainerWithid = (toClickId, toUnnblurId, clickableElementId) => {
        document.querySelector(`#${toClickId}`).addEventListener('click', e => {
            unblurElementWithId(toUnnblurId);
            makeElementWithIdDissapear(clickableElementId);
        });
    };

    let initialiseUnblurClickableContainers = () => {
        setFilterStyleToNoneOfContainerWithid('unblur_answer_container', 'answer_hint_container', 'unblur_answer_container');
        setFilterStyleToNoneOfContainerWithid('unblur_description_container', 'description_hint_container', 'unblur_description_container');
    }

    let initialiseWelcomeWindow = () => {
        makeElementWithIdApear('welcome_container');
        document.querySelector('#close_welcome_window').addEventListener('click', e => {
            makeElementWithIdDissapear('welcome_container');
            toggleBlurForBodyElement();
            document.querySelector('#console_input').focus();
        });
        document.querySelector('#welcome_continue_button').addEventListener('click', e => {
            makeElementWithIdDissapear('welcome_container');
            toggleBlurForBodyElement();
            document.querySelector('#console_input').focus();
        })
        animations.welcomePageTyper();
    }


    let initialiseSideMenuButton = () => {
        document.querySelector('#sidebar_menu_button').addEventListener('click', e => {
            toggleContainerDisplayWithId('side_bar_menu');
        });
        document.querySelector('#close_side_bar').addEventListener('click', e => {
            toggleContainerDisplayWithId('side_bar_menu');
        });
    }

    let initialiseSideSideMenuFreestyleRouterbutton = () => {
        view.addOnClickListenerToSideMenuFreeStyleRouter(() => {
            document.querySelector('#main_git_trainer_container').style.display = 'none';
            document.querySelector('#git_freestyle_container').style.display = 'block';
        });
    }

    let initialiseSideSideMenuTrainerRouterbutton = () => {
        view.addOnClickListenerToTrainerRouter(() => {
            document.querySelector('#main_git_trainer_container').style.display = 'block';
            document.querySelector('#git_freestyle_container').style.display = 'none';
        });
    }

    let initialiseFreeStyleSession = (branchesArray) => {
        let startx=30;
        let starty=50;
        branchesArray.map(branch=>{
            branch.getCommits().map(commit => {
                let canvasContext = document.querySelector('#canvas').getContext('2d');
                canvasContext.beginPath();
                canvasContext.arc(startx, starty, 10, 0, 2 * Math.PI);
                startx+=40;
                canvasContext.fillStyle='blue';
                canvasContext.fill( );
                canvasContext.fillText('#'+commit.getHash(),startx-50, starty+20);
            });
            starty+=10;
            startx=5;
        })
    }

    let initialiseFreestyleFilesView = (filesArray) => {
        filesArray.map(file => {
            let newListItem = document.createElement('li');
            newListItem.style.color = file.getIsStaged() ? 'green' : 'red';
            newListItem.innerHTML=file.getFileName();
            let listItems = document.querySelector('#list_of_files_container');
            listItems.appendChild(newListItem);
        })
    };

    //Api
    return {
        updateQuestion: questionsView.updateQuestion,
        toggleCorrectAnswerResponse: answersView.toggleCorrectAnswerResponse,
        toggleIncorrectAnswerResponse: answersView.toggleIncorrectAnswerResponse,
        toggleCurrentQuestionHint: questionsView.toggleCurrentQuestionHint,
        resetAnswerAndDescriptionToBlur: answersView.resetAnswerAndDescriptionToBlur,
        unblurElementWithId: unblurElementWithId,
        makeElementWithIdApear: makeElementWithIdApear,
        makeElementWithIdDissapear: makeElementWithIdDissapear,
        toggleBlurForBodyElement : toggleBlurForBodyElement,
        toggleBlurForElementWithId : toggleBlurForElementWithId,
        toggleContainerDisplayWithId : toggleContainerDisplayWithId,
        welcomePageTyperAnimation : animations.welcomePageTyper,
        goToNextLineOnConsole : consoleView.goToNextLineOnConsole,
        addOnClickListenerToSideMenuFreeStyleRouter :  sideMenuView.addOnClickListenerToFreeStyleRouter,
        addOnClickListenerToTrainerRouter :  sideMenuView.addOnClickListenerToTrainerRouter,
        initialiseNextQuestionButtonListener : initialiseNextQuestionButtonListener,
        initialiseSubmitAnswerButtonListener : initialiseSubmitAnswerButtonListener,
        initialiseGetHintButtonListener : initialiseGetHintButtonListener,
        initialiseHintModalWindowCross : initialiseHintModalWindowCross,
        initialiseUnblurClickableContainers : initialiseUnblurClickableContainers,
        initialiseWelcomeWindow : initialiseWelcomeWindow,
        initialiseSideMenuButton : initialiseSideMenuButton,
        initialiseSideSideMenuFreestyleRouterbutton : initialiseSideSideMenuFreestyleRouterbutton,
        initialiseSideSideMenuTrainerRouterbutton : initialiseSideSideMenuTrainerRouterbutton,
        initialiseFreeStyleSession : initialiseFreeStyleSession,
        initialiseFreestyleFilesView : initialiseFreestyleFilesView
    };
})(animations, branchView , questionsView, answersView, consoleView, sideMenuView);