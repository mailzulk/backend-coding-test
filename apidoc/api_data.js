define({ "api": [
  {
    "type": "post",
    "url": "/rides",
    "title": "Add New Rides",
    "name": "AddRide",
    "group": "Rides",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "start_lat",
            "description": "<p>Start Latitude of the ride</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "start_long",
            "description": "<p>Start Longitude of the ride</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "end_lat",
            "description": "<p>End Latitude of the ride</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "end_long",
            "description": "<p>End Longitude of the ride</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rider_name",
            "description": "<p>Name of the Rider</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "driver_name",
            "description": "<p>Name of the Driver</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "driver_vehicle",
            "description": "<p>Vehicle of the Driver</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rideID",
            "description": "<p>ID of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "start_lat",
            "description": "<p>Start Latitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "start_long",
            "description": "<p>Start Longitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "end_lat",
            "description": "<p>End Latitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "end_long",
            "description": "<p>End Longitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rider_name",
            "description": "<p>Name of the Rider</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver_name",
            "description": "<p>Name of the Driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver_vehicle",
            "description": "<p>Vehicle of the Driver</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"rideID\": 1,\n    \"start_lat\": 45,\n    \"start_long\": 120,\n    \"end_lat\": 45,\n    \"end_long\": 120,\n    \"rider_name\": \"Test Rider\",\n    \"driver_name\": \"Test Driver\",\n    \"driver_vehicle\": \"Test Vehicle\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StartLatAndLongError",
            "description": "<p>The start latitude and longitude is not between -90 - 90 and -180 to 180 degrees</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EndLatAndLongError",
            "description": "<p>The end latitude and longitude must be between -90 - 90 and -180 to 180 degrees</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RiderNameError",
            "description": "<p>Rider name must be a non empty string</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverNameError",
            "description": "<p>Driver name must be a non empty string</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverVehicleError",
            "description": "<p>Driver vehicle must be a non empty string</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server encountered an error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 StartLatAndLongError\n{\n    \"error_code\": 400,\n    \"message\": \"Start latitude and longitude must be between -90 - 90\n                and -180 to 180 degrees respectively\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 EndLatAndLongError\n{\n    \"error_code\": 400,\n    \"message\": \"End latitude and longitude must be between -90 - 90\n                 and -180 to 180 degrees respectively\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 RiderNameError\n{\n    \"error_code\": 400,\n    \"message\": \"Rider name must be a non empty string\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 DriverNameError\n{\n    \"error_code\": 400,\n    \"message\": \"Driver name must be a non empty string\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 DriverVehicleError\n{\n    \"error_code\": 400,\n    \"message\": \"Driver vehicle must be a non empty string\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Server Error\n{\n    \"error_code\": 500,\n    \"message\": \"Server encountered an error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app.js",
    "groupTitle": "Rides"
  },
  {
    "type": "post",
    "url": "/rides",
    "title": "Get All Rides",
    "name": "GetAllRides",
    "group": "Rides",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page Number (Optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Specifies the limit of pagination (default: 5) (Optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rideID",
            "description": "<p>ID of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "start_lat",
            "description": "<p>Start Latitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "start_long",
            "description": "<p>Start Longitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "end_lat",
            "description": "<p>End Latitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "end_long",
            "description": "<p>End Longitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rider_name",
            "description": "<p>Name of the Rider</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver_name",
            "description": "<p>Name of the Driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver_vehicle",
            "description": "<p>Vehicle of the Driver</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n     {\n         \"rideID\": 1,\n         \"start_lat\": 45,\n         \"start_long\": 120,\n         \"end_lat\": 45,\n         \"end_long\": 120,\n         \"rider_name\": \"Test Rider\",\n         \"driver_name\": \"Test Driver\",\n         \"driver_vehicle\": \"Test Vehicle\"\n     },\n     {\n         \"rideID\": 2,\n         \"start_lat\": 45,\n         \"start_long\": 120,\n         \"end_lat\": 45,\n         \"end_long\": 120,\n         \"rider_name\": \"Test Rider\",\n         \"driver_name\": \"Test Driver\",\n         \"driver_vehicle\": \"Test Vehicle\"\n     }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RidesNotFound",
            "description": "<p>Could not find any rides</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server encountered an error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 RidesNotFound\n{\n    \"error_code\": 404,\n    \"message\": \"Could not find any rides\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 ServerError\n{\n    \"error_code\": 500,\n    \"message\": \"Server encountered an error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app.js",
    "groupTitle": "Rides"
  },
  {
    "type": "post",
    "url": "/rides/:id",
    "title": "Get A Ride",
    "name": "GetRide",
    "group": "Rides",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Ride unique ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rideID",
            "description": "<p>ID of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "start_lat",
            "description": "<p>Start Latitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "start_long",
            "description": "<p>Start Longitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "end_lat",
            "description": "<p>End Latitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "end_long",
            "description": "<p>End Longitude of the ride</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rider_name",
            "description": "<p>Name of the Rider</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver_name",
            "description": "<p>Name of the Driver</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "driver_vehicle",
            "description": "<p>Vehicle of the Driver</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"rideID\": 1,\n    \"start_lat\": 45,\n    \"start_long\": 120,\n    \"end_lat\": 45,\n    \"end_long\": 120,\n    \"rider_name\": \"Test Rider\",\n    \"driver_name\": \"Test Driver\",\n    \"driver_vehicle\": \"Test Vehicle\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RideIDNotFound",
            "description": "<p>rideID does not exist</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Server encountered an error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 RideIDNotFound\n{\n    \"error_code\": 404,\n    \"message\": \"rideID does not exist\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 ServerError\n{\n    \"error_code\": 500,\n    \"message\": \"Server encountered an error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/app.js",
    "groupTitle": "Rides"
  },
  {
    "type": "get",
    "url": "/health",
    "title": "Test Request",
    "name": "GetTestData",
    "group": "Test_API",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Return",
            "description": "<p>the string 'Healthy'.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/app.js",
    "groupTitle": "Test_API"
  }
] });
