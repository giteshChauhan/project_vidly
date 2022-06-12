// have to use this approach if express-async-errors does not work for any reason

module.exports = function(handler){
    return async (req, res, next) => {
        try{
            await handler(req, res);
        }
        catch(ex){
            next(ex);
        }
    }
}