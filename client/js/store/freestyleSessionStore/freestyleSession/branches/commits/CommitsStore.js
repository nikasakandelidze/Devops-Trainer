class CommitsStore {
    constructor() {
        this.commits = [new Commit('123','asd','as'), new Commit('123','asd','as'), new Commit('123','asd','as')];
    }

    addCommit = (newCommit) => {
        this.commits.push(newCommit);
    }

    getListOfCommits = () => {
        return this.commits;
    }
}