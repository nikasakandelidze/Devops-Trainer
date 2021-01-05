class Commit {
    constructor(hash,message,filesOfCommit) {
        this.hash=hash;
        this.message=message;
        this.filesOfCommit=filesOfCommit;
    }

    getMessage(){
        return this.message;
    }

    getHash(){
        return this.hash;
    }

    getFilesOfCommit(){
        return this.filesOfCommit;
    }
}
