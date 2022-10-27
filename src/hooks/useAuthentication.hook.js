//firebase config
import {db} from '../firebase/config.firebase';

//firebase auth
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

//react
import {useState, useEffect} from 'react';

export const useAuthenthication = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup
        //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled(){
        if(cancelled) return;
    };

    const createUser = async (data) => {

        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try{

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
                
            await updateProfile(user, {
                displayName: data.displayName
            });
                
            setLoading(false);
                
        }catch(err){

            console.error(err.message);
            console.error(typeof err.message);

            let systemErrorMessage

            if(err.message.includes("Password")){

                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";

            }else if(err.message.includes("email-already")){

                systemErrorMessage = "E-mail já cadastrado.";

            } else{
                systemErrorMessage = "Ocorreu um erro, por favor, tente novamente mais tarde";
            };
            
            setLoading(false);
            setError(systemErrorMessage);
        };


    };

    // logout - sign out

    const logout = () => {

        checkIfIsCancelled();
        signOut(auth);

    };

    // login - sign in

    const login = async (data) => {

        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try{

            await signInWithEmailAndPassword(auth, data.email, data.password);

            setLoading(false);

        }catch(err){

            let systemErrorMessage

            if(err.message.includes('user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado'
            } else if(err.message.includes('wrong-password')){
                systemErrorMessage = "Senha incorreta."
            } else {
                systemErrorMessage = 'Ocorreu um erro, por favor, tente mais tarde'
            };

            setError(systemErrorMessage);
            setLoading(false);

        }

    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);


    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };
};