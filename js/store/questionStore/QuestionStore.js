class QuestionStore {

    constructor() {

        this.indexOfCurrentQuestion = 0;

        //These are hardcoded questionsStore. we can fetch from some API these questionsStore later
        this.questions = [new Question('We want to stage all changed files, what should we do?', 'git add .', 'blablabla'),
            new Question('We have staged all changes, and want to commit what should we do?', 'git commit -m ""', 'ddddd'),
            new Question('We wewe?', 'a', 'ddddd')];

    }

    getCurrentQuestionAndIncrementCurrentQuestionIndex() {
        let currentQuestion = this.questions[this.indexOfCurrentQuestion];
        (this.indexOfCurrentQuestion === this.questions.length - 1) ? this.indexOfCurrentQuestion = 0 : this.indexOfCurrentQuestion++;
        return {...currentQuestion};
    }

    getCurrentQuestion() {
        return this.questions[this.indexOfCurrentQuestion];
    }
}