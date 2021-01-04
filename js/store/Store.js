class Store {
    constructor(questionStore, sessionStore) {
        this.sessionStore = sessionStore;
        this.questionStore = questionStore;
    }

    getNextQuestion(){
        let nextQuestion = this.questionStore.getCurrentQuestionAndIncrementCurrentQuestionIndex();
        return {...nextQuestion};
    }

    isInputtedCommandCorrect(command){
        return command===this.questionStore.getCurrentQuestion().answer;
    }

    getCurrentQuestion(){
        return this.questionStore.getCurrentQuestion();
    }
}