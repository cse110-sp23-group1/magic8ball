/**
 * @fileoverview provides functionality for magic 8 ball behaviors
 * includes shaking, providing answers in both text and voice
 */

let config; // loaded from magic_config.json in fetchConfig

let currentCharacter; // the currently selected character
let answerAudioPlaying = null; // the currently playing answer audio line

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
function getTransformations(){
    return config.shakeTransformValues.map(([d, x, r]) => 
                ({ t: `translateX(${x}px) rotate(${r}deg)`, d }));
}

/**
 * updates currentCharacter with provided, or default
 * sets magic-ball to character image
 * 
 * @param {string} character (which to get)
 */
function setCharacter(character){
    currentCharacter = (character) ? character : config.defaultCharacter;

    document.getElementById('magic-ball').src = config.characters[currentCharacter].image;
}

/**
 * sets up / cleans up for shaking in promiseShakeTransformations
 * 
 * @param {element} element (to be set/reset for shaking)
 */
function shakeSetup(element){
    // staged
}
function shakeTeardown(element){
    element.style.removeProperty('transform');
}

/**
 * Apply a transformation to the given element.
 * 
 * @param {element} element
 * @param {string} transform
 */
function applyTransform(element, transform) {
    element.style.transform = transform;
}

/**
 * Set a timeout for applying a transformation to an element.
 * 
 * @param {element} element (the thing)
 * @param {string} transform (to do this to)
 * @param {number} duration (for this long)
 * @returns {Promise}
 */
function setTimeoutForTransform(element, transform, duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            applyTransform(element, transform);
            resolve();
        }, duration);
    });
}

/**
 * returns transformation shake promises by getting the transforms
 * and applying their timeouts
 * 
 * @param {element} element (a thing to promise to shake)
 * @returns {Array<Promise>} (promises to do those shakes)
 */
function generateShakePromises(element) {
    return getTransformations().map(({ t, d }) =>
        setTimeoutForTransform(element, t, d)
    );
}

/**
 * Given a thing to shake, starts shaking and promises to finish
 * 
 * @param {element} element (expected to be the 8 ball object)
 * @returns a promise that all the shaking will be done
 */
async function promiseShakeTransformations(element) {
    const shakePromises = generateShakePromises(element);
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
 * stops currently playing answer
 */
function stopCurrentAnswer() {
    if (answerAudioPlaying) {
        answerAudioPlaying.pause()
    }
}

/**
 * given an audio, sets its position to 0.
 * this is necessary because we use `pause` for compatibility
 * and it (`pause`) maintains the position
 * 
 * @param {audio} audio 
 */
function resetAudioPosition(audio){
    audio.currentTime = 0;
}

/**
 * given an line, stops currently playing answer gets the next one
 * and plays it
 * 
 * @param {string} line is what to look for in character voicelines
 * in answerAudio.length range
 */
function playAnswerAudio(line){
    stopCurrentAnswer();

    let answerAudio = getFreshVoiceLine(line);
    answerAudio.play();

    answerAudioPlaying = answerAudio;
}
/**
 * given a line to play, gets it, resets it, and gives it back
 * 
 * @param {string} line (the line to find voice for)
 * @returns {audio}
 */
function getFreshVoiceLine(line){
    let voiceLine = getVoiceLineFromText(line);
    let freshAnswerAudio = getAudio(voiceLine);
    resetAudioPosition(freshAnswerAudio);
    return freshAnswerAudio
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
    const voiceLineLocation = config.characters[character].voiceLines[line]
    return voiceLineLocation
}

/**
 * Get a random answer index from the config.
 * 
 * @returns {number} Random index
 */
function getRandomAnswerIndex() {
    return randomChoice(config.textAnswers.length);
}

/**
 * Generate a random answer from the config.
 * 
 * @returns {string} Random answer
 */
function selectRandomAnswer() {
    const randomIndex = getRandomAnswerIndex();
    const textLine = getTextLineFromIndex(randomIndex);
    return textLine
}

/**
 * Update the answer destination with the given answer.
 * 
 * @param {element} answerDestination
 * @param {string} answer
 */
function updateAnswerDestination(answerDestination, answer) {
    answerDestination.textContent = answer;
}

/**
 * Generate an answer and update the answer destination.
 * 
 * @param {element} answerDestination
 */
function generateAnswer(answerDestination) {
    const answer = selectRandomAnswer();
    playAnswerAudio(answer);
    updateAnswerDestination(answerDestination, answer);
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
}
