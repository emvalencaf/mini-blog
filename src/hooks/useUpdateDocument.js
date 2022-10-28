// hooks
import {useState, useEffect, useReducer} from 'react';

//firebase
import { updateDoc, doc } from 'firebase/firestore';

//db
import {db} from '../firebase/config.firebase';

const initialState = {
    loading: null,
    error: null
};

const updateReducer = (state, action) => {

    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                error: null
            };
        case 'UPDATED_DOC':
            return {
                loading: false,
                error: null
            };
        case 'ERROR':
            return {
                loading: false, error: action.payload
            };
        default:
            return state;
    };

};

export const useUpdateDocument = (docCollection) => {

    
    const [ response, dispatch ] = useReducer(updateReducer, initialState);
    
    // deal with memory leak
    const [cancelled, setCancelled]  = useState(false);
    
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) dispatch(action);
    };
    
    const updateDocument = async (id, data) => {
        
        checkCancelBeforeDispatch({
            type: 'LOADING'
        });
        
        try{

            const docRef = await doc(db, docCollection, id);

            const updatedDocument = await updateDoc(docRef, data);

            checkCancelBeforeDispatch({
                type:"INSERTED_DOC",
                payload: updatedDocument
            });

        } catch(err){

            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: err.message
            });

        };

    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { updateDocument, response };
};