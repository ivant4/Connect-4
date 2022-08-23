// According to express doc, error handlers must take 4 arguments.  
const errorHandler = async (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({msg: err.message});
};

module.exports = errorHandler;