class Store {
    constructor(questionStore, sessionStore, githubAdapter) {
        this.sessionStore = sessionStore;
        this.questionStore = questionStore;
        this.githubAdapter = githubAdapter;
    }

    getNextQuestion(){
        return this.questionStore.goToNextQuestion();
    }

    isInputtedCommandCorrect(command){
        return this.questionStore.getCurrentQuestion().answer === command;
    }

    getCurrentQuestion(){
        return this.questionStore.getCurrentQuestion();
    }

    getBranchesOfSession(){
        return this.sessionStore.getSession().getBranchesOfSession();
    }

    getCurrentBranch(){
        return this.sessionStore.getSession().getCurrentBranch();
    }

    addNewFile(fileName, content){
        this.sessionStore.getSession().getCurrentBranch().addNewFile(fileName,content);
    }

    getAllFiles(){
        return this.sessionStore.getSession().getCurrentBranch().getFiles();
    }

    stageFileWithName(fileNamesArray){
        this.sessionStore.getSession().getCurrentBranch().stageFileWithName(fileNamesArray);
    }

    commitStagedFiles(commitMessage){
        this.sessionStore.getSession().getCurrentBranch().commitFiles(commitMessage);
    }

    getContentOfFileWithName(fileName){
        return this.sessionStore.getSession().getCurrentBranch().getFileContentOfFileWithName(fileName);
    }

    saveContentToFileWithName(content, fileName){
        this.sessionStore.getSession().getCurrentBranch().saveContentToFileWithName(content, fileName);
    }

    addNewBranchWithName(branchName){
        this.sessionStore.getSession().createNewBranchInSessionWithName(branchName);
    }

    checkoutBranchWithName(branchName){
        this.sessionStore.getSession().checkoutBranchWithName(branchName);
    }

    addNewQuestion(question){
        this.questionStore.addNewQuestion(question);
    }

    async getGithubInfo(){
        return await this.githubAdapter.getGithubInfo();
    }
}