var names;
var order = 3;
var ngrams = {};
var grams = [];
var button;
var string = " ";

function preload() {
    names = loadStrings('"http://martijnjanschut.com/wp-content/uploads/2017/04/pokemon.txt');
}

function setup() {
    createCanvas(200,20)
    for (var j = 0; j < names.length; j++) {
        var txt = names[j];
        
        for (var i = 0; i <= txt.length - order; i++) {
            var gram = txt.substring(i, i + order);
            grams.push(gram);

            if (!ngrams[gram]) {
                ngrams[gram] = [];
            }
            
            ngrams[gram].push(txt.charAt(i + order));
        }
    }
    button = createButton("Who's that Pokémon?");
    button.mousePressed(markovIt);
}

function draw() {
    background(255);
    text(string, width/2 - width/4, height/2);
    button.mousePressed(markovIt);
}

function markovIt() {
    var currentGram = random(grams);
    var result = currentGram;
    for (var i = 0; i < random(20); i++) {
        var possibilities = ngrams[currentGram];
        if (!possibilities) {
            break;
        }
        var next = random(possibilities);
        result += next;
        var len = result.length;
        currentGram = result.substring(len - order, len);
    }
    
    string = "It's " + cap(result) + "!"
    return (string);
}

function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}