   

   const question =document.getElementById("question");
const choices =Array.from(document.getElementsByClassName("choice-text"));
 const progressText =document.getElementById('progressText');
 var scoreText =document.getElementById('score');
 const progressBarFull =document.getElementById('progressBarFull');
 const loader =document.getElementById('loader');
 const game =document.getElementById('game');
 let currentquestion;
 let acceptingAnswers=true;
 let score =0;
 let questionCounter;
 let availableQuestions =[];


let questions =[];
/*fetch(
	"https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
	   )
.then(function (res){
	return res.json();
})
.then(function(loadedQuestions){
	console.log(loadedQuestions.results);
	//questions =loadedQuestions;
	//startGame();
})
.catch(function (err){
	console.error(err);
});*/

// let questions = [
//           {
//           	question:"inside which html element do we put the javascript?",
//           	choice1:"<script>",
//           	choice2:"<script>",
//           	choice3:"<script>",
//           	choice4:"<script>",
//             answer: 1   

            
//           },
//           {
//             question: "what is the correct syntax for refering to an enternal script called 'xxx.js'?",
//           	choice1:"<script href ='xxx.js'>",
//           	choice2:"<script name ='xxx.js'>",          
//           	choice3:"<script src ='xxx.js'>",
//           	choice4:"<script file ='xxx.js'>",

//             answer: 1   
            
//           },

//           {
//           	question:"how do you write hello world in an alert box?",
//           	choice1:"msgbox('hello world');",
//           	choice2:"alertBox('hello world');",
//           	choice3:"msg('hello world');",
//           	choice4:"alert('hello world');",
//             answer: 1   

            
//           },

//     ];


 

//const url ="https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

// console.log(url);

   fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then((response) => {
    return response.json();
  })
  .then((data) => {
         	console.log(data.results);
			  data.results.map(loadedQuestion=>{
         		const formattedQuestion={
         			question: loadedQuestion.question
         		};
         		const answerChoices =[...loadedQuestion.incorrect_answers]; 
         		formattedQuestion.answer= Math.floor(Math.random() * 3) + 1;
         		answerChoices.splice(
         			formattedQuestion.answer - 1,
         			0,
				 loadedQuestion.correct_answer);
				  answerChoices.push(loadedQuestion.correct_answer);
         		answerChoices.forEach((choice, index) => {
         			formattedQuestion["choice" + (index+1)] = choice;
				  });
				//   return formattedQuestion;  
			 questions.push(formattedQuestion);
			//  console.log(questions);
				  	
			 });

			

			 startGame();
         })
         .catch(err=>{
         	console.error(err);
		 })
		 
		

//constants

		const CORRECT_BONUS =10;
		const MAX_QUESTIONS =3;
		
		function startGame () {
		questionCounter =0;
			score=0;
			availableQuestions =[...questions];
		setTimeout(()=>{

		getNewQuestion();
		
		
		game.classList.remove("hidden");
		loader.classList.add("hidden");
		},500);
		
			
		};
		function getNewQuestion (){
			if (availableQuestions.length==0 |questionCounter >= MAX_QUESTIONS ){
			// console.log(availableQuestions);
			// console.log(MAX_QUESTIONS);
			   localStorage.setItem("mostRecentScore",score);
				return window.location.assign("end.html");
			}
			// console.log("this is maxquestions");
			// console.logquestionCounter);
			// console.log(MAX_QUESTIONS);
			progressText.innerText ="question :" + questionCounter + "/" + MAX_QUESTIONS;
			 
			
			const questionIndex = Math.floor(Math.random() * availableQuestions.length);
		currentquestion =availableQuestions[questionIndex];
	
		question.innerText =currentquestion.question;
		choices.forEach( choice => {

		const number = choice.dataset['number'];
		choice.innerText = currentquestion['choice' + number];
		});
		availableQuestions.splice(questionIndex, 1);
		acceptingAnswers=true;
		};
		choices.forEach(choice=>{
			choice.addEventListener("click",e=>{
				if (!acceptingAnswers)return;
				acceptingAnswers = false;
				const selectedChoice =e.target;
				const selectedAnswer =selectedChoice.dataset["number"];
				var classToApply = 'incorrect';
				if(selectedAnswer==currentquestion.answer)
				{
					classToApply = 'correct';
					incrementScore (CORRECT_BONUS);

					}
					
					incrementCounter();
				selectedChoice.parentElement.classList.add(classToApply);
				setTimeout(()=>{


				selectedChoice.parentElement.classList.remove(classToApply);
				
						getNewQuestion();
					},1000);
					
		});
			});
		incrementScore = (num) =>{
			score += num ;
			scoreText.innerText =score;
		}
			incrementCounter=()=>{
				questionCounter++;
			 progressText.innerText ="question :" + questionCounter + "/" + MAX_QUESTIONS;
		}

		startGame();


