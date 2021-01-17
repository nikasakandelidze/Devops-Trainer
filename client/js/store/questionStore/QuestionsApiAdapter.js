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

    async addNewQuestion(question){
        let fetchResult = await fetch(questionServiceUri, {
            method:'POST',
            mode:'http://localhost',
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(question)
        });
        return fetchResult.json();
    }

    async _fetchQuestionWithId(id) {
        let response = await fetch(questionServiceUri + `/${id}`);
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Cant fetch');
    }
}