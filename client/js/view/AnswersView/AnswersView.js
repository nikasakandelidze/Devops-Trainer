let answersView =(function (){
    let toggleContainerDisplayWithId = id => {
        let displayStyle = document.querySelector(`#${id}`);
        if (displayStyle.style.display === 'none') {
            displayStyle.style.display = 'block';
        } else {
            displayStyle.style.display = 'none';
        }
    }

    let toggleCorrectAnswerResponse = () => toggleContainerDisplayWithId('correct_response')

    let toggleIncorrectAnswerResponse = () => toggleContainerDisplayWithId('incorrect_response')

    let resetAnswerAndDescriptionToBlur = () => {
        document.querySelector('#answer_hint_container').style.filter = 'blur(20px)';
        document.querySelector('#description_hint_container').style.filter = 'blur(20px)';

    };

    return {
        toggleIncorrectAnswerResponse : toggleIncorrectAnswerResponse,
        toggleCorrectAnswerResponse : toggleCorrectAnswerResponse,
        resetAnswerAndDescriptionToBlur : resetAnswerAndDescriptionToBlur
    }
})();