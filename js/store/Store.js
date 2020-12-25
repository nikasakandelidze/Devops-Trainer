let store = (function(questions){
    let currentQuestionObject = questions.getAllQuestions[0];

    let getNextQuestion = () => {
        let nextQuestion = questions.getCurrentQuestionAndIncrementCurrentQuestionIndex();
        currentQuestionObject = {...nextQuestion};
        // console.log(currentQuestionObject);
        return nextQuestion;
    };

    let isInputtedCommandCorrect = command =>{
        return command===currentQuestionObject.answer;
    };

    let getAllQuestions =  () => questions.getAllQuestions;

    let getCurrentQuestion = () => currentQuestionObject;

    //Api
    return {
        getAllQuestions :getAllQuestions,
        getNextQuestion : getNextQuestion,
        getCurrentQuestion : getCurrentQuestion,
        isInputtedCommandCorrect:isInputtedCommandCorrect
    };
})(questions);