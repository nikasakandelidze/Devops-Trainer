let store = (function(questionStore){

    let getNextQuestion = () => {
        let nextQuestion = questionStore.getCurrentQuestionAndIncrementCurrentQuestionIndex();
        return {...nextQuestion};
    };

    let isInputtedCommandCorrect = command =>{
        console.log(questionStore.getCurrentQuestion().answer)
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