let questionsStore = (function(){

    let indexOfCurrentQuestion = 0;

    //These are hardcoded questionsStore. we can fetch from some API these questionsStore later
    let questions = [{ question:'We want to stage all changed files, what should we do?', answer:'git add .' , description:'blablabla'},
        { question:'We have staged all changes, and want to commit what should we do?', answer:'git commit -m ""', description:'dddd' }];

    let goToNextQuestion = () => {
        (indexOfCurrentQuestion >= questions.length - 1) ? indexOfCurrentQuestion=0 : indexOfCurrentQuestion++;
        console.log(indexOfCurrentQuestion);
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