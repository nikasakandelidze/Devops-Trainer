let controller = (function (model,view){

    let initialiseNextQuestionButtonListener = () => {
        document.querySelector("#next_question_button").addEventListener('click', e => {
            let nextQuestion = model.getNextQuestion();
            view.updateQuestion(nextQuestion.question);
        });
    }

    let initialiseSubmitAnswerButtonListener = () => {
        document.querySelector("#answer_submit_button").addEventListener('click', e => {
            let userInputtedCommand = document.querySelector("#console_input").value;
            let isInputCorrect = model.isInputtedCommandCorrect(userInputtedCommand);
            isInputCorrect ? view.toggleCorrectAnswerResponse() : view.toggleIncorrectAnswerResponse();
            setTimeout(()=>{
                isInputCorrect ? view.toggleCorrectAnswerResponse() : view.toggleIncorrectAnswerResponse();
            },1000)
        });
    }

    let initialiseEventListeners = () => {
        initialiseNextQuestionButtonListener();
        initialiseSubmitAnswerButtonListener();
    }

    //Api
    return {
        init : () => {
            initialiseEventListeners();
            view.updateQuestion(model.getAllQuestions[0].question)
        }
    };
})(model,view);