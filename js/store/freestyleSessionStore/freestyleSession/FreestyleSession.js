class FreestyleSession {
    constructor() {
        let currentBranch = new Branch('master');
        this.branches = [currentBranch];
        this.currentBranch=currentBranch;
    }

    addBranchToSession(newBranch) {
        this.branches.push(newBranch);
    }

    getBranchesOfSession() {
        return this.branches;
    }

    getCurrentBranch(){
        return this.currentBranch;
    }

    createNewBranchInSessionWithName(branchName) {
        this.branches.push(new Branch(branchName));
    }

    getBranchWithTheName(branchName) {
        return this.branches.filter(e => e.getBranchName() === branchName);
    }

    checkoutBranchWithName(branchName){
        this.currentBranch = this.getBranchWithTheName(branchName)[0];
    }
}