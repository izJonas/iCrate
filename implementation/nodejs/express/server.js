// Zum Verständnis: https://zellwk.com/blog/crud-express-mongodb/
console.log('May Node be with you')

// express Framework gets loaded first
const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

let db
let usersCollection8

const connectionString = 'mongodb+srv://icrate-admin:test@cluster0.sjlt1ts.mongodb.net/?retryWrites=true&w=majority'

const SetViewEngine = function () {
    // Set the pug view engine
    app.set('views', './views')
    app.set('view engine', 'pug')

}

SetViewEngine()

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        db = client.db('icrate')
        usersCollection = db.collection('users')
        AfterMongoConnect(usersCollection)
    })
    .catch(error => console.error(error))

const AfterMongoConnect = function (collectionToUse) {
    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(3000, function () {
        console.log('listening on 3000')
    })

    app.get('/', (req, res) => {

        // Load json collectionb
        const cursor = db.collection('users').find().toArray()
            .then(results => {
                console.log(results)
                res.render('index', { title: 'iCrate by impcat-zone', message: 'iCrate - Login required', userlist: results })
            })
            .catch(error => console.error(error))

    })

    app.post('/login', (req, res) => {
        collectionToUse.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
}
