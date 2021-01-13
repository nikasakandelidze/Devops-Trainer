let answersView = new AnswersView();

let consoleView = new ConsoleView();

let questionsView = new QuestionsView();

let sideMenuView = new SideMenuView();

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

    let initialiseFreeStyleConsoleSizeChangerButton = (id, elementId) => {
        let element = document.querySelector(`#${id}`).addEventListener('click', e=>{
            let inputContaienr = document.querySelector(`#${elementId}`);
            if(inputContaienr.style.display==='none'){
                inputContaienr.style.display='block';
            }else{
                inputContaienr.style.display='none';
            }
        });
    };

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
            getCurrentQuestion().then(e => {
                view.toggleCurrentQuestionHint(e);
            });
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

        function extracted() {
            makeElementWithIdDissapear('welcome_container');
            toggleBlurForBodyElement();
            document.querySelector('#console_input').focus();
            // animateLeftPaddingOfElementWithId('sidebar_menu_button',  window.innerWidth, 50, -50, 'block');
            scaleElement(0, 1, 0.05, 'question_data', 'flex');
            scaleElement(0, 1, 0.02, 'user_input_container', 'block');
        }

        document.querySelector('#close_welcome_window').addEventListener('click', e => {
            extracted();
        });
        document.querySelector('#welcome_continue_button').addEventListener('click', e => {
            extracted();
        })
        welcomePageTyper();

    }


    let initialiseSideMenuButton = () => {
        document.querySelector('#sidebar_menu_button').addEventListener('click', e => {
            toggleContainerDisplayWithId('side_bar_menu');
            changeOpacity(0, 1, 0.1, 'side_bar_menu');
        });
        document.querySelector('#close_side_bar').addEventListener('click', e => {
            toggleContainerDisplayWithId('side_bar_menu');
            changeOpacity(1, 0, -0.1, 'side_bar_menu');
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

    let initialiseFreeStyleInputNavigation = () => {
        function toggleNavelement(element) {
            let currentDisplay = element.style.display;
            if (currentDisplay === 'block') {
                element.style.display = 'none'
            } else {
                element.style.display = 'block';
            }
        }

        let filesElement = document.querySelector('#files_container');
        let inputElement = document.querySelector('#freestyle_user_input');

        document.querySelector('#console_navigation').addEventListener('click', e => {
            toggleNavelement(filesElement);
            toggleNavelement(inputElement);
        });

        document.querySelector('#file_system_navigation').addEventListener('click', e => {
            toggleNavelement(filesElement);
            toggleNavelement(inputElement);
        });
        initialiseFreeStyleConsoleSizeChangerButton('change_window_size_button','user_input');
        initialiseFreeStyleConsoleSizeChangerButton('change_freestyle_window_size_button','freestyle_body');
    }

    let updateFreeStyleBranchesView = (branchesArray) => {
        let parentContainerForBranches = document.querySelector('#freestyle_visualisation_container');
        parentContainerForBranches.innerHTML = '';
        branchesArray.map(branch => {
            let parent = document.createElement('div');
            parent.innerHTML = '';
            let parentHeading = document.createElement('h2');
            parentHeading.innerText = branch.getBranchName();
            parent.appendChild(parentHeading);
            parent.classList.add('branch_container')
            branch.getCommits().map(commit => {
                let isDetailsCardVisible = false;
                let newCommitElement = document.createElement('div');
                newCommitElement.classList.add('commit_element')
                let commitHash = document.createElement('h5');
                commitHash.innerText = 'Hash: ' + commit.getHash();
                newCommitElement.appendChild(commitHash)
                newCommitElement.appendChild(createImageElement());
                parent.appendChild(newCommitElement);
                newCommitElement.addEventListener('click', e => {
                    if (isDetailsCardVisible) {
                        newCommitElement.removeChild(newCommitElement.lastChild);
                        isDetailsCardVisible = false;
                    } else {
                        let commitDetailsCard = document.createElement('div');
                        commitDetailsCard.appendChild(createCommitDetailsElement(commit));
                        commitDetailsCard.classList.add('commit_detail_card');
                        newCommitElement.appendChild(commitDetailsCard);
                        isDetailsCardVisible = true;
                    }
                })
            });
            parentContainerForBranches.appendChild(parent);
        });
    }

    let createImageElement = () => {
        let newCommitLogo = document.createElement('img');
        newCommitLogo.src = '../../client/statics/circle.svg';
        newCommitLogo.width = 60;
        newCommitLogo.height = 60;
        return newCommitLogo;
    }

    let createCommitDetailsElement = (commit) => {
        let commitDetails = document.createElement('div');
        let commitHash = document.createElement('h3');
        commitHash.innerText = 'Hash: ' + commit.getHash();
        let commitMessage = document.createElement('h5');
        commitMessage.innerText = "Message: " + commit.getMessage();
        commitDetails.appendChild(commitHash);
        commitDetails.appendChild(commitMessage);
        commitDetails.appendChild(getListOfFileNamesInCommit(commit));
        return commitDetails;
    }

    let getListOfFileNamesInCommit = (commit) => {
        let list = document.createElement('div');
        let heading = document.createElement('h3');
        heading.innerText = 'Files';
        list.appendChild(heading);
        let listOfFilenames = document.createElement('ul');
        let fileNames = commit.getFileNamesOfCommit();
        fileNames.forEach(name => {
            let listItem = document.createElement('li');
            listItem.innerText = name;
            listOfFilenames.appendChild(listItem);
        });
        list.appendChild(listOfFilenames)
        return list;
    };

    let initialiseFreeStyleConsoleInput = (callbackFn) => {
        let element = document.querySelector('#user_input_freestyle');
        element.addEventListener('submit', e => {
            e.preventDefault();
            callbackFn(document.querySelector('#console_input_freestyle').value);
            processTerminalInput('console_input_freestyle', 'freestyle_history_of_inputs');
        })
        element.focus();
    }

    let openfileName = '';

    let viewFileContent = (fileContent, fileName) => {
        openfileName = fileName;
        document.querySelector('#file_content_editor').value = fileContent;
        document.querySelector('#file_content_editor_container').style.display = 'block';
        document.querySelector('#file_content_editor').focus();
    }

    let initaliseFileContentEditorSaveButton = (saveFileContentCallback) => {
        document.querySelector('#file_content_save').addEventListener('click', e => {
            saveFileContentCallback(document.querySelector('#file_content_editor').value, openfileName);
            document.querySelector('#file_content_editor_container').style.display = 'none';
        })
    }

    let updateFreestyleFilesView = (filesArray, getFileContentCallback) => {
        let listItems = document.querySelector('#freestyle_files_listing');
        listItems.innerHTML = '';
        filesArray.map(file => {
            let newListItem = document.createElement('div');
            newListItem.addEventListener('click', e => {
                viewFileContent(getFileContentCallback(file.getFileName()), file.getFileName());
            })
            let image = document.createElement('img');
            image.width = 30;
            image.height = 30;
            image.src = '../../client/statics/file.svg';
            if (file.getIsStaged()) {
                newListItem.classList.add('staged_container');
            } else {
                newListItem.classList.add('unstaged_container');
            }
            newListItem.classList.add('file_hover_class')
            newListItem.innerText = file.getFileName();
            newListItem.appendChild(image);
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
        updateFreeStyleBranchesView: updateFreeStyleBranchesView,
        updateFreestyleFilesView: updateFreestyleFilesView,
        initialiseFreeStyleConsoleInput: initialiseFreeStyleConsoleInput,
        viewFileContent: viewFileContent,
        initaliseFileContentEditorSaveButton: initaliseFileContentEditorSaveButton,
        initialiseFreeStyleInputNavigation: initialiseFreeStyleInputNavigation,
    };
})();