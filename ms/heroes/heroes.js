const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0];
const app = express();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const powers = [
  { id: 1, name: 'flying' },
  { id: 2, name: 'teleporting' },
  { id: 3, name: 'super strength' },
  { id: 4, name: 'clairvoyance'},
  { id: 5, name: 'mind reading' }
];

const heroes = [
  {
      id: 1,
      type: 'spider-dog',
      displayName: 'Cooper',
      powers: [1, 4],
      img: 'cooper.jpg',
      busy: false
  },
  {
      id: 2,
      type: 'flying-dogs',
      displayName: 'Jack & Buddy',
      powers: [2, 5],
      img: 'jack_buddy.jpg',
      busy: false
  },
  {
      id: 3,
      type: 'dark-light-side',
      displayName: 'Max & Charlie',
      powers: [3, 2],
      img: 'max_charlie.jpg',
      busy: false
  },
  {
      id: 4,
      type: 'captain-dog',
      displayName: 'Rocky',
      powers: [1, 5],
      img: 'rocky.jpg',
      busy: false
  }
];


app.get('/getDetails', (req, res) => {
    var fs = require('fs');
 
var contents = fs.readFileSync('D:/Omnia/ms/heroes/test.json', 'utf8');
console.log(contents);
  console.log('Returning heroes list');
  //res.send(heroes);
  res.type('json');
  res.send(contents);
});


app.get('/powers', (req, res) => {
  console.log('Returning powers list');
  res.send(powers);
});

app.put('/updateDetails',(req, res) => {
    //console.log(req.body);
    var des = req.body.description;
   //console.log(des);
    var fs = require('fs');
    let rawdata = fs.readFileSync('D:/Omnia/ms/heroes/test.json');
    let student = JSON.parse(rawdata);
    //console.log(student);
    student.description = des;
    //console.log(student.description);
    let data = JSON.stringify(student);
    fs.writeFileSync('D:/Omnia/ms/heroes/test.json', data);
    
    //successful
    console.log('Updated !!');
    var contents = fs.readFileSync('D:/Omnia/ms/heroes/test.json', 'utf8');
    res.send(contents);
    console.log(contents);

});

app.post('/hero/**', (req, res) => {
  const heroId = parseInt(req.params[0]);
  const foundHero = heroes.find(subject => subject.id === heroId);

  if (foundHero) {
      for (let attribute in foundHero) {
          if (req.body[attribute]) {
              foundHero[attribute] = req.body[attribute];
              console.log(`Set ${attribute} to ${req.body[attribute]} in hero: ${heroId}`);
          }
      }
      res.status(202).header({Location: `http://localhost:${port}/hero/${foundHero.id}`}).send(foundHero);
  } else {
      console.log(`Hero not found.`);
      res.status(404).send();
  }
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Heroes service listening on port ${port}`);
app.listen(port);