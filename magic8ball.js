/**
 * @fileoverview provides functionality for magic 8 ball behaviors
 * includes shaking, providing answers in both text and voice
 */

let config;
let shakeTransformations;

let currentCharacter;
let answerAudioPlaying = null;

/**
 * populates config with values from the given json
 * 
 * @param {string} configLocation (where to look for json)
 */
async function fetchConfig(configLocation){
    const response = await fetch(configLocation);
    config = await response.json();
}

/**
 * turns a string location into a sound
 * 
 * @param {string} where (a path to sound)
 * @returns {Audio}
 */
function getAudio(where){
    return new Audio(`${where}`);
}

/**
 * looks in config for the (d)elay, translate(x) and (r) rotate values 
 * for the transform, then maps them into transformations
 */
function loadTransformations(){
    shakeTransformations = 
        config.shakeTransformValues.map(([d, x, r]) => 
            ({ t: `translateX(${x}px) rotate(${r}deg)`, d })
        );
}

/**
 * sets the magic-ball image to the provided character,
 * or johnny if no character is provided
 */
function setCharacter(character='johnny'){
    currentCharacter = character;
    document.getElementById('magic-ball').src = config.characters[character].image;
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
 * @param {string} line is what to look for in character voicelines
 * in answerAudio.length range
 */
function playAnswerAudio(line){
    if (answerAudioPlaying) {
        answerAudioPlaying.pause()
    }

    let newAnswerAudio = getAudio(config.characters[currentCharacter].voiceLines[line])
    newAnswerAudio.currentTime = 0;
    newAnswerAudio.play();
    answerAudioPlaying = newAnswerAudio;
}

/**
 * json getter function: index to text answer
 * 
 * @param {number} index (of the answer array to get)
 * @returns the answer
 */
function getTextLineFromIndex(index){
    return config.textAnswers[index]
}

/**
 * json getter function: string, optional character to voice location
 * 
 * @param {string} line (the string to look for in voice lines)
 * @param {string} character (optional parameter to choose character)
 * @returns {string} the voice line location
 */
function getVoiceLineFromText(line, character=currentCharacter){
    return config.characters[character][line]
}

/**
 * given an element to pass the answer to, picks an answer off
 * the answer list, plays its associated audio, and sends it off
 * 
 * 
 * 
 * @param {element} answerDestination (what to give the text line to)
 */
function generateAnswer(answerDestination) {
    const randomIndex = randomChoice(config.textAnswers.length);
    let answer = getTextLineFromIndex(randomIndex);
    playAnswerAudio(answer);

    answerDestination.textContent = answer;    
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
 * exported so config can be specified
 * 
 * setcharacter has been implemented in advance of a possible character change
 * feature, and currently defaults to johnny when called without a value
 */
export async function magicBallSetup (configLocation){
    await fetchConfig(configLocation);
    setCharacter();
    loadTransformations();
}