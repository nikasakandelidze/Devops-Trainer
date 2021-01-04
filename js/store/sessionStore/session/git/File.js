class File {
    constructor(fileName, fileContent) {
        this.isStaged = false;
        this.name=fileName;
        this.content = fileContent;
    }

    getIsStaged(){
        return this.isStaged;
    }

    getFileName(){
        return this.name;
    }

    getFileContent(){
        return this.content;
    }

    setIsStaged(isStaged){
        this.isStaged=isStaged;
    }
}