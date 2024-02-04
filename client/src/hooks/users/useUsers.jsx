import { useQuery } from "react-query"
import {toast, useToasterStore} from 'react-hot-toast'
import { getAllUsersFromTheCloud } from "../../api/getAuthenticatedUser";

const useUsers = () => {
    const {data, isLoading, isError, refetch} = useQuery("users", async() => {
        try{
            const users = await getAllUsersFromTheCloud()
            console.log('success');
            return users
        }catch(error){
            console.log(error);
            toast.error(`Error: ${error.message}`);
            return null;
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

export default useUsers;