const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const PORT = 3000;


server.use(express.static('public')); // Serve static files from the 'public' directory
server.listen(PORT, function () {
    console.log(`listening at http://localhost:${PORT}`);
});

function updateHitCount() {         // Function to update hit count
    const filePath = 'hits.txt';
    let hits = 0;
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        hits = parseInt(data);
    }
    hits++;
    fs.writeFileSync(filePath, hits.toString());
    return hits;

}
//Api endpoint that returns info on how man visits the page has had
server.get('/hits', (req, res) => {
    const hits = updateHitCount();
    res.json({hitCount:hits});
})

function getWordOfTheDay() {
    const filePath = 'allwords.txt';
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split ('\n'); // Split the file into lines
        const randomLine = lines[Math.floor(Math.random() * lines.length)]; // Select a random line
        const parts = randomLine.split('\t'); // Split the line into word and definition
        const [word, part, definition] = randomLine.split('\t');
        return { word:word, part:part, definition:definition };
    }
}
server.get('/wordRequest', (req, res) => {
    const wordData = getWordOfTheDay();
    res.json(wordData);
}
 // Endpoint to get the word of the day
    


// Endpoint to get hit count

// To run this file, use the command: node index.js
// Then open your browser and go to: http://localhost:3000/hello
// You should see "Hello World" displayed in your browser.
// To stop the server, go back to your terminal and press Ctrl + C
);  
