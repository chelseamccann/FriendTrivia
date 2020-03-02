const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' )
const expect = chai.expect
chai.use( chaiHttp )

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./bin/www');
  });

  afterEach(function (done) {
    delete require.cache[require.resolve( './bin/www' )]
    done()
  });

  it('responds to /questions', function testSlash(done) {
  chai.request(server)
    .get('/questions')
    .set( 'Connection', 'close' )
    .set('Content-Type', 'application/json')
    .end(( err, res ) => {
      expect('Content-Type', /json/);
      expect(200, done);
      done();
   });
  });

  it('404 everything else', function testPath(done) {
  chai.request(server)
    .get('/foo/bar')
    .set( 'Connection', 'close' )
    .end(( err, res ) => {
      expect(404, done);
      done();
   });
  });
});