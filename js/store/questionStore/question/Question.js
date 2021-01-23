class Question{

    constructor(id,question, answer, description) {
        this.question = question;
        this.answer = answer;
        this.description = description;
        this.id = id;
    }

    getId(){
        return this.id;
    }

    getQuestion(){
        return this.question;
    }

    getAnswer(){
        return this.answer;
    }

    getDescription(){
        return this.description;
    }
}