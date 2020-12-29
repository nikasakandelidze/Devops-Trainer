let commitsStore = (function () {
    let commits = [];


    let addCommit = (newCommit) => {
        commits.push(newCommit);
    }

    let getListOfCommits = () => {
        return commits;
    }

    return {

        addCommit : addCommit,

        getListOfCommits : getListOfCommits
    }
})();