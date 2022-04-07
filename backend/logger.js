const loggerMdw = (req, res, next) => {
    const time = new Date();
    console.log("New req at " + time.toLocaleString());
    next()
};

module.exports = loggerMdw;