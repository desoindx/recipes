module.exports = {
  plugins: [
    [
      'postcss-import',
      {
        // Do not transform @import css rules
        filter: () => false,
      },
    ],
    'postcss-nested',
    'postcss-flexbugs-fixes',
  ],
}
