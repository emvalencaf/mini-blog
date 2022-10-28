// hooks
import {useState, useEffect, useReducer} from 'react';

//firebase
import { doc, deleteDoc } from 'firebase/firestore';

//db
import {db} from '../firebase/config.firebase';

const initialState = {
    loading: null,
    error: null
};

const deleteReducer = (state, action) => {

    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                error: null
            };
        case 'DELETED_DOC':
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

export const useDeleteDocument = (docCollection) => {

    
    const [ response, dispatch ] = useReducer(deleteReducer, initialState);
    
    // deal with memory leak
    const [cancelled, setCancelled]  = useState(false);
    
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) dispatch(action);
    };
    
    const deleteDocument = async (id) => {
        
        checkCancelBeforeDispatch({
            type: 'LOADING'
        });
        
        try{

            const deletedDocument = await deleteDoc(doc(db, docCollection, id));


            checkCancelBeforeDispatch({
                type:"DELETED_DOC",
                payload: deletedDocument
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

    return { deleteDocument, response };
};