/* eslint-disable react-hooks/rules-of-hooks */

const { disableEsLint, fixBabelImports, override } = require('customize-cra')

module.exports = override(
  disableEsLint(),
  fixBabelImports('@mui/material', {
    libraryDirectory: '',
    camel2DashComponentName: false,
  }),
  fixBabelImports('@mui/icons-material', {
    libraryDirectory: '',
    camel2DashComponentName: false,
  })
)
