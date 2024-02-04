import toast from "react-hot-toast";
import { auth } from "../config/firebase.config";
import { baseURL } from "../utils/helpers";

 const getAuthenticatedUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if(userCred){
                userCred.getIdToken().then(async (token) => {
                    console.log("Token: ", token)
                    await fetch(`${baseURL}/validateUserJWTToken`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }).then(response => {
                        if(!response.ok){
                            reject(new Error(`Network response was not ok:  ${response.status}`))
                        }

                        return response.json()
                    }).then((data) => {
                        resolve(data.user);
                    })
                })
            }else{
                reject(new Error("User is not authenticated"));
            }

            unsubscribe();
        })
    })
 }

export default getAuthenticatedUser;


export const saveAppsDataToCloud = async (data) => {
    try{
        const res = await fetch(`${baseURL}/createNewApp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if(!res.ok){
            toast.error("Failed to create an app");
        }

        const resData = await res.json()

        return resData;
    }catch(error){
        toast.error(`Error: ${error}`)
    }
}

export const getAllAppsFromTheCloud = async() => {
    try{
        const res = await fetch(`${baseURL}/getAllApps`)
        if(!res.ok){
            toast.error('Failted to collect')
        }

        const apps = await res.json()
        return apps;
    }catch(error) {
        toast.error(`Error : ${error}`);
    }
}

export const deleteAppFromCloud = async (id) => {
    try{
        const res = await fetch(`${baseURL}/deleteAnApp?id=${id}`)

        if(!res.ok){
            toast.error("Failed to fetch")
        }

        const message = await res.json();
        return message;
    }catch(error){
        toast.error(`Error: ${error}`);
    }
}

export const getAllUsersFromTheCloud = async() => {
    try{
        const res = await fetch(`${baseURL}/getAllUsers`)
        if(!res.ok){
            toast.error("Could not fetch the users")
        }

        const users = await res.json()
        return users;
    }catch(error){
        toast.error(`Error: ${error}`);
    }
}

export const updateUserDataToTheCloud = async(data) => {
    try{
        const res = await fetch(`${baseURL}/updateTheUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data),
        });

        if(!res.ok){
            toast.error("Failed to fetch the users");
        }

        const resData = await res.json();
        return resData;
    }catch (error){
        toast.error(`Error: ${error}`);
    }
}