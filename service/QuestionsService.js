const express = require('express')
const app = express()
const port = 5000
const Question = require('./Question.js')

let questions = [new Question(0,'We want to stage all changed files, what should we do?', 'git add .', 'git-add - Add file contents to the index'),
            new Question(1,'We have staged all changes, and want to commit what should we do?', 'git commit -m', 'Record changes to the repository'),
            new Question(2,'How do you revert a commit that has already been pushed and made public?', 'git revert HEAD~2..HEAD', 'One or more commits can be reverted through the use of git revert. This command, in essence, creates a new commit with patches that cancel out the changes introduced in specific commits'),
          new Question(3,'How do you find a list of files that has changed in a particular commit?', 'git diff-tree -r {hash}', 'Given the commit hash, this will list all the files that were changed or added in that commit'),
          new Question(4,'How do you cherry-pick a merge commit?', 'git cherry-pick -m', 'Cherry-pick uses a diff to find the difference between branches. As a merge commit belongs to a different branch, it has two parents and two changesets.')];


app.get('/api/questions' ,(req , res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(questions);
})


app.get('/api/questions/:id', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let id = req.params.id;
  if(id>questions.length) id = id%questions.length;
  let question = questions.find(e=>{
    return e.getId() == id;
  });
  res.send(question);
})

app.listen(port , () => {
  console.log(`listening on port ${port}`);
})
