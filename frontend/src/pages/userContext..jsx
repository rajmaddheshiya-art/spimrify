import { createContext } from "react";
export const dataContext = createContext()
function UserContext({children}){

    const serverURL = "http://192.168.43.163:8000"

    const value={
        serverURL
    }

    return(
        <dataContext.Provider value={value}>
           {children}
        </dataContext.Provider>
    )
}

export default UserContext