import toast from "react-hot-toast";
import {useQuery} from "react-query"
import { getAllAppsFromTheCloud } from "../../api/getAuthenticatedUser";

const useApps = () => {
    const {data, isLoading, isError, refetch} = useQuery(
        "apps", async() => {
            try{
                const apps = await getAllAppsFromTheCloud();
                return apps;
            }catch(error){
                console.log(error);
                toast.error(`Error apps: ${error}`);
                return null;
            }
        },
    {refetchOnWindowFocus: false}
    );

    return {data, isLoading, isError, refetch};
}

export default useApps;