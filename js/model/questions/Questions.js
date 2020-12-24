let questions = (function(){

    let indexOfCurrentQuestion = 0;


    //These are hardcoded questions. we can fetch from some API these questions later
    let questions = [{ question:'We want to stage all changed files, what should we do?', answer:'git add .' },
        { question:'We have staged all changes, and want to commit what should we do?', answer:'git commit -m ""' }];

    let goToNextQuestion = () => {
        (indexOfCurrentQuestion >= questions.length - 1) ? indexOfCurrentQuestion=0 : indexOfCurrentQuestion++;
    }

    let getCurrentQuestionAndIncrementCurrentQuestionIndex = () => {
        let currentQuestion = questions[indexOfCurrentQuestion];
        goToNextQuestion();
        return currentQuestion;
    }

    //Api
    return {
        getAllQuestions : [...questions],
        getCurrentQuestionAndIncrementCurrentQuestionIndex : getCurrentQuestionAndIncrementCurrentQuestionIndex
    }
})();