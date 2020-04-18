var firebase = require('firebase');

var express = require('express');



var ejs = require('ejs');

var bodyparser = require('body-parser');

var parser = bodyparser.urlencoded({ extended: false });

var app = express();

app.use('/assets', express.static('assets'));

app.set('view engine', 'ejs');

var firebaseConfig = {
    apiKey: "AIzaSyCg6sY_RNbIzmJfbL0gr3iXxhcid444-fY",
    authDomain: "product-details-24f53.firebaseapp.com",
    databaseURL: "https://product-details-24f53.firebaseio.com",
    projectId: "product-details-24f53",
    storageBucket: "product-details-24f53.appspot.com",
    messagingSenderId: "721213671834",
    appId: "1:721213671834:web:d9e9daef3069e979fb9223",
    measurementId: "G-8CRRY8SFZZ"
};
firebase.initializeApp(firebaseConfig);
var id = 1;
store = [];
store2 = []
datab = firebase.database();


var ref = datab.ref('Index');
ref.on('value', function(gotData, errData) {
    var p = gotData.val();
    console.log(p);
    id = p.index;
    console.log(id);
    store2 = []
    for (i = 0; i < id; i++) {
        console.log('Product' + i);
        var ref2 = datab.ref('Product' + i);
        ref2.on('value', function(data, erdata) {
            var h = data.val();
            console.log(h);
            store2.push(h);

        })
    }

});


app.get('/', function(req, res) {
    res.render('form')
});

app.post('/', parser, function(req, res) {

    var k = req.body;


    firebase.database().ref('Product' + id).set({
        Id: id,
        Name: req.body.name,
        Description: req.body.description,
        Price: req.body.price,
        Brand: req.body.company
    });
    id++;
    firebase.database().ref('Index').set({
        index: id
    });

    // store.push(req.body);
    console.log(store2);
    console.log(store2.length);
    res.redirect('/')
});
app.get('/list', function(req, res) {

    res.render('list', { store: store2 })
});
app.post('/list', parser, function(req, res) {
    p = req.body;
    console.log(p)
    p1 = p.p1;
    p2 = p.p2;
    comp = [];
    for (i = 0; i < store2.length; i++) {
        if (p1 == store2[i].Id || p2 == store2[i].Id) {
            comp.push(store2[i]);
        }
    }
    console.log(p1);
    console.log(store2[p1]);
    console.log(comp);
    //res.send(comp);
    p1 = 0;
    p2 = 1;
    res.render('compare', { p1: p1, p2: p2, store: comp })
})


app.listen('5000');
