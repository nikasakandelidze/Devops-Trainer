
let questionStore = new QuestionsApiAdapter();

let sessionStore = new FreestyleSessionStore();

let rootStore = new Store(questionStore, sessionStore);

let controller = new Controller(rootStore, view);

makeItemWithIdDraggable('user_input_container');

makeItemWithIdDraggable('freestyle_input_container');