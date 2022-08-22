const mongoose = require("mongoose");
// url is the connection string (expression contains the parameters required to connect to a db)
const connectDB = (url) => {
    return mongoose.connect(url, {
        // the following options are used to suppress deprecation warnings
        useNewUrlParser: true, // use the latest version of the URL parser
        useUnifiedTopology: true, // new topology engine
    })
}


module.exports = connectDB; 