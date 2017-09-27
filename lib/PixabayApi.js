const client = require('https');
const querystring = require('querystring');

const default_options = {
  apiUrl: "https://pixabay.com/api/",
  encoding: "utf8",
};

const validApiParameters = {
  key: {
    required: true,
    description: "Pixabay API key",
    type: typeof "",
  },

  q: {
    required: false,
    description: "A URL encoded search term. If omitted, <i>all images</i> are returned. This value may not exceed 100 characters.",
    type: typeof "",
  },

  lang: {
    required: false,
    description: "Language code of the language to be searched in. Default: en",
    type: typeof "",
    validValues: ["cs", "da", "de", "en", "es", "fr", "id", "it", "hu", "nl", "no", "pl", "pt", "ro", "sk", "fi", "sv", "tr", "vi", "th", "bg", "ru", "el", "ja", "ko", "zh"],
  },

  id: {
    required: false,
    description: "ID, hash ID, or a comma separated list of values for retrieving specific images. In a comma separated list, IDs and hash IDs cannot be used together. ",
    type: typeof "",
  },

  response_group: {
    required: false,
    description: "Choose between retrieving high resolution images and image details. When selecting details, you can access images up to a dimension of 960 x 720 px.",
    type: typeof "",
    validValues: ["image_details", "high_resolution"],
  },

  image_type: {
    required: false,
    description: "Filter results by image type. Default: \"all\"",
    type: typeof "",
    validValues: ["all", "photo", "illustration", "vector"],
  },

  orientation: {
    required: false,
    description: "Whether an image is wider than it is tall, or taller than it is wide. Default: \"all\"",
    type: typeof "",
    validValues: ["all", "horizontal", "vertical"],
  },

  category: {
    required: false,
    description: "Filter results by category.",
    type: typeof "",
    validValues: ["fashion", "nature", "backgrounds", "science", "education", "people", "feelings", "religion", "health", "places", "animals", "industry", "food", "computer", "sports", "transportation", "travel", "buildings", "business", "music"],
  },

  min_width: {
    required: false,
    description: "Minimum image width. Default: 0",
    type: typeof 0,
  },

  min_height: {
    required: false,
    description: "Minimum image height. Default: 0",
    type: typeof 0,
  },

  editors_choice: {
    required: false,
    description: "Select images that have received an Editor's Choice award. Default: false",
    type: typeof false,
  },

  safesearch: {
    required: false,
    description: "A flag indicating that only images suitable for all ages should be returned. Default: false",
    type: typeof false,
  },

  order: {
    required: false,
    description: "How the results should be ordered. Default: \"popular\"",
    type: typeof "",
    validValues: ["popular", "latest"],
  },

  page: {
    required: false,
    description: "Returned search results are paginated. Use this parameter to select the page number. Default: 1 ",
    type: typeof 0,
  },

  per_page: {
    required: false,
    description: "Determine the number of results per page. Valid values: 3-200. Default: 20",
    type: typeof 0,
  },

  callback: {
    required: false,
    description: "JSONP callback function name ",
    type: typeof "",
  },

  pretty: {
    required: false,
    description: "Indent JSON output. This option should not be used in production. Default: false",
    type: typeof false,
  },
};

function Pixabay(options) {
  // Always set encoding from default_options for HTTPS client
  if ('encoding' in default_options && !('encoding' in options))
    options['encoding'] = default_options['encoding'];

   if (this instanceof Pixabay) {
      this.options = options ? options : default_options;
   } else {
      return (new Pixabay(options));
   }
}

function validateParams(params) {
  var errors = [];

  // Validate requested parameters
  for (var k in params) {
    if (!(k in validApiParameters)) {
      errors.push('Invalid parameter [' + k + '] (value: ' + params[k] + ')');
      continue;
    }

    var p = validApiParameters[k];

    // Enforce type
    var validType = p.type
    if (p.type !== undefined && typeof params[k] !== p.type)
      errors.push('Invalid type [' + typeof params[k] + '] for parameter [' + k + '] (expected ' + p.type + ')');

    // Enforce valid values when present
    if (p.validValues !== undefined && p.validValues.indexOf(params[k]) === -1)
      errors.push('Invalid value [' + params[k] + '] for parameter [' + k + '] (valid values: ' + p.validValues.join(', ') + ')');
  }

  // Enforce required parameters (present and not empty)
  var parametersMissing = [];

  for (var k in validApiParameters) {
    if (!validApiParameters[k].required)
      continue;

    if (!(k in params) || params[k].length === 0)
      parametersMissing.push(k);
  }

  if (parametersMissing.length > 0)
    errors.push('Missing required parameters: ' + parametersMissing.join(', '));

  return errors;
}

Pixabay.prototype.query = function(params, callback) {
  var errors = validateParams(params);

  if (errors.length > 0)
    return callback(errors);

  var req = this.options.apiUrl + '?' + querystring.stringify(params);

  client.get(req, res => {
    res.setEncoding(this.options.encoding);
    let body = "";

    res.on("data", data => {
      body += data;
    });

    res.on("end", () => {
      switch (res.statusCode) {
        case 200:
          return callback(null, JSON.parse(body), req, res);

        default:
          // return callback([ res.statusCode + ' - ' + res.statusMessage + ' (' + body + ')' ]);
          return callback([body]);
      }
    });
  });
};

module.exports = Pixabay;