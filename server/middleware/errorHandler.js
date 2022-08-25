// According to express doc, error handlers must take 4 arguments.  
const errorHandler = async (err, req, res, next) => {
    console.log(err);
    if (err.statusCode === 400) { // request error
        return res.status(400).json({msg: err.message});
    } else { // server error
        return res.status(500).json({msg: "Something went wrong in the server !"});
    }
};

module.exports = errorHandler;