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

    commitFiles(commitMessage) {
        this.commitsStore.addCommit(new Commit("randomHash", commitMessage, [...this.files]));
        this.files=this.files.filter(e=>!e.getIsStaged())
    }

    addNewFile(fileName, fileContent){
        this.files.push(new GitFile(fileName, fileContent));
    }

    getFileContentOfFileWithName(fileName){
        return this.files.filter(e=>e===fileName).getFileContent();
    }

    getFiles(){
        return [...this.files];
    }
}