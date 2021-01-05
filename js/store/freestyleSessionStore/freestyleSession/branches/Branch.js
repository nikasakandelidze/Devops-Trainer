class Branch {
    constructor(branchName) {
        this.branchName = branchName;
        this.commitsStore = new CommitsStore();
        this.files=[new GitFile('file1','content')]
    }

    getBranchName() {
        return this.branchName;
    }

    getCommits() {
        return this.commitsStore.getListOfCommits();
    }

    stageFileWithName(fileNamesArray){
        this.files.filter(e=>fileNamesArray.includes(e.getFileName())).map(e=>e.setIsStaged(true));
    }

    commitFiles(commitMessage) {
        let stagedFiles = this.files.filter(e=>e.getIsStaged());
        this.commitsStore.addCommit(new Commit("randomHash", commitMessage, [...stagedFiles]));
        this.files=this.files.filter(e=>!e.getIsStaged())
    }

    addNewFile(fileName, fileContent){
        this.files.push(new GitFile(fileName, fileContent));
    }

    getFileContentOfFileWithName(fileName){
        return this.files.filter(e=>e.getFileName()===fileName).getFileContent();
    }

    getFiles(){
        return [...this.files];
    }
}