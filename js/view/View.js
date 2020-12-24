let view = (function(){


    let updateQuestion = question => document.querySelector('#actual_question').innerHTML = question;

    let toggleCorrectAnswerResponse = () => showUpResponseContainerWithId('correct_response')

    let toggleIncorrectAnswerResponse = () => showUpResponseContainerWithId('incorrect_response')

    let showUpResponseContainerWithId = id =>{
        console.log(id)
        let displayStyle = document.querySelector(`#${id}`);
        if(displayStyle.style.display==='none'){
            displayStyle.style.display='block';
        }else{
            displayStyle.style.display='none';
        }
    }

    //Api
    return {
        updateQuestion : updateQuestion,
        toggleCorrectAnswerResponse : toggleCorrectAnswerResponse,
        toggleIncorrectAnswerResponse : toggleIncorrectAnswerResponse
    };
})();