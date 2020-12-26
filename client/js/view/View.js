let view = (function (animations) {

    let updateQuestion = question => document.querySelector('#actual_question').innerHTML = question;

    let toggleCorrectAnswerResponse = () => toggleContainerDisplayWithId('correct_response')

    let toggleIncorrectAnswerResponse = () => toggleContainerDisplayWithId('incorrect_response')

    let toggleContainerDisplayWithId = id => {
        let displayStyle = document.querySelector(`#${id}`);
        if (displayStyle.style.display === 'none') {
            displayStyle.style.display = 'block';
        } else {
            displayStyle.style.display = 'none';
        }
    }

    let toggleCurrentQuestionHint = (hint) => {
        toggleContainerDisplayWithId('hint_modal_container');
        let hintInfo = document.querySelector('#hint_text');
        let hintDescription = document.querySelector('#hint_description');
        hintInfo.innerHTML = hint.answer;
        hintDescription.innerHTML = hint.description;
    }

    let resetAnswerAndDescriptionToBlur = () => {
        document.querySelector('#answer_hint_container').style.filter = 'blur(20px)';
        document.querySelector('#description_hint_container').style.filter = 'blur(20px)';

    };

    let unblurElementWithId = (toUnnblurId) => {
        document.querySelector(`#${toUnnblurId}`).style.filter = 'none';
    }

    let makeElementWithIdDissapear = (id) => {
        document.querySelector(`#${id}`).style.display = 'none';
    }

    let makeElementWithIdApear = (id) => {
        document.querySelector(`#${id}`).style.display = 'block';
    }

    let toggleBlurForBodyElement = () => {
        let blurry = document.querySelector('body').style.filter;
        if (blurry === 'none') {
            document.querySelector('body').style.filter = 'blur(20px)';
        } else {
            document.querySelector('body').style.filter = 'none';
        }
    }

    let toggleBlurForElementWithId = (id) => {
        let blurry = document.querySelector(`#${id}`).style.filter;
        if (blurry === 'none') {
            document.querySelector(`#${id}`).style.filter = 'blur(20px)';
        } else {
            document.querySelector(`#${id}`).style.filter = 'none';
        }
    }

    //Api
    return {
        updateQuestion: updateQuestion,
        toggleCorrectAnswerResponse: toggleCorrectAnswerResponse,
        toggleIncorrectAnswerResponse: toggleIncorrectAnswerResponse,
        toggleCurrentQuestionHint: toggleCurrentQuestionHint,
        resetAnswerAndDescriptionToBlur: resetAnswerAndDescriptionToBlur,
        unblurElementWithId: unblurElementWithId,
        makeElementWithIdApear: makeElementWithIdApear,
        makeElementWithIdDissapear: makeElementWithIdDissapear,
        toggleBlurForBodyElement : toggleBlurForBodyElement,
        toggleBlurForElementWithId : toggleBlurForElementWithId,
        toggleContainerDisplayWithId : toggleContainerDisplayWithId
    };
})(animations);