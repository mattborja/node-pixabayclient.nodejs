// To run: node demo.js
const PixabayApi = require('./lib/PixabayApi');
const PixabayPhotos = new PixabayApi({ apiUrl: "https://pixabay.com/api/" });
const PixabayVideos = new PixabayApi({ apiUrl: "https://pixabay.com/api/videos/" });

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