const rtlcss = require('rtlcss');

module.exports = (env, argv) => {
  const temptoExport = env;

  const pco = { postcssOptions: { plugins: [rtlcss] } };

  temptoExport.module.rules
    .forEach(r => {
      if (r.hasOwnProperty('rules')) {
        r.rules.forEach(r => {
          if (r.hasOwnProperty('oneOf')) {
            r.oneOf.forEach(o => {
              if (o.hasOwnProperty('use')) {
                o.use.forEach(u => {
                  if (u.hasOwnProperty('loader') && u.loader.includes('postcss-loader')) {
                    u.options = { ...u.options, ...pco };
                  }
                })
              }
            })
          }
        })
      }
    })
  return temptoExport;
}
