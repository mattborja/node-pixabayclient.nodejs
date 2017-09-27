# Pixabay Client for Node.js
Client library for querying Pixabay API featuring strict parameter validation and automatic URL encoding.

## Usage
The client library is capable of supporting current and future API endpoints under the same API key by accepting a direct `apiUrl` option as a constructor "argument."

Below are snippets derived from the original [`demo`](https://github.com/rdev5/node-pixabayclient/blob/master/demo.js) which may be run within the cloned directory using `node demo.js`.

### Photos (https://pixabay.com/api/)
````
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

### Videos (https://pixabay.com/api/videos/)
````
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
