const presets = [
    [
      "@babel/preset-env",
      {
        // preset you want to use
        // browser versions in which we want our code supported
        targets: "defaults, not IE 11, not dead",
  

        useBuiltIns: "entry",
        corejs: "^3",
      },
    ],
  ];
  
  module.exports = { presets };
