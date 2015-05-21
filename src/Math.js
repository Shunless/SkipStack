var randomBoolean = [
    function(){
        return Math.random()<.5; // Readable, succint
    },

    function(){
        return !(Math.random()+.5|0); // (shortcut for Math.round)
    },

    function(){
        return !(+new Date()%2); // faux-randomness
    }
];

// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom() {
  return Math.random();
}
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
