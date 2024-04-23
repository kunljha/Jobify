import { UnauthenticatedError, UnauthorizedError , BadRequestError} from "../Errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

//whenever user req get or post then first we verify valid token then uski req object mai userID and role attach kr denge
export const authenticateUser = async(req , res , next) => {
    const {token} = req.cookies;
    if(!token) throw new UnauthenticatedError('authentication invalid')

    try{
        const {userId , role} = verifyJWT(token);
        const testUser = userId === '656b5b0baa28bb576df9c53e';
        req.user = { userId , role , testUser};
        next();
    }
    catch(error){
        throw new UnauthenticatedError('authentication invalid')
    }
}

export const authorizePermissions = (...roles) => {
    console.log(roles);
    return (req , res , next) => {
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    }
}

export const checkForTestUser = ( req , res , next) => {
    if(req.user.testUser) throw new BadRequestError('Demo user read only');
    next();
}