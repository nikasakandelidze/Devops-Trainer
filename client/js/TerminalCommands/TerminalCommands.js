class TerminalCommands {

    constructor(createNewFileCallback, listAllFilesCallback, stageFileWithNameCallback, commitStagedFilesCallback, editFileContentcallback) {
        this.createNewFileCallback = createNewFileCallback;
        this.listAllFilesCallback = listAllFilesCallback;
        this.gitAddFileWithNameCallback = stageFileWithNameCallback;
        this.commitStagedFilesCallback = commitStagedFilesCallback;
        this.editFileContentcallback = editFileContentcallback;
    }

    processAppropriateCommand(inputCommand){
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
        }else if(inputCommand.includes('vi')){
            let fileName= inputCommand.split(" ")[1];
            this.editFileContentcallback(fileName);
        }
    }
}