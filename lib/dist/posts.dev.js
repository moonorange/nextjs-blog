"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSortedPostsData = getSortedPostsData;
exports.getAllPostIds = getAllPostIds;
exports.getPostData = getPostData;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _grayMatter = _interopRequireDefault(require("gray-matter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var postsDirectory = _path["default"].join(process.cwd(), 'posts');

function getSortedPostsData() {
  // Get file names under /posts
  var fileNames = _fs["default"].readdirSync(postsDirectory);

  var allPostsData = fileNames.map(function (fileName) {
    // Remove ".md" from file name to get id
    var id = fileName.replace(/\.md$/, ''); // Read markdown file as string

    var fullPath = _path["default"].join(postsDirectory, fileName);

    var fileContents = _fs["default"].readFileSync(fullPath, 'utf8'); // Use gray-matter to parse the post metadata section


    var matterResult = (0, _grayMatter["default"])(fileContents); // Combine the data with the id

    return _objectSpread({
      id: id
    }, matterResult.data);
  }); // Sort posts by date

  return allPostsData.sort(function (a, b) {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function getAllPostIds() {
  var fileNames = _fs["default"].readdirSync(postsDirectory);

  return fileNames.map(function (fileName) {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

function getPostData(id) {
  var fullPath = _path["default"].join(postsDirectory, "".concat(id, ".md"));

  var fileContents = _fs["default"].readFileSync(fullPath, 'utf8'); // Use gray-matter to parse the post metadata section


  var matterResult = (0, _grayMatter["default"])(fileContents); // Combine the data with the id

  return _objectSpread({
    id: id
  }, matterResult.data);
}