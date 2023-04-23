/**
 * @fileoverview provides functionality for magic 8 ball behaviors
 * includes shaking, providing answers in both text and voice
 */

let answerAudio;
let answerText;
let shakeTransformations;
let answerAudioPlaying = null;

const answerTextLocation = `answers.txt`;
const answerAudioLocation = `./audio/answers/`;

/*
all transforms for the shake effect : 
    [ delay, translateX, rotate ]
*/
const shakeTransformValues = [  
    [0, 40, 40], [150, -40, -40], 
    [300, 30, 30], [450, -30, -30], 
    [600, 20, 20], [750, -20, -20], 
    [900, 10, 10], [1050, -10, -10], 
    [1200, 5, 5], [1350, -5, -5], 
    [1750, 0, 0]
]

/**
 * given a file location of `answer\nanswer` form, loads them
 * and loads matching audio files
 * 
 * @param {string} textLocation (exact location of single file)
 * @param {string} audioLocation (folder location)
 */
function loadAnswerData(textLocation, audioLocation){
    fetch(textLocation)
    .then(Response => Response.text())
    .then(data => {
        answerText = data.split('\n');
        answerAudio = answerText.map(answer => new Audio(`${audioLocation}${answer}.mp3`));
    });
}

/**
 * given the (d)elay, translate(x) and (r) rotate values for the transform,
 * maps them into transformations
 * 
 * @param {array} shakeTransformArray (where to get d,x,r from)
 */
function loadTransformations(shakeTransformArray){
    shakeTransformations = 
        shakeTransformArray.map(([d, x, r]) => 
            ({ t: `translateX(${x}px) rotate(${r}deg)`, d })
        );
}

/**
 * Given a thing to shake, starts shaking and promises to finish
 * 
 * @param {element} element (expected to be the 8 ball object)
 * @returns a promise that all the shaking will be done
 */
async function promiseShakeTransformations(element) {
    const shakePromises = 
        shakeTransformations.map(({ t, d }) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    element.style.transform = t;
                    resolve();
                }, d);
            })
        )
    return Promise.all(shakePromises);
}

/**
 * @param {number} range (exclusive) 
 * @returns {number} between 0 and (range - 1)
 */
function randomChoice (range){
    return Math.floor(Math.random() * range);    
}

/**
 * given an answer index, stops currently playing answer
 * and starts the new one
 * 
 * @param {number} whichAnswer is assumed to be an index 
 * in answerAudio.length range
 */
function playAnswerAudio(whichAnswer){
    if (answerAudioPlaying) {
        answerAudioPlaying.pause()
    }

    let newAnswerAudio = answerAudio[whichAnswer];
    newAnswerAudio.currentTime = 0;
    newAnswerAudio.play();
    answerAudioPlaying = newAnswerAudio;
}

/**
 * given an element to pass the answer to, picks a random index
 * of the answer list, plays its associated audio, grabs the text
 * and sends it off
 * 
 * @param {element} answerDestination (what to give the text line to)
 */
function generateAnswer(answerDestination) {
    let answerIndex = randomChoice(answerText.length);
    playAnswerAudio(answerIndex);

    let answerResult = answerText[answerIndex];
    answerDestination.textContent = answerResult;    
}

/** 
 * exported to give ball activation command control
 * 
 * Given an element to be shaken and a place to send an answer, shakes
 * the magic eight ball and (after shaking stops) defers to generateAnswer
 * 
 * @param {element} ball (the element to be shaken)
 * @param {node} answerDestination (where to send the answer text)
 */
export async function activateMagicBall(ball, answerDestination) {
    await promiseShakeTransformations(ball);    
    generateAnswer(answerDestination);
}

/**
 * exported so parent can control timing of answer audio file load
 * load time could be impacted if size grows (currently fine at <500kb)
 */
export function magicBallSetup (){    
    loadAnswerData(answerTextLocation, answerAudioLocation);
    loadTransformations(shakeTransformValues);
}