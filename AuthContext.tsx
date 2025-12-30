import { createContext,useContext,useState } from "react";

const AuthContext=createContext()

export function AuthProvider({children}){
    const[user,setUser]=useState(null)
    function login(userData){
        setUser(userData)
    }
    function logout(){
        setUser(null)
    }
    return(
        <AuthContext.Provider value={{user,setUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)