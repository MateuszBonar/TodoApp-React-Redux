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
