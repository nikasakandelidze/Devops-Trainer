class Branch{
    constructor(branchName) {
        this.branchName=branchName;
        this.commits = [];
    }

    getBranchName(){
        return this.branchName;
    }

    getCommits(){
        return this.commits;
    }

    addCommit(newCommit){
        this.commits.push(newCommit)
    }
}