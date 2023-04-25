import { activateMagicBall, magicBallSetup } from './magic8ball.js';

await magicBallSetup("magic_config.json");

const answerDestination = document.getElementById('answer');
const magicBall = document.getElementById('magic-ball');
const questionForm = document.forms['questionForm'];

questionForm.addEventListener('submit', async function(event){
  event.preventDefault();
  answerDestination.textContent = 'Hmm...'
  
  await activateMagicBall(magicBall, answerDestination);
});