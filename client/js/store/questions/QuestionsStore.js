let questionsStore = (function(){

    let indexOfCurrentQuestion = 0;

    //These are hardcoded questionsStore. we can fetch from some API these questionsStore later
    let questions = [new Question('We want to stage all changed files, what should we do?', 'git add .', 'blablabla'),
        new Question('We have staged all changes, and want to commit what should we do?', 'git commit -m ""', 'ddddd'),
        new Question('We wewe?', 'a', 'ddddd')]

    let goToNextQuestion = () => {
        (indexOfCurrentQuestion === questions.length - 1) ? indexOfCurrentQuestion = 0 : indexOfCurrentQuestion++;
    };

    let getCurrentQuestionAndIncrementCurrentQuestionIndex = () => {
        let currentQuestion = questions[indexOfCurrentQuestion];
        goToNextQuestion();
        return {...currentQuestion};
    };

    let getCurrentQuestion = () => {
        return {...questions[indexOfCurrentQuestion]};
    };

    //Api
    return {
        getAllQuestions : [...questions],
        getCurrentQuestion : getCurrentQuestion,
        getCurrentQuestionAndIncrementCurrentQuestionIndex : getCurrentQuestionAndIncrementCurrentQuestionIndex
    }
})();