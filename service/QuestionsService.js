const express = require('express')
const app = express()
const port = 5000
const Question = require('./Question.js')

let questions = [new Question(0,'We want to stage all changed files, what should we do?', 'git add .', 'blablabla'),
            new Question(1,'We have staged all changes, and want to commit what should we do?', 'git commit -m ', 'ddddd'),
            new Question(2,'We wewe?', 'a', 'ddddd')];


app.get('/api/questions' ,(req , res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(questions);
})


app.get('/api/questions/:id', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let id = req.params.id;
  let question = questions.find(e=>{
    return e.getId() == id;
  });
  res.send(question);
})

app.listen(port , () => {
  console.log(`listening on port ${port}`);
})
