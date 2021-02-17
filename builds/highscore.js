




const ScoresList = document.getElementById('ScoresList');

const highScores =JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);
ScoresList.innerHTML  = highScores.map(score=>{
  return   `<h3>${score.name} = ${score.score} points</h3> ` }).join("");




	
