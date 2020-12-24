let model = (function(questions){
    let currentQuestionObject = questions.getAllQuestions[0];

    let getNextQuestion = () => {
        let nextQuestion = questions.getCurrentQuestionAndIncrementCurrentQuestionIndex();
        currentQuestionObject = nextQuestion;
        return nextQuestion;
    };

    let isInputtedCommandCorrect = command =>{
        return command===currentQuestionObject.answer;
    };

    //Api
    return {
        getAllQuestions : questions.getAllQuestions,
        getNextQuestion : getNextQuestion,
        isInputtedCommandCorrect:isInputtedCommandCorrect
    };
})(questions);