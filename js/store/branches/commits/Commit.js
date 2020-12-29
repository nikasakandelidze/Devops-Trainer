class Commit {
    constructor(hash,message,commitDifference) {
        this.hash=hash;
        this.message=message;
        this.commitDifference=commitDifference;
    }

    getMessage(){
        return this.message;
    }

    getHash(){
        return this.hash;
    }

    getCommitDifference(){
        return this.commitDifference;
    }
}
