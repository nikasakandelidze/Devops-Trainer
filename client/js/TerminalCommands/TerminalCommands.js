class TerminalCommands {

    constructor(createNewFileCallback, listAllFilesCallback, gitAddFileWithNameCallback) {
        this.createNewFileCallback = createNewFileCallback;
        this.listAllFilesCallback = listAllFilesCallback;
        this.gitAddFileWithNameCallback = gitAddFileWithNameCallback;
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
        }
    }
}