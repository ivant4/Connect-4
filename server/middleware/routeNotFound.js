const routeNotFound = async (req, res) => {
    res.status(404).send(`This route (${req.url}) does not exist!`);
};

module.exports = routeNotFound;