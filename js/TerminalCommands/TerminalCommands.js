class TerminalCommands {

    constructor(createNewFileCallback, listAllFilesCallback, stageFileWithNameCallback, commitStagedFilesCallback, editFileContentCallback, listFilesInTerminalCallback) {
        this.createNewFileCallback = createNewFileCallback;
        this.listAllFilesCallback = listAllFilesCallback;
        this.gitAddFileWithNameCallback = stageFileWithNameCallback;
        this.commitStagedFilesCallback = commitStagedFilesCallback;
        this.editFileContentcallback = editFileContentCallback;
        this.listFilesInTerminalCallback = listFilesInTerminalCallback;
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
        }else if(inputCommand==='git status'){
            this.listFilesInTerminalCallback();
        }
    }
}