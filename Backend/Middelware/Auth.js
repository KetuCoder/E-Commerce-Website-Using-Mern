import jwt from 'jsonwebtoken';

export const AuthUser = async (req,res,next) => {
    const { token } = req.headers;
    if(!token){
        return res.json({ Success : false , Message : "Not Authorized Login Again !" });
    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT);
        req.body.userId = tokenDecode.id
        next()
    } catch (error) {
        console.log(error);
        return res.json({ Success : false , Message : error.Message})
    }
}