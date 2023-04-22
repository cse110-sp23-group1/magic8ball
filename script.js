function handleKeyPress(e) {
  if (e.key === 'Enter') {
    shake();
  }
}

function shake() {
    let magicBall = document.getElementById('magic-ball');
    magicBall.style.transform = 'translateX(40px) rotate(40deg)';
    setTimeout(function() {
      magicBall.style.transform = 'translateX(-40px) rotate(-40deg)';
    }, 150);
    setTimeout(function() {
      magicBall.style.transform = 'translateX(30px) rotate(30deg)';
    }, 300);
    setTimeout(function() {
      magicBall.style.transform = 'translateX(-30px) rotate(-30deg)';
    }, 450);
    setTimeout(function() {
      magicBall.style.transform = 'translateX(20px) rotate(20deg)';
    }, 600);
    setTimeout(function() {
      magicBall.style.transform = 'translateX(-20px) rotate(-20deg)';
    }, 750);
    setTimeout(function() {
      magicBall.style.transform = 'translateX(10px) rotate(10deg)';
    }, 900);
    setTimeout(function() {
      magicBall.style.transform = 'translateX(-10px) rotate(-10deg)';
    }, 1050);
    setTimeout(function() {
      magicBall.style.transform = 'translateX(5px) rotate(5deg)';
    }, 1200);
    setTimeout(function() {
      magicBall.style.transform = 'translateX(-5px) rotate(-5deg)';
    }, 1350);
    setTimeout(function() {
      magicBall.style.transform = 'translateX(0) rotate(0)';
      let answers = [
        'It is certain', 
        'It is decidedly so', 
        'Without a doubt', 
        'Yes, definitely', 
        'You may rely on it', 
        'As I see it, yes', 
        'Most likely', 
        'Outlook good', 
        'Yes', 
        'Signs point to yes', 
        'Reply hazy, try again', 
        'Ask again later', 
        'Better not tell you now', 
        'Cannot predict now', 
        'Concentrate and ask again', 
        'Don\'t count on it', 
        'Outlook not so good', 
        'My sources say no', 
        'Very doubtful'
      ];
      let answer = answers[Math.floor(Math.random() * answers.length)];
      let answerBox = document.getElementById('answer');
      answerBox.textContent = answer;

      if (answer === 'It is certain') {
        let audio = new Audio('audio/It is certain.mp3');
        audio.play();
      }
      if (answer === 'It is decidedly so') {
        let audio = new Audio('audio/It is decidedly so.mp3');
        audio.play();
      }
      if (answer === 'Without a doubt') {
        let audio = new Audio('audio/Without a doubt.mp3');
        audio.play();
      }
      if (answer === 'Yes, definitely') {
        let audio = new Audio('audio/Yes defenitely.mp3');
        audio.play();
      }
      if (answer === 'You may rely on it') {
        let audio = new Audio('audio/You may rely on it.mp3');
        audio.play();
      }
      if (answer === 'As I see it, yes') {
        let audio = new Audio('audio/As I see it, yes.mp3');
        audio.play();
      }
      if (answer === 'Most likely') {
        let audio = new Audio('audio/Most likely.mp3');
        audio.play();
      }
      if (answer === 'Yes') {
        let audio = new Audio('audio/Yes.mp3');
        audio.play();
      }
      if (answer === 'Outlook good') {
        let audio = new Audio('audio/Outlook good.mp3');
        audio.play();
      }
      if (answer === 'Signs point to yes') {
        let audio = new Audio('audio/Signs point to yes.mp3');
        audio.play();
      }
      if (answer === 'Reply hazy, try again') {
        let audio = new Audio('audio/Reply hazy, try again.mp3');
        audio.play();
      }
      if (answer === 'Ask again later') {
        let audio = new Audio('audio/Ask again later.mp3');
        audio.play();
      }
      if (answer === 'Better not tell you now') {
        let audio = new Audio('audio/Better not tell you now.mp3');
        audio.play();
      }
      if (answer === 'Cannot predict now') {
        let audio = new Audio('audio/Cannot predict now.mp3');
        audio.play();
      }
      if (answer === 'Concentrate and ask again') {
        let audio = new Audio('audio/Concentrate and ask again.mp3');
        audio.play();
      }
      if (answer === 'Don\'t count on it') {
        let audio = new Audio('audio/Don\'t count on it.mp3');
        audio.play();
      }
      if (answer === 'Outlook not so good') {
        let audio = new Audio('audio/Outlook not so good.mp3');
        audio.play();
      }
      if (answer === 'My sources say no') {
        let audio = new Audio('audio/My sources say no.mp3');
        audio.play();
      }
      if (answer === 'Very doubtful') {
        let audio = new Audio('audio/Very doubtful.mp3');
        audio.play();
      }


    }, 1750);
  }
  