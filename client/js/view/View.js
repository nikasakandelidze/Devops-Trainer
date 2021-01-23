let answersView = new AnswersView();

let consoleView = new ConsoleView();

let questionsView = new QuestionsView();

let sideMenuView = new SideMenuView();

let freeStyleView = new FreeStyleView();

let view = (function () {

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
        document.querySelector("#user_input").addEventListener('submit', async e => {
            e.preventDefault();
            let userInputtedCommand = document.querySelector("#console_input").value;
            let isCorrect = await isInputCommandCorrect(userInputtedCommand);
            if (isCorrect) {
                view.toggleCorrectAnswerResponse();
                await getNextQuestion();
            } else {
                view.toggleIncorrectAnswerResponse();
            }
            setTimeout(() => {
                isCorrect ? view.toggleCorrectAnswerResponse() : view.toggleIncorrectAnswerResponse();
            }, 1000)
            processTerminalInput('console_input', 'history_of_inputs');
        });
    }

    let processTerminalInput = (inputId, listId) => {
        let userInputtedCommand = document.querySelector(`#${inputId}`).value;
        let newElement = document.createElement('div');
        newElement.innerHTML = '$ ' + userInputtedCommand;
        document.querySelector(`#${inputId}`).value = '';
        document.querySelector(`#${listId}`).appendChild(newElement);
    }

    let initialiseGetHintButtonListener = (getCurrentQuestion) => {
        document.querySelector("#question_hint_button").addEventListener('click', e => {
            view.toggleCurrentQuestionHint(getCurrentQuestion());
        });
    }

    let initialiseHintModalWindowCross = (getCurrentQuestion) => {
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
        makeElementWithIdApear('black_blur')

        function startUserSessionWithApp() {
            makeElementWithIdDissapear('welcome_container');
            toggleBlurForBodyElement();
            document.querySelector('#console_input').focus();
            // animateLeftPaddingOfElementWithId('sidebar_menu_button',  window.innerWidth, 50, -50, 'block');
            scaleElement(0, 1, 0.05, 'question_data', 'flex');
            scaleElement(0, 1, 0.02, 'user_input_container', 'block');
            animateLeftPaddingOfElementWithId('sidebar_menu_button', window.innerWidth, 10, -25, 'block')
                .then(e => console.log(e));
            makeElementWithIdApear('all_questions_toggler');
            makeElementWithIdApear('add_question_toggler');
            makeElementWithIdDissapear('black_blur');
        }

        document.querySelector('#close_welcome_window').addEventListener('click', e => {
            startUserSessionWithApp();
        });
        document.querySelector('#welcome_continue_button').addEventListener('click', e => {
            startUserSessionWithApp();
        })
        welcomePageTyper();

    }


    let initialiseSideMenuButton = () => {
        document.querySelector('#sidebar_menu_button').addEventListener('click', e => {
            toggleContainerDisplayWithId('side_bar_menu');
            changeOpacity(0, 1, 0.1, 'side_bar_menu');
            makeElementWithIdApear('black_blur')
            changeOpacity(0,0.3,0.01,'black_blur');
        });
        document.querySelector('#close_side_bar').addEventListener('click', e => {
            toggleContainerDisplayWithId('side_bar_menu');
            changeOpacity(1, 0, -0.1, 'side_bar_menu');
            makeElementWithIdDissapear('black_blur');
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

    let initialiseListAllQuestionsButton = (startFetchingCallback, stopFetching) => {
        let isStarted = false;
        document.querySelector('#all_questions_icon').addEventListener('click', e => {
            toggleContainerDisplayWithId('all_questions_modal');
            if (!isStarted) {
                startFetchingCallback();
                makeElementWithIdApear('black_blur');
                isStarted = true;
            } else {
                stopFetching();
                makeElementWithIdDissapear('black_blur');
                isStarted = false;
            }
        });
        document.querySelector('#close_all_questions').addEventListener('click', e=>{
            toggleContainerDisplayWithId('all_questions_modal');
            toggleContainerDisplayWithId('black_blur');
        });
    };

    let addQuestionIntoAllQuestionsModal = (question) => {
        let parent = document.querySelector('#all_questions_modal');
        let htmlDivElement = document.createElement('div');
        htmlDivElement.innerText = question.question;
        htmlDivElement.classList.add('question_list_entry');
        parent.appendChild(htmlDivElement);
    }

    let makeQuestionSubmitModalWindowListener = () => {
        document.querySelector('#add_question_button').addEventListener('click', e => {
            toggleContainerDisplayWithId('add_question_modal');
            toggleContainerDisplayWithId('black_blur');
        });
        document.querySelector('#add_question_close_button').addEventListener('click', e => {
            toggleContainerDisplayWithId('add_question_modal');
            toggleContainerDisplayWithId('black_blur');
        });
    };

    let submitNewQuestionButtonInit = (addQuestionCallback) => {
        document.querySelector('#submit_new_question_button').addEventListener('click', async e => {
            let tempQuestion = document.querySelector('#question_input').value;
            let tempAnswer = document.querySelector('#answer_input').value;
            let tempDescription = document.querySelector('#description_input').value;
            let a = {question: tempQuestion, answer: tempAnswer, description: tempDescription};
            makeElementWithIdDissapear('add_question_modal');
            toggleContainerDisplayWithId('black_blur');
            addQuestionCallback(a);
        });
    };

    let initAboutToggler = (getGithubInfo) => {
        document.querySelector('#about_page_toggler').addEventListener('click', async e => {
            makeElementWithIdApear('about_me_container');
            let githubInfo = await getGithubInfo();
            let element = document.querySelector('#my_github_projects');
            Array.from(githubInfo).forEach(e=>{
                let project = document.createElement('div');
                project.classList.add('proj_container')

                let name = document.createElement('div');
                name.innerText="Name:  "+ e.name;
                name.classList.add('proj_name_container')
                project.appendChild(name);

                let description = document.createElement('div');
                description.innerText="Description:  "+e.description;
                description.classList.add('proj_description_container');
                project.appendChild(description);

                let link = document.createElement('div');
                link.innerText="Link:  "+e['html_url'];
                link.classList.add('proj_link_container');
                project.appendChild(link);

                element.appendChild(project)
            });
        })

        document.querySelector('#close_about_me_button').addEventListener('click', e=>{
            toggleContainerDisplayWithId('about_me_container');
        });
    }



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
        toggleBlurForBodyElement: toggleBlurForBodyElement,
        toggleBlurForElementWithId: toggleBlurForElementWithId,
        toggleContainerDisplayWithId: toggleContainerDisplayWithId,
        welcomePageTyperAnimation: welcomePageTyper,
        goToNextLineOnConsole: consoleView.goToNextLineOnConsole,
        addOnClickListenerToSideMenuFreeStyleRouter: sideMenuView.addOnClickListenerToFreeStyleRouter,
        addOnClickListenerToTrainerRouter: sideMenuView.addOnClickListenerToTrainerRouter,
        initialiseNextQuestionButtonListener: initialiseNextQuestionButtonListener,
        initialiseSubmitAnswerButtonListener: initialiseSubmitAnswerButtonListener,
        initialiseGetHintButtonListener: initialiseGetHintButtonListener,
        initialiseHintModalWindowCross: initialiseHintModalWindowCross,
        initialiseUnblurClickableContainers: initialiseUnblurClickableContainers,
        initialiseWelcomeWindow: initialiseWelcomeWindow,
        initialiseSideMenuButton: initialiseSideMenuButton,
        initialiseSideSideMenuFreestyleRouterbutton: initialiseSideSideMenuFreestyleRouterbutton,
        initialiseSideSideMenuTrainerRouterbutton: initialiseSideSideMenuTrainerRouterbutton,
        updateFreeStyleBranchesView: freeStyleView.updateFreeStyleBranchesView,
        updateFreestyleFilesView: freeStyleView.updateFreestyleFilesView,
        initialiseFreeStyleConsoleInput: freeStyleView.initialiseFreeStyleConsoleInput,
        viewFileContent: freeStyleView.viewFileContent,
        initaliseFileContentEditorSaveButton: freeStyleView.initaliseFileContentEditorSaveButton,
        initialiseFreeStyleInputNavigation: freeStyleView.initialiseFreeStyleInputNavigation,
        listAllFilesInTerminal: (branch) => freeStyleView.listAllFilesInTerminal(branch),
        initialiseListAllQuestionsButton: (start, stop) => initialiseListAllQuestionsButton(start, stop),
        addQuestionIntoAllQuestionsModal: addQuestionIntoAllQuestionsModal,
        makeQuestionSubmitModalWindowListener: makeQuestionSubmitModalWindowListener,
        submitNewQuestionButtonInit: submitNewQuestionButtonInit,
        initAboutToggler:initAboutToggler
    };
})();