
let questionStore = new QuestionStore();

let sessionStore = new FreestyleSessionStore();

let rootStore = new Store(questionStore, sessionStore);

let controller = new Controller(rootStore, view);
