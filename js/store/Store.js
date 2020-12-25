let store = (function(questionStore){

    let getNextQuestion = () => {
        let nextQuestion = questionStore.getCurrentQuestionAndIncrementCurrentQuestionIndex();
        return {...nextQuestion};
    };

    let isInputtedCommandCorrect = command =>{
        return command===questionStore.getCurrentQuestion().answer;
    };

    let getAllQuestions =  () => questionStore.getAllQuestions;

    //Api
    return {
        getAllQuestions :getAllQuestions,
        getNextQuestion : getNextQuestion,
        getCurrentQuestion : questionStore.getCurrentQuestion,
        isInputtedCommandCorrect : isInputtedCommandCorrect
    };
})(questionsStore);