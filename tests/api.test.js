

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });

  describe('GET /rides', () => {
    it('should return error, no data yet', (done) => {
      request(app)
        .get('/rides')
        .expect('Content-Type', /json/)
        .expect(404, done)
    });
  });

  describe('POST /rides', () => {
    it('should insert a new ride on the database', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 60,
          'start_long': 120,
          'end_lat': 60,
          'end_long': 120,
          'rider_name': 'test rider',
          'driver_name': 'test driver',
          'driver_vehicle': 'test vehicle'
        })
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should return error bcs start_lat > 90', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 120,
          'start_long': 120,
          'end_lat': 60,
          'end_long': 120,
          'rider_name': 'test rider',
          'driver_name': 'test driver',
          'driver_vehicle': 'test vehicle'
        })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return error bcs end_lat > 90', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 60,
          'start_long': 120,
          'end_lat': 120,
          'end_long': 120,
          'rider_name': 'test rider',
          'driver_name': 'test driver',
          'driver_vehicle': 'test vehicle'
        })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return error bcs rider name empty', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 60,
          'start_long': 120,
          'end_lat': 120,
          'end_long': 120,
          'rider_name': '',
          'driver_name': 'test driver',
          'driver_vehicle': 'test vehicle'
        })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return error bcs rider name not string', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 60,
          'start_long': 120,
          'end_lat': 120,
          'end_long': 120,
          'rider_name': 1234,
          'driver_name': 'test driver',
          'driver_vehicle': 'test vehicle'
        })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return error bcs driver name empty', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 60,
          'start_long': 120,
          'end_lat': 120,
          'end_long': 120,
          'rider_name': 'test rider',
          'driver_name': '',
          'driver_vehicle': 'test vehicle'
        })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return error bcs driver name not string', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 60,
          'start_long': 120,
          'end_lat': 120,
          'end_long': 120,
          'rider_name': 'test rider',
          'driver_name': 1234,
          'driver_vehicle': 'test vehicle'
        })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return error bcs driver vehicle empty', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 60,
          'start_long': 120,
          'end_lat': 120,
          'end_long': 120,
          'rider_name': 'test rider',
          'driver_name': 'test driver',
          'driver_vehicle': ''
        })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return error bcs rider name not string', (done) => {
      request(app)
        .post('/rides')
        .send({
          'start_lat': 60,
          'start_long': 120,
          'end_lat': 120,
          'end_long': 120,
          'rider_name': 'test rider',
          'driver_name': 'test driver',
          'driver_vehicle': 1234
        })
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('GET /rides', () => {
    it('should return all rides data', (done) => {
      request(app)
        .get('/rides')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });
  });

  describe('GET /rides/:id', () => {
    it('id exist, should return ride data', (done) => {
      request(app)
        .get('/rides/1')
        .expect('Content-Type', /json/)
        .expect(200, done)
    });

    it('id not exist, data not exist', (done) => {
      request(app)
        .get('/rides/2')
        .expect('Content-Type', /json/)
        .expect(404, done)
    });
  });
});
