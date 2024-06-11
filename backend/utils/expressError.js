class expressError extends Error {
  constructor(statusCode, errmsg) {
    super();
    this.statusCode = statusCode;
    this.errmsg = errmsg;
  }
}

module.exports = expressError;
