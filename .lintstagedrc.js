module.exports = {
  '**/*.(js|ts|tsx|json|css|html|md)': process.env['LINT_FIX_ERRORS'] === 'true' ? 'eslint --fix' : 'eslint'
}
