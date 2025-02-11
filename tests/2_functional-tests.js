const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
        chai.request(server) // Send GET request to server
            .get('/api/convert?input=10L') // Query with valid input
            .end(function(err, res) {
                assert.equal(res.status, 200); // Check for successful response
                assert.equal(res.body.initNum, 10); // Check if initNum is correct
                assert.equal(res.body.initUnit, 'L'); // Check if initUnit is correct
                assert.approximately(res.body.returnNum, 10 * (1/3.78541), 0.1); // Check if conversion is correct (within a margin of error)
                assert.equal(res.body.returnUnit, 'gal'); // Check if the return unit is correct
                done(); // Finish the test
            }); 
    });
    test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert?input=32g')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'invalid unit');
                done();
            });
    });
    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'invalid number');
                done();
            });
    });
    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'invalid number and unit');
                done();
            });
    });
    test('Convert with no number such as kg: GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert?input=kg')
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, 'kg');
                done();
            });
    });
});
