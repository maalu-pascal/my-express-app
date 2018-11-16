const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 3010;

const entries = [];
const data = {
    "roomDetails": [
        {
            'id': '00201',
            'name': 'Ada',
            'booked': [],
        },
        {
            'id': '00202',
            'name': 'Babage',
            'booked': []
        },
        {
            'id': '00203',
            'name': 'Neuman',
            'booked': []
        },
        {
            'id': '00204',
            'name': 'Pascal',
            'booked': []
        },
        {
            'id': '00205',
            'name': 'Turing',
            'booked': []
        }
    ],
    "roomBookings": [],
    "users": [
        {
            "id": "0101",
            "name": "Maalu",
            "bookings":[]
        },
        {
            "id": "0102",
            "name": "Lida",
            "bookings":[]
        },
        {
            "id": "0103",
            "name": "Alan",
            "bookings":[]
        },
        {
            "id": "0104",
            "name": "Akshay",
            "bookings":[]
        },
    
    ]
};

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

app.post('/new-booking-test', (req, res) => {

    const user = data.users.find((user)=>{ return(user.name.toUpperCase === req.body.userName.toUpperCase)})
    const room = data.roomDetails.find((room) => { return (room.name === req.body.room) });
    let newEntry = {};

    if (room && user) {
        newEntry = {
            "id": `id-${new Date().getTime()}`,
            "userId": user.id,
            "roomId": room.id,
            "from": req.body.from,
            "to": req.body.to,
            "date":`${new Date()}`
        }
        data.roomBookings.push(newEntry);
        room.booked.push(newEntry.id);
        user.bookings.push(newEntry.id);
    }
    console.log("data : ",data);
    
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
    console.log("delete: ", req.body);

})

//All Entries
app.get('/entries', function (req, res) {
    res.send(entries);
})

//All datas
app.get('/data', function (req, res) {
    res.send(data);
})