const mongodb = require('mongodb')
    , axios = require('axios')
    , assert = require('assert')

const ENDPOINT = 'http://localhost:5000/'

var MongoClient = mongodb.MongoClient
var url = 'mongodb://ds147884.mlab.com:47884/heroku_4b10n3s4'

var connectToDatabase = function () {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(err, null)

            console.log('Connected to Quillio')
            resolve(db)
        })
    })
}

module.exports = {
    connectToDatabase
}