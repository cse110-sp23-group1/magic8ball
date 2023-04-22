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
    }, 1500);
  }
  