const axios  = require('axios')
    , qs     = require('qs')
    , chai   = require('chai')
    , ObjectId = require('mongodb').ObjectId
    , chaiAsPromised = require('chai-as-promised')

const connectToDatabase = require('../index').connectToDatabase
    , url = require('../index').ENDPOINT

chai.use(chaiAsPromised)

var assert = chai.assert
    , expect = chai.expect
    , should = chai.should()

var db = undefined

var createMeeting = function(emails, meetingName){
    return new Promise((resolve, reject)=> {
        axios.post(url + 'meetings/create', qs.stringify({
            emails: emails, 
            name: meetingName
        }))
        .then(() => {
            resolve('success')
        })
        .catch((err) =>{
            reject('failure')
        })
    })
}

var searchMeeting = function(query){
    return new Promise((resolve, reject)=> {
        axios.post(url + 'meetings/search', qs.stringify({
            query: query
        }))
        .then(() => {
            resolve('success')
        })
        .catch((err) => {
            reject('failure')
        })
    })
}

Describe('Meeting Creation Tests', function() {
    before(function(done) {
        connectToDatabase()
        .then((result)=>{
            assert.notEqual(null, result)
            db = result
        })
        .then(() => {
            return createMeeting('ellis93@purdue.edu pkfire@gmail.com', 'Test Meeting')
        })
        .then(() => {
            return searchMeeting('Test')
        })
        .then(() => done())
        .catch((err)=>{
            if(err) console.log(err)
        })
    })
})