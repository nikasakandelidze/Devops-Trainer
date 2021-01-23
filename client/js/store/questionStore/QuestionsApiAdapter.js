const questionServiceUri = 'http://localhost:5000/api/questions'

/*
    Notice that this adapter class was refactored due to problems with hosting nodejs service,
    Application was using questions adapter class to talk to REST api on nodejs, but refactored for in memory storage.
*/

class QuestionsApiAdapter {

    constructor() {
        this.indexOfCurrentQuestion = 0;
        this.questions = [new Question(0,'We want to stage all changed files, what should we do?', 'git add .', 'git-add - Add file contents to the index'),
            new Question(1,'We have staged all changes, and want to commit what should we do?', 'git commit -m', 'Record changes to the repository'),
            new Question(2,'How do you revert a commit that has already been pushed and made public?', 'git revert HEAD~2..HEAD', 'One or more commits can be reverted through the use of git revert. This command, in essence, creates a new commit with patches that cancel out the changes introduced in specific commits'),
            new Question(3,'How do you find a list of files that has changed in a particular commit?', 'git diff-tree -r {hash}', 'Given the commit hash, this will list all the files that were changed or added in that commit'),
            new Question(4,'How do you cherry-pick a merge commit?', 'git cherry-pick -m', 'Cherry-pick uses a diff to find the difference between branches. As a merge commit belongs to a different branch, it has two parents and two changesets.')];
        this.currentQuestion = this.questions[0];

        // this.currentQuestion=this._fetchQuestionWithId(this.indexOfCurrentQuestion);
    }

    goToNextQuestion() {
        this.indexOfCurrentQuestion += 1;
        // this.currentQuestion=this._fetchQuestionWithId(this.indexOfCurrentQuestion);
      this.currentQuestion=this.questions[this.indexOfCurrentQuestion];
        return this.currentQuestion;
    }

    getCurrentQuestion() {
        return this.currentQuestion;
    }

    addNewQuestion(question){
        this.questions.push(question);
        // let fetchResult = await fetch(questionServiceUri, {
        //     method:'POST',
        //     mode:'http://localhost',
        //     headers:{
        //         'Content-Type':'application/json',
        //         'Access-Control-Allow-Origin':'*'
        //     },
        //     body: JSON.stringify(question)
        // });
        // return fetchResult.json();
    }

    // async _fetchQuestionWithId(id) {
    //     return this.questions[id%this.questions.length];
    //     // let response = await fetch(questionServiceUri + `/${id}`);
    //     // if (response.ok) {
    //     //     return await response.json();
    //     // }
    //     // throw new Error('Cant fetch');
    // }
}