import { useQuery } from "react-query"
import getAuthenticatedUser from "../../api/getAuthenticatedUser"
import {toast, useToasterStore} from 'react-hot-toast'

const useUser = () => {
    const {data, isLoading, isError, refetch} = useQuery("user", async() => {
        try{
            const userDetail = await getAuthenticatedUser()
            console.log('success');
            return userDetail
        }catch(error){
            if(!error.message.includes("not authenticated")){
                toast.error(error);
            }
        }
    }, {
        refetchOnWindowFocus: false,
    }
    );
    return{
        data, 
        isLoading, 
        isError, 
        refetch
    };


};

export default useUser;