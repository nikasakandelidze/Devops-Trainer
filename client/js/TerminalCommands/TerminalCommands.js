class TerminalCommands {

    constructor(createNewFileCallback, listAllFilesCallback, stageFileWithNameCallback, commitStagedFilesCallback) {
        this.createNewFileCallback = createNewFileCallback;
        this.listAllFilesCallback = listAllFilesCallback;
        this.gitAddFileWithNameCallback = stageFileWithNameCallback;
        this.commitStagedFilesCallback = commitStagedFilesCallback;
    }

    getAppropriateCommand(inputCommand){
        if(inputCommand.includes('cat')){
            let array=inputCommand.split(" ");
            this.createNewFileCallback(array[1], '');
        }else  if(inputCommand==='ls'){
            this.listAllFilesCallback();
        }else  if(inputCommand.includes('git add')){
            let arrayOfFileNamesToGitAdd = inputCommand.split(" ").slice(2);
            this.gitAddFileWithNameCallback(arrayOfFileNamesToGitAdd)
        }else if (inputCommand.includes('git commit -m ')){
            let commitMessage= inputCommand.split(" ")[3];
            this.commitStagedFilesCallback(commitMessage);
        }
    }
}