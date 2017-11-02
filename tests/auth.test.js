const axios  = require('axios')
    , chai   = require('chai')
    , assert = require('chai').assert
    , expect = require('chai').expect
    , should = require('chai').should()
    , ObjectId = require('mongodb').ObjectId

const connectToDatabase = require('../index').connectToDatabase
    , url = require('../index').ENDPOINT

var db = undefined

describe('Authentication Tests', function() {
    before(function(done) {
        connectToDatabase()
            .then((result) => {
                assert.notEqual(null, result)
                db = result
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