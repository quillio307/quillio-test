const axios  = require('axios')
    , chai   = require('chai')
    , assert = require('chai').assert
    , expect = require('chai').expect
    , should = require('chai').should()
    , ObjectId = require('mongodb').ObjectId

const connectToDatabase = require('../index').connectToDatabase
    , url = require('../index').ENDPOINT

var db = undefined

var deleteUser = function(email, password) {
    return new Promise((resolve, reject) => {
        axios.post(url + 'auth/delete', {
            email: email,
            password: password
        })
        .then((res) => {
            if (res.error && res.error === 'invalid')
                reject() 
            resolve()
        })
    })
}

var insertUser = function(email, name, password) {
    return new Promise((resolve, reject) => {
        axios.post(url + 'auth/signup', {
            email: email,
            name: name,
            password: password
        })
        .then((res) => {
            if (res.error && res.error === 'invalid')
                reject()
            resolve()
        })
    })
}

describe('Authentication Tests', function() {
    before(function(done) {
        connectToDatabase()
            .then((result) => {
                // establish the db connection
                assert.notEqual(null, result)
                db = result
            })
            .then(() => {
                // remove the dummy users
                return deleteUser('test@test.com', 'password')
            })
            .then(() => {
                done()
            })
    })

    after(function() {
        db.close()
    })

    describe('Tests Database Connection', function() {
        it('should assert that the database is not null', function() {
           should.exist(db) 
        })
    })

    describe('Tests User Signup', function() {
        it('should create the new user', function() {
            return true
        })

        it('should not create the existing user', function() {
            return true
        })
    })

    describe('Tests User Login', function() {
        it('should not login the unauthenticated user', function() {

        })

        it('should authenticate the existing user', function() {

        })

        it('should not login the ')
    })

})