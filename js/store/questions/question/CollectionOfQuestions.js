class CollectionOfQuestions {
    constructor(title) {
        this.title=title;
        this.questions=[ new Question('use git add .','git add .', 'wtf1'),
                         new Question('use git commit','git commit','wtf2')]
        this.branches = [ new Branch('master') ]
    }
}