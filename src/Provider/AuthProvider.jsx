import  { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()
    const googleProvider = new GoogleAuthProvider()
    // createUser 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signin
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google signin
    const googleSignin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)

    }
    // Update Profile
    const updateUserProfile = (name, photoURL) =>{
        return  updateProfile(auth.currentUser, {
              displayName: name ,
              photoURL: photoURL
            })
            
      }
    
    // logout 
    const logOut = () => {
        setLoading(true)
       return signOut(auth)
    }

 
    useEffect(() => {
     const unSubscribe =   onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser);
            if (currentUser) {
                // get token and store
                const userInfo = {email : currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }else{
                // remove token
                    localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return () => {
            return unSubscribe()
        }
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        googleSignin,
        signIn,
        updateUserProfile,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

// Prop validation for AuthProvider component
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
