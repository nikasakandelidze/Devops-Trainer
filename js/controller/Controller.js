
class Controller {
    constructor(store, view) {
        this.store = store;
        this.view = view;
        this.initialiseEventListeners();
        this.updateInitialView();
    }

    initialiseEventListeners() {
        view.initialiseWelcomeWindow();
        view.initialiseNextQuestionButtonListener(()=>this.getNextQuestion());
        view.initialiseSubmitAnswerButtonListener((command)=>this.store.isInputtedCommandCorrect(command), ()=> this.getNextQuestion());
        view.initialiseGetHintButtonListener(()=>this.store.getCurrentQuestion());
        view.initialiseUnblurClickableContainers();
        view.initialiseHintModalWindowCross(()=>this.store.getCurrentQuestion());
        view.initialiseSideMenuButton();
        view.initialiseSideSideMenuFreestyleRouterbutton();
        view.initialiseSideSideMenuTrainerRouterbutton();
        view.initialiseFreeStyleSession(this.store.getBranchesOfSession())
        view.initialiseFreestyleFilesView(this.store.getAllFiles());
    }

    updateInitialView () {
        let currentQuestion = this.store.getCurrentQuestion();
        this.view.updateQuestion(currentQuestion.question)
    }

    getNextQuestion() {
        this.store.getNextQuestion();
        view.updateQuestion(this.store.getCurrentQuestion().question);
        view.resetAnswerAndDescriptionToBlur();
        view.makeElementWithIdApear('unblur_answer_container');
        view.makeElementWithIdApear('unblur_description_container');
    }


}