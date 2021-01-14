class FreeStyleView {
    constructor() {
        this.openfileName = '';
    }

    updateFreestyleFilesView(filesArray, getFileContentCallback){
        let listItems = document.querySelector('#freestyle_files_listing');
        listItems.innerHTML = '';
        filesArray.map(file => {
            let newListItem = document.createElement('div');
            newListItem.addEventListener('click', e => {
                this.viewFileContent(getFileContentCallback(file.getFileName()), file.getFileName());
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


    viewFileContent(fileContent, fileName){
        this.openfileName = fileName;
        document.querySelector('#file_content_editor').value = fileContent;
        document.querySelector('#file_content_editor_container').style.display = 'block';
        document.querySelector('#file_content_editor').focus();
    }

    initaliseFileContentEditorSaveButton(saveFileContentCallback){
        document.querySelector('#file_content_save').addEventListener('click', e => {
            saveFileContentCallback(document.querySelector('#file_content_editor').value, this.openfileName);
            document.querySelector('#file_content_editor_container').style.display = 'none';
        })
    }


    initialiseFreeStyleConsoleInput(callbackFn){
        let element = document.querySelector('#user_input_freestyle');
        element.addEventListener('submit', e => {
            e.preventDefault();
            callbackFn(document.querySelector('#console_input_freestyle').value);
            view.processTerminalInput('console_input_freestyle', 'freestyle_history_of_inputs');
        })
        element.focus();
    }


    getListOfFileNamesInCommit(commit){
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


    updateFreeStyleBranchesView(branchesArray){
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
                newCommitElement.appendChild(this.createImageElement());
                parent.appendChild(newCommitElement);
                newCommitElement.addEventListener('click', e => {
                    if (isDetailsCardVisible) {
                        newCommitElement.removeChild(newCommitElement.lastChild);
                        isDetailsCardVisible = false;
                    } else {
                        let commitDetailsCard = document.createElement('div');
                        commitDetailsCard.appendChild(this.createCommitDetailsElement(commit));
                        commitDetailsCard.classList.add('commit_detail_card');
                        newCommitElement.appendChild(commitDetailsCard);
                        isDetailsCardVisible = true;
                    }
                })
            });
            parentContainerForBranches.appendChild(parent);
        });
    }


    createCommitDetailsElement(commit){
        let commitDetails = document.createElement('div');
        let commitHash = document.createElement('h3');
        commitHash.innerText = 'Hash: ' + commit.getHash();
        let commitMessage = document.createElement('h5');
        commitMessage.innerText = "Message: " + commit.getMessage();
        commitDetails.appendChild(commitHash);
        commitDetails.appendChild(commitMessage);
        commitDetails.appendChild(this.getListOfFileNamesInCommit(commit));
        return commitDetails;
    }

    createImageElement(){
        let newCommitLogo = document.createElement('img');
        newCommitLogo.src = '../../client/statics/circle.svg';
        newCommitLogo.width = 60;
        newCommitLogo.height = 60;
        return newCommitLogo;
    }

    initialiseFreeStyleConsoleSizeChangerButton(id, elementId){
        let element = document.querySelector(`#${id}`).addEventListener('click', e=>{
            let inputContaienr = document.querySelector(`#${elementId}`);
            if(inputContaienr.style.display==='none'){
                inputContaienr.style.display='block';
            }else{
                inputContaienr.style.display='none';
            }
        });
    };

    initialiseFreeStyleInputNavigation(){
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
        this.initialiseFreeStyleConsoleSizeChangerButton('change_window_size_button','user_input');
        this.initialiseFreeStyleConsoleSizeChangerButton('change_freestyle_window_size_button','freestyle_body');
    }
}