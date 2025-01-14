const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const winston = require('winston');

app.use(bodyParser.urlencoded({ extended: false }));

// Logger configuration
const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: './logs/example-2.log',
    }),
  ],
};

// Create the logger
const logger = winston.createLogger(logConfiguration);


module.exports = (db) => {
  /**
   * @api {get} /health Test Request
   * @apiName GetTestData
   * @apiGroup Test API
   *
   * @apiSuccess {String} Return the string 'Healthy'.
   */
  app.get('/health', (req, res) => res.status(200).send('Healthy'));

  /**
   * @api {post} /rides Add New Rides
   * @apiName AddRide
   * @apiGroup Rides
   *
   * @apiParam {Number} start_lat Start Latitude of the ride
   * @apiParam {Number} start_long Start Longitude of the ride
   * @apiParam {Number} end_lat End Latitude of the ride
   * @apiParam {Number} end_long End Longitude of the ride
   * @apiParam {String} rider_name Name of the Rider
   * @apiParam {String} driver_name Name of the Driver
   * @apiParam {String} driver_vehicle Vehicle of the Driver
   *
   * @apiSuccess {Number} rideID ID of the ride
   * @apiSuccess {Number} start_lat Start Latitude of the ride
   * @apiSuccess {Number} start_long Start Longitude of the ride
   * @apiSuccess {Number} end_lat End Latitude of the ride
   * @apiSuccess {Number} end_long End Longitude of the ride
   * @apiSuccess {String} rider_name Name of the Rider
   * @apiSuccess {String} driver_name Name of the Driver
   * @apiSuccess {String} driver_vehicle Vehicle of the Driver
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *      "rideID": 1,
   *      "start_lat": 45,
   *      "start_long": 120,
   *      "end_lat": 45,
   *      "end_long": 120,
   *      "rider_name": "Test Rider",
   *      "driver_name": "Test Driver",
   *      "driver_vehicle": "Test Vehicle"
   *  }
   *
   * @apiError StartLatAndLongError The start latitude and longitude is not between -90 - 90
   *  and -180 to 180 degrees
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 StartLatAndLongError
   *  {
   *      "error_code": 400,
   *      "message": "Start latitude and longitude must be between -90 - 90
   *                  and -180 to 180 degrees respectively"
   *  }
   *
   * @apiError EndLatAndLongError The end latitude and longitude must be between
   *  -90 - 90 and -180 to 180 degrees
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 EndLatAndLongError
   *  {
   *      "error_code": 400,
   *      "message": "End latitude and longitude must be between -90 - 90
   *                   and -180 to 180 degrees respectively"
   *  }
   *
   * @apiError RiderNameError Rider name must be a non empty string
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 RiderNameError
   *  {
   *      "error_code": 400,
   *      "message": "Rider name must be a non empty string"
   *  }
   *
   * @apiError DriverNameError Driver name must be a non empty string
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 DriverNameError
   *  {
   *      "error_code": 400,
   *      "message": "Driver name must be a non empty string"
   *  }
   *
   * @apiError DriverVehicleError Driver vehicle must be a non empty string
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 400 DriverVehicleError
   *  {
   *      "error_code": 400,
   *      "message": "Driver vehicle must be a non empty string"
   *  }
   *
   * @apiError ServerError Server encountered an error
   * @apiErrorExample Error-Response:
   *  HTTP/1.1 500 Server Error
   *  {
   *      "error_code": 500,
   *      "message": "Server encountered an error"
   *  }
   *
   */
  app.post('/rides', jsonParser, (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (startLatitude < -90 || startLatitude > 90
      || startLongitude < -180 || startLongitude > 180) {
      const message = {
        error_code: '400',
        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      };
      logger.error(message);
      return res.status(400).send(message);
    }

    if (endLatitude < -90 || endLatitude > 90
      || endLongitude < -180 || endLongitude > 180) {
      const message = {
        error_code: '400',
        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
      };
      logger.error(message);
      return res.status(400).send(message);
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      const message = {
        error_code: '400',
        message: 'Rider name must be a non empty string',
      };
      logger.error(message);
      return res.status(400).send(message);
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      const message = {
        error_code: '400',
        message: 'Driver name must be a non empty string',
      };
      logger.error(message);
      return res.status(400).send(message);
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      const message = {
        error_code: '400',
        message: 'Driver vehicle must be a non empty string',
      };
      logger.error(message);
      return res.status(400).send(message);
    }

    const values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long,
      req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];

    db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function check(err) {
      if (err) {
        const message = {
          error_code: '500',
          message: 'Server encountered an error',
        };
        logger.error(message);
        return res.status(500).send(message);
      }

      db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (error, rows) => {
        if (error) {
          const message = {
            error_code: '500',
            message: 'Server encountered an error',
          };
          logger.error(message);
          return res.status(500).send(message);
        }

        return res.status(200).send(rows);
      });
    });
  });

  /**
     * @api {post} /rides Get All Rides
     * @apiName GetAllRides
     * @apiGroup Rides
     *
     * @apiParam {Number} page Page Number (Optional)
     * @apiParam {Number} limit Specifies the limit of pagination (default: 5) (Optional)
     *
     * @apiSuccess {Number} rideID ID of the ride
     * @apiSuccess {Number} start_lat Start Latitude of the ride
     * @apiSuccess {Number} start_long Start Longitude of the ride
     * @apiSuccess {Number} end_lat End Latitude of the ride
     * @apiSuccess {Number} end_long End Longitude of the ride
     * @apiSuccess {String} rider_name Name of the Rider
     * @apiSuccess {String} driver_name Name of the Driver
     * @apiSuccess {String} driver_vehicle Vehicle of the Driver
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  [
     *      {
     *          "rideID": 1,
     *          "start_lat": 45,
     *          "start_long": 120,
     *          "end_lat": 45,
     *          "end_long": 120,
     *          "rider_name": "Test Rider",
     *          "driver_name": "Test Driver",
     *          "driver_vehicle": "Test Vehicle"
     *      },
     *      {
     *          "rideID": 2,
     *          "start_lat": 45,
     *          "start_long": 120,
     *          "end_lat": 45,
     *          "end_long": 120,
     *          "rider_name": "Test Rider",
     *          "driver_name": "Test Driver",
     *          "driver_vehicle": "Test Vehicle"
     *      }
     * ]
     *
     * @apiError RidesNotFound Could not find any rides
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 404 RidesNotFound
     *  {
     *      "error_code": 404,
     *      "message": "Could not find any rides"
     *  }
     *
     * @apiError ServerError Server encountered an error
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 500 ServerError
     *  {
     *      "error_code": 500,
     *      "message": "Server encountered an error"
     *  }
     *
     */

  app.get('/rides', (req, res) => {
    const page = (req.query && req.query.page) ? req.query.page : 1;
    const limit = (req.query && req.query.limit) ? req.query.limit : 5;
    const offset = (page - 1) * limit;
    db.all('SELECT * FROM Rides LIMIT ?, ?', [offset, limit], (err, rows) => {
      if (err) {
        const message = {
          error_code: '500',
          message: 'Server encountered an error',
        };
        logger.error(message);
        return res.status(500).send(message);
      }

      if (rows.length === 0) {
        const message = {
          error_code: '404',
          message: 'Could not find any rides',
        };
        logger.error(message);
        return res.status(404).send(message);
      }

      return res.status(200).send(rows);
    });
  });

  /**
     * @api {post} /rides/:id Get A Ride
     * @apiName GetRide
     * @apiGroup Rides
     *
     * @apiParam {Number} id Ride unique ID
     *
     * @apiSuccess {Number} rideID ID of the ride
     * @apiSuccess {Number} start_lat Start Latitude of the ride
     * @apiSuccess {Number} start_long Start Longitude of the ride
     * @apiSuccess {Number} end_lat End Latitude of the ride
     * @apiSuccess {Number} end_long End Longitude of the ride
     * @apiSuccess {String} rider_name Name of the Rider
     * @apiSuccess {String} driver_name Name of the Driver
     * @apiSuccess {String} driver_vehicle Vehicle of the Driver
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "rideID": 1,
     *      "start_lat": 45,
     *      "start_long": 120,
     *      "end_lat": 45,
     *      "end_long": 120,
     *      "rider_name": "Test Rider",
     *      "driver_name": "Test Driver",
     *      "driver_vehicle": "Test Vehicle"
     *  }
     *
     * @apiError RideIDNotFound rideID does not exist
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 404 RideIDNotFound
     *  {
     *      "error_code": 404,
     *      "message": "rideID does not exist"
     *  }
     *
     * @apiError ServerError Server encountered an error
     * @apiErrorExample Error-Response:
     *  HTTP/1.1 500 ServerError
     *  {
     *      "error_code": 500,
     *      "message": "Server encountered an error"
     *  }
     *
     */

  app.get('/rides/:id', (req, res) => {
    db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, (err, rows) => {
      if (err) {
        const message = {
          error_code: '500',
          message: 'Server encountered an error',
        };
        logger.error(message);
        return res.status(500).send(message);
      }

      if (rows.length === 0) {
        const message = {
          error_code: '404',
          message: 'rideID does not exist',
        };
        logger.error(message);
        return res.status(404).send(message);
      }

      return res.status(200).send(rows);
    });
  });

  return app;
};
