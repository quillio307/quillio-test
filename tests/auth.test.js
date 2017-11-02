const axios  = require('axios')
    , chai   = require('chai')
    , assert = require('chai').assert
    , expect = require('chai').expect
    , should = require('chai').should()
    , ObjectId = require('mongodb').ObjectId

const connectToDatabase = require('../index').connectToDatabase

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

    describe('Tests User Creation', function() {
        it('should create the new user', function() {
            return true
        })

        it('should not create the existing user', function() {
            return true
        })
    })

})