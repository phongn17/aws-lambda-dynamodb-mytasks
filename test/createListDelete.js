var assert = require('assert');
var request = require('request');
var fs = require('fs');

describe('Create, List, Delete', function() {
  this.timeout(5000);
  it('should create a new task, list it, & delete it', function(done) {
    // Build and log the path
    // Fetch the comparison payload
    require.extensions['.txt'] = function (module, filename) {
      // Create the new Task
      var options = {'url' : path, 'form': JSON.stringify(desiredPayload)};
      request.post(options, function (err, res, body) {
        if (err) {
          throw new Error("Create call failed: " + err);
        }
        assert.equal(200, res.statusCode, "Create Status Code != 200 (" + res.statusCode + ")");
        // Read the list, see if the new item is there at the end
        request.get(path, function (err, res, body) {
          if(err) {
            throw new Error("List call failed: " + err);
          }
          assert.equal(200, res.statusCode, "List Status Code != 200 (" + res.statusCode + ")");
          var taskList = JSON.parse(res.body);
          if (taskList[taskList.length-1].text == desiredPayload.text) {
            // Item found, delete it
            assert.equal(200, res.statusCode, "Delete Status Code != 200 (" + res.statusCode + ")");
            done();
          } else {
            // Item not found, fail test
            assert.equal(true, false, "New item not found in list.");
            done();
          }
        });
      });
    };
  });
});