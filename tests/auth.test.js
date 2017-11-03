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
            resolve(res)
        })
        .catch((err) => {
            if (err) reject(err)
            reject()
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
            resolve(res)
        })
        .catch((err) => {
            if (err) reject(err)
            reject()
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
            .then(() => done())
            .catch((err) => {
                console.log(err)
            })
    })

    after(function() {
        db.close()
    })

    describe('Tests Database Connection', function() {
        it('should validate the database connection', function() {
           should.exist(db) 
        })
    })

    describe('Tests User Signup', function() {
        it('should create the new user', function(done) {
            return new Promise((resolve) => {
                insertUser('test@test.com', 'Test User', 'password')
                    .then((res) => {
                        assert.equal(true, true)
                        resolve()
                    })
                    .then(() => done())
                    .catch((err) => {
                        if (err) console.log(err)
                        assert.equal(false, true)
                        done()
                    })
            })
        })

        it('should not create the existing user', function() {
            return new Promise((resolve) => {
                insertUser('test@test.com', 'Different Name', 'password')
                    .then((res) => {
                        assert.equal(false, true)
                    })
                    .then(() => done())
                    .catch((err) => {

                    })
            })
        })
    })

    describe('Tests User Login', function() {
        it('should not login the unauthenticated user', function() {

        })

        it('should authenticate the existing user', function() {

        })
    })

})