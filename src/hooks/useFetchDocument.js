//react
import { useState, useEffect } from "react";

//firebase
import {
    doc,
    getDoc
 } from "firebase/firestore";

//db
import { db } from "../firebase/config.firebase";

export const useFetchDocument = (docCollection, id) => {

    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled]  = useState(false);

    useEffect(() => {

        async function loadDocument(){
            
            if(cancelled) return;

            setLoading(true);

            try{

                const docRef = await doc(db, docCollection, id);

                const docSnap = await getDoc(docRef);

                setDocument(docSnap.data());
                
                setLoading(false);
            }catch(err){
                console.log(err);
                setError(err.message);

                setLoading(false);
            };


        };
        
        loadDocument();

    }, [docCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {document, loading, error};

};