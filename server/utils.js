const getError = function (message, error) {
  return {
    success: false,
    message: message,
    data: error
  };
}

const getSuccess = function (message, data) {
  return {
    success: true,
    message: message,
    data: data
  };
}

module.exports = { getError, getSuccess }