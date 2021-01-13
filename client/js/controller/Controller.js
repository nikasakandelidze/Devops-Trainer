
class Controller {
    constructor(store, view) {
        this.store = store;
        this.view = view;
        this.terminalCommandEngine=new TerminalCommands(
            (fileName, fileContent)=>{
                this.store.addNewFile(fileName, fileContent);
                this.view.updateFreestyleFilesView(this.store.getAllFiles(), (fileName) => this.store.getContentOfFileWithName(fileName));
            },
            ()=>this.store.getAllFiles(),
            (fileNamesArray) => {
                this.store.stageFileWithName(fileNamesArray);
                this.view.updateFreestyleFilesView(this.store.getAllFiles(), (fileName) => this.store.getContentOfFileWithName(fileName));
            },
            (commitMessage) => {
                this.store.commitStagedFiles(commitMessage);
                this.view.updateFreestyleFilesView(this.store.getAllFiles(), (fileName) => this.store.getContentOfFileWithName(fileName));
                view.updateFreeStyleBranchesView(this.store.getBranchesOfSession());
            },
            (fileName) => {
                let content = this.store.getContentOfFileWithName(fileName);
                this.view.viewFileContent(content, fileName);
            }
        );
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
        view.updateFreeStyleBranchesView(this.store.getBranchesOfSession())
        view.updateFreestyleFilesView(this.store.getAllFiles(), (fileName) => this.store.getContentOfFileWithName(fileName));
        view.initialiseFreeStyleConsoleInput((input)=>this.terminalCommandEngine.processAppropriateCommand(input));
        view.initaliseFileContentEditorSaveButton( (content, fileName) => this.store.saveContentToFileWithName(content, fileName) );
        view.initialiseFreeStyleInputNavigation();
    }

    async updateInitialView () {
        let currentQuestion = await this.store.getCurrentQuestion();
        this.view.updateQuestion(currentQuestion.question);
    }

    getNextQuestion() {
        this.store.getNextQuestion()
            .then(currentQuestion => {
                view.updateQuestion(currentQuestion.question);
                view.resetAnswerAndDescriptionToBlur();
                view.makeElementWithIdApear('unblur_answer_container');
                view.makeElementWithIdApear('unblur_description_container');
            })
    }


}