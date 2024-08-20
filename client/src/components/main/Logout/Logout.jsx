import { useAuth } from "../../../Context/authContext"


export default function logout (){

    const { logoutHandler } = useAuth();
    logoutHandler()           
    return ;
            				
}