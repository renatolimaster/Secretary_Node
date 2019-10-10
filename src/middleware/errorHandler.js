const { APIError, InternalServerError, Unauthorized } = require('rest-api-errors');
const { STATUS_CODES } = require('http');

const errorHandler = (err, req, res, next) => {
  log('======================== errorHandler ========================');
  const error = err.status === 401 || err instanceof APIError ? err : new InternalServerError();
  log('error ================> ', error);
  if (process.env.NODE_ENV !== 'production') {
    // do something here
  }
  log('NODE_ENV', process.env.NODE_ENV);
  if (['ValidationError', 'UserExistsError'].includes(err.name)) {
    // if it special error
    return res.status(405).json(err);
  }
  // log error if needed
  // logger.info('API error', { error: err });

  return res // return 500 for user
    .status(error.status || 500)
    .json({
      code: error.code || 500,
      message: error.message || STATUS_CODES[error.status],
    });
};

module.exports = { errorHandler };
