const errorLogger = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    console.error(err.stack);
  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  };
  
  module.exports = errorLogger;
  
  const asyncHandler = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
  
  module.exports = asyncHandler;
  