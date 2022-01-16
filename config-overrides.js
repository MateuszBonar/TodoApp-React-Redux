const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    Redux: "src/redux",
    Hooks: "src/hooks",
    Assets: "src/assets",
    Components: "src/components",
    Pages: "src/pages",
    Utils: "src/utils",
    Constants: "src/constants",
    Api: "src/api",
  })(config);

  return config;
};

// "paths": {
//   "Redux/*": ["src/store/*"],
//     "Redux":  ["src/store"],
//     "Hooks/*": ["src/hooks/*"],
//     "Hooks": ["src/hooks"],
//     "Assets/*": ["src/assets/*"],
//     "Assets": ["src/assets"],
//     "Components/*": ["src/components/*"],
//     "Components": ["src/components"],
//     "Utils": ["src/utils"],
//     "Utils/*": ["src/utils/*"],
//     "Constants": ["src/constants"],
//     "Constants/*": ["src/constants/*"],
//     "Api": ["src/api"],
//     "Api/*": ["src/api/*"]
// }
