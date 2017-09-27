# Pixabay Client for Node.js
Client library for querying [Pixabay API](https://pixabay.com/api/docs/) featuring strict parameter validation and automatic URL encoding.

## Usage
The client library is capable of supporting any endpoint under the same API key by accepting a direct `apiUrl` option as a constructor "argument" as demonstrated below (see also [`demo.js`](https://github.com/rdev5/node-pixabayclient/blob/master/demo.js)).

For a complete list of API endpoints, please see https://pixabay.com/api/docs/.

### Photos API (https://pixabay.com/api/)
````node
const PixabayApi = require('./path/to/PixabayApi');
const PixabayPhotos = new PixabayApi({ apiUrl: "https://pixabay.com/api/" });

var params = {
  key: "YOUR-PIXABAY_API_KEY_HERE",
  q: "yellow flowers", // automatically URL-encoded
  image_type: "photo",
};

PixabayPhotos.query(params, function(errors, res, req) {
  if (errors) {
    console.log('One or more errors were encountered:');
    console.log('- ' + errors.join('\n- '));
    return;
  }

  console.log('Photos request:');
  console.log(req);

  console.log('Photos API response:');
  console.log(res);
});
````

### Videos API (https://pixabay.com/api/videos/)
````node
const PixabayApi = require('./path/to/PixabayApi');
const PixabayVideos = new PixabayApi({ apiUrl: "https://pixabay.com/api/videos/" });

var params = {
  key: "YOUR-PIXABAY_API_KEY_HERE",
  q: "yellow flowers", // automatically URL-encoded
};

PixabayVideos.query(params, function(errors, res, req) {
  if (errors) {
    console.log('One or more errors were encountered:');
    console.log('- ' + errors.join('\n- '));
    return;
  }

  console.log('Videos request:');
  console.log(req);

  console.log('Videos API response:');
  console.log(res);
});
````
