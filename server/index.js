const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 3010;

const entries = [];

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.listen(port, function () { console.log('listening on ', port) })

app.use(express.static('public'))

//To render the home page.
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {

    const newEntry = {
        "id": "0202",
        "name": req.body.name,
        "quote": req.body.quote
    }
    entries.push(newEntry);
    res.redirect('/');

})

app.put('/quotes', (req, res) => {
    let updateEntry = entries.find((entry) => { return (entry.name === 'yoda') });

    if (updateEntry) {
        updateEntry.name = req.body.name;
        updateEntry.quote = req.body.quote;
    }

})

app.delete('/quotes', (req, res) => {
    console.log("delete: ",req.body);
    
})

//All Entries
app.get('/entries', function (req, res) {
    res.send(entries);
})