import jwt from 'jsonwebtoken';

export const AdminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers
        if(!token){
            return res.json({ Success : false , Message : "Not Authorized Login Again !" });
        }
        const tokenDecode = jwt.verify(token,process.env.JWT);
        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({ Success : false , Message : "Not Authorized Login Again !" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : error.message });
    }
}