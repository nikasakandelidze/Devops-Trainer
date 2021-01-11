module.exports = class Question{

    constructor(id ,question, answer, description) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.description = description;
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
