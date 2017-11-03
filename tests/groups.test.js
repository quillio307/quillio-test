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

var createGroup = function(emails, groupName) {
    return new Promise((resolve, reject) => {
        axios.post(url + 'groups/create', qs.stringify({
            emails: emails,
            name: groupName
        }))
        .then(() => {
            resolve('success')
        })
        .catch((err) => {
            reject('failure')
        })
    })
}

var searchGroup = function(query){
    return new Promise((resolve, reject)=>{
        axios.post(url + 'groups/search', qs.stringify({
            query:query
        }))
        .then(() => {
            resolve('success')
        })
        .catch((err) => {
            reject('failure')
        })
    })
}


describe('User Group Test', function(){
    before(function(done) {
        connectToDatabase()
        .then((result)=> {
                assert.notEqual(null, result)
                db = result
        })
        .then(() => {
            return createGroup('ellis93@purdue.edu pkfire@gmail.com', 'my group')
        })
        .then(()=>{
            return searchGroup('my group')
        })
        .then(() => done())
        .catch((err) => {
            if(err) console.log(err)
        })
    })
    after(function() {
        db.close()
    })
})
