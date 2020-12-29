class Commit {
    constructor(hash,message) {
        this.hash=hash;
        this.message=message;
    }

    getMessage(){
        return this.message;
    }

    getHash(){
        return this.hash;
    }
}