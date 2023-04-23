import { activateMagicBall, magicBallSetup } from './magic8ball.js';

magicBallSetup();

const answerDestination = document.getElementById('answer');
const magicBall = document.getElementById('magic-ball');
const questionForm = document.forms['questionForm'];

questionForm.addEventListener('submit', async function(event){
  event.preventDefault();
  
  await activateMagicBall(magicBall, answerDestination);
});