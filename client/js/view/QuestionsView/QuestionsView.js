let questionsView = (function (){
    let updateQuestion = question => document.querySelector('#actual_question').innerHTML = question;


    let toggleCurrentQuestionHint = (hint) => {
        toggleContainerDisplayWithId('hint_modal_container');
        let hintInfo = document.querySelector('#hint_text');
        let hintDescription = document.querySelector('#hint_description');
        hintInfo.innerHTML = hint.answer;
        hintDescription.innerHTML = hint.description;
    }

    let toggleContainerDisplayWithId = id => {
        let displayStyle = document.querySelector(`#${id}`);
        if (displayStyle.style.display === 'none') {
            displayStyle.style.display = 'block';
        } else {
            displayStyle.style.display = 'none';
        }
    }

    return {
        updateQuestion : updateQuestion,
        toggleCurrentQuestionHint : toggleCurrentQuestionHint
    }
})();