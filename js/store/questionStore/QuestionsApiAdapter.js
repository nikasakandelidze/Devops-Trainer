const questionServiceUri = 'http://localhost:5000/api/questions'

class QuestionsApiAdapter {

    constructor() {
        this.indexOfCurrentQuestion = 0;
        this.currentQuestion=this._fetchQuestionWithId(this.indexOfCurrentQuestion);
    }

    goToNextQuestion() {
        this.indexOfCurrentQuestion += 1;
        this.currentQuestion=this._fetchQuestionWithId(this.indexOfCurrentQuestion);
        return this.currentQuestion;
    }

    getCurrentQuestion() {
        return this.currentQuestion;
    }

    async _fetchQuestionWithId(id) {
        let response = await fetch(questionServiceUri + `/${id}`);
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Cant fetch');
    }
}