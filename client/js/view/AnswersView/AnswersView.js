class AnswersView {
    constructor() {
    }

    toggleContainerDisplayWithId() {
        let displayStyle = document.querySelector(`#${id}`);
        if (displayStyle.style.display === 'none') {
            displayStyle.style.display = 'block';
        } else {
            displayStyle.style.display = 'none';
        }
    }

    toggleCorrectAnswerResponse() {
        this.toggleContainerDisplayWithId('correct_response');
    }

    toggleIncorrectAnswerResponse() {
        this.toggleContainerDisplayWithId('incorrect_response');
    }


    resetAnswerAndDescriptionToBlur(){
        document.querySelector('#answer_hint_container').style.filter = 'blur(20px)';
        document.querySelector('#description_hint_container').style.filter = 'blur(20px)';

    }
}