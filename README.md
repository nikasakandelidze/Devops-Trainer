## General
	The project's general idea is about creating Training Web platform mainly consentrated about Devops topic.
	The main part of the trainer is visualizer part, each sub part of the main program has it's own visualizer mechanism.

	At the moment there's Git trainer present, it consists of 2 parts:
	- Question/Answer part
	- Free style part
	
	Project is fully written in vanilla javascript, without any framework like React or Angluar, the reason being for author to get more familliar with the Javascript language and get the fundamental idea of the inner workings web platforms. 	

## Detailed information about Git Trainer sub-program
	So as said above, Git trainer has 2 main parts, let's review them seperately to make everything explicit.
	
	Question/Answer part, which can be selected from the side Menu(As in picture (1)), is mainly about basic online trainer mechanism.
	There are questions generated, each question has 3 parts: 
	- Question itself
	- Answer
	- Description (So that trainee gets full information about the question)		
	Also trainee can add more questions( which will be stored in Memory), to later use it as training material.
	
	About interaction:
		Question appears in the bottom left container, next to it there are two successive buttons "Hint" and "Next", if user can't get the right answer for question he/she can use Hint button, which shows user pop-up window with Description of the answer and correct answer itself.
	User has custom Terminal like window( Which can be moved like in picture(3) ) accesible, where answers should be entered. 	
	User can also add new question by pressing appropriate button or see all the present questions by also pressing appropriate button for it.	


	Free style part, which can also be selected from the side Menu(As in pciture (2)), is more inovative and focuses on visualizing current state of branches, that appeared after following your input commands. Basically saying it is like real-life terminal with git installed
	About interaction:
		User has terminal window (Which can be moved like in picutre(3) ), this terminal container has 2 bars, first is command prompt itself and the second is current state of the file system of Git engine.
	 1) Terminal window supports next git commands(List will get reacher in the future):
		- git status   => See current status of the git tree.
		- cat {fileName}     => Create empty file
		- git add {fileName}  => Add file to staged state.
		- git commit -m "{CommitMessage}"  => Commit all Staged files
		- vi {fileName}	 => Edit file
		- git branch  => See current branch
		- git checkout -b {branchName}  => Create new branch with name {branchName}
		- git checkout {branchName}  => Checkout/Switch to the branch with specified name.

	2) File system window support mostly all functionalities specified in the first part:
		- User can see files of the current branch
		- User can see status of files(Staged or Unstaged)
		- User can interact with files/Edit them by pressing them.
		
	
	Commits of branches are visuallized on the main page of Freestyle project. They are partitioned by branches, each commit has it's own part(circle icon), upon pressing it pop-up window appers with detailed information about pressed commit.	
	
## Next steps
	Next step is to make Style of the Git trainer more robust and also add second sub-program for Docker trainer using images and container visualizations


## Link to Deployed env.
    Deployed env: https://nikasakandelidze.github.io/Devops-Trainer/
  
  
