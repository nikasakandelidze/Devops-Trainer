
let questionStore = new QuestionsApiAdapter();

let sessionStore = new FreestyleSessionStore();

let githubAdapter = new GithubAdapter();

let rootStore = new Store(questionStore, sessionStore, githubAdapter);

let controller = new Controller(rootStore, view);

makeItemWithIdDraggable('user_input_container');

makeItemWithIdDraggable('freestyle_input_container');