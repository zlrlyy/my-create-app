// next.config.js
const withAntdLess = require('next-plugin-antd-less');
const isTest = process.env.NODE_ENV === 'test';
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isTest && !isProd;
module.exports = withAntdLess({
  modifyVars: { '@primary-color': '#04f' }, // optional
  // lessVarsFilePath: './src/styles/variables.less', // optional 
  lessVarsFilePathAppendToEndOfContent: false, // optional
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {
    // ... 
    mode: "local",
    localIdentName: isDev ? "[local]--[hash:base64:4]" : "[hash:base64:8]", // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
    exportLocalsConvention: "camelCase",
    exportOnlyLocals: false,
    // ...
    getLocalIdent: (context, localIdentName, localName, options) => {
      return "whatever_random_class_name";
    },
  },

  // for Next.js ONLY
  nextjs: {
    localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
  },

  // Other Config Here...

  webpack:(config)=>{
    console.log(config);
    config.module.rules.forEach(rule => {
      if (rule.test && rule.test.toString().includes('.less')) {
        rule.rules = rule.use.map(useRule => {
          if (typeof useRule === 'string') {
            return {
              loader: useRule,
            };
          }
          if (useRule.loader.startsWith('css-loader')) {
            return {
              oneOf: [
                {
                  test: /\.global\.less$/,
                  loader: useRule.loader,
                  options: {
                    ...useRule.options,
                    modules: false,
                  },
                },
                {
                  loader: useRule.loader,
                  options: useRule.options,
                },
              ],
            };
          }
          return useRule;
        });
        delete rule.use;
      }
    });
    return config;
  }

});