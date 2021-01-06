class CommitsStore {
    constructor() {
        this.commits = [];
    }

    addCommit = (newCommit) => {
        this.commits.push(newCommit);
    }

    getListOfCommits = () => {
        return this.commits;
    }
}