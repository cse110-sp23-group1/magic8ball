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
 * sets up / cleans up for shaking in promiseShakeTransformations
 * 
 * 'easyRider' is in magic.css
 * 
 * @param {element} element (to be set/reset for shaking)
 */
function shakeSetup(element){
    element.classList.add('easyRider');
}
function shakeTeardown(element){
    element.classList.remove('easyRider');
    element.style.removeProperty('transform');
}

/**
 * helper: given a transformation and an element to apply it to,
 * returns a promise to resolve when the transition completes
 * 
 * @param {element} element (what to apply the shake to)
 * @param {string} t (the transform values to use)
 * @returns {promise} (a promise to resolve once the shake transition ends)
 */
const applyTransitionTranform = (element, t) => {
    return new Promise((resolve) => {
        element.addEventListener("transitionend", resolve, { once: true });
        element.style.transform = t;
    });
}

/**
 * given an element, shakes it
 * 
 * @param {element} element (what to shake)
 * @returns a promise resolving when transforms complete
 */
async function promiseShakeTransformations(element) {
    for (const { t } of shakeTransformations) {
      await applyTransitionTranform(element, t);
    }
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
 * performShake manages conditions for the actual shaking events
 * 
 * @param {element} element (what to shake)
 */
async function performShake(element){
    shakeSetup(element);
    await promiseShakeTransformations(element);    
    shakeTeardown(element);
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
    await performShake(ball);
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