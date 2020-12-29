class Question{

    constructor(question, answer, description) {
        this.question = question;
        this.answer = answer;
        this.description = description;
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