const dateLogger = (req, res, next) => {
    const date = new Date();

    const options={
        timeZone:"Asia/Kolkata",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        second:"numeric"
    }
  
    const indianTime = date.toLocaleString("en-IN", options);
  
    req.body.date = indianTime;
    next();
  };
  
  module.exports = { dateLogger };
