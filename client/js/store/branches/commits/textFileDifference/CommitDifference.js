class CommitDifference{
    constructor(fileName, text) {
        this.fileName=fileName;
        this.text=text;
    }

    getText(){
        return this.text;
    }

    getFileName(){
        return this.fileName;
    }
}
