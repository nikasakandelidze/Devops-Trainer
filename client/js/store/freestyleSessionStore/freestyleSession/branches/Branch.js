class Branch {
    constructor(branchName) {
        this.branchName = branchName;
        this.commitsStore = new CommitsStore();
        this.files=[];
        this.randomHashCounter=1;
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
        this.commitsStore.addCommit(new Commit(this.randomHashCounter++, commitMessage, [...stagedFiles]));
        this.files=this.files.filter(e=>!e.getIsStaged())
    }

    addNewFile(fileName, fileContent){
        this.files.push(new GitFile(fileName, fileContent));
    }

    getFileContentOfFileWithName(fileName){
        return this.files.filter(e=>{
            return e.getFileName()===fileName;
        })[0].getFileContent();
    }

    saveContentToFileWithName(content, fileName){
        console.log(content + '  ' + fileName)
        this.files.filter(e=>e.getFileName()===fileName)[0].setContent(content);
    }

    getFiles(){
        return [...this.files];
    }
}