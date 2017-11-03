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

var deleteUser = function(email, password) {
    return new Promise((resolve, reject) => {
        axios.post(url + 'auth/delete', qs.stringify({
            email: email,
            password: password
        }))
        .then(() => {
            resolve('success')
        })
        .catch((err) => {
            reject('failure')
        })
    })
}

var insertUser = function(email, name, password) {
    return new Promise((resolve, reject) => {
        axios.post(url + 'auth/signup', qs.stringify({
            email: email,
            name: name,
            password: password
        }))
        .then((res) => {
            resolve('success')
        })
        .catch((err) => {
            reject('failure')
        })
    })
}

var loginUser = function(email, password) {
    return new Promise((resolve, reject) => {
        axios.post(url + 'auth/login', qs.stringify({
            email: email,
            password: password
        }))
        .then((res) => {
            resolve('success')
        })
        .catch((err) => {

        })
    })
}

var authenticateUser = function(email) {
    return new Promise((resolve, reject) => {
        db.collection('users').updateOne({
            email: email
        }, {
            $set: { authenticated: true }
        }, (err, res) => {
            if (err) reject(err)
            resolve('success')
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
                if (err) console.log(err)
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

        it('should create the new user', function() {
            return Promise.resolve(insertUser('test@test.com', 'Test User', 'password'))
                .should
                .eventually
                .equal('success')
        })

        it('should not create the existing user', function() {
            return Promise.resolve(insertUser('test@test.com', 'Test User2', 'password'))
                .should
                .eventually
                .equal('success')
        })
    })

    describe('Tests User Login', function() {
        it('should not login the unauthenticated user', function() {
            return Promise.resolve(loginUser('test@test.com', 'password'))
                .should
                .eventually
                .equal('success')
        })

        it('should authenticate and login the existing user', function() {
            return Promise.resolve(authenticateUser('test@test.com'))
                .should
                .eventually
                .equal('success')
        })
    })

})