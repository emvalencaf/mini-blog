//react
import { useState, useEffect } from "react";

//firebase
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

//db
import { db } from "../firebase/config.firebase";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled]  = useState(false);

    useEffect(() => {

        async function loadData(){
            
            if(cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try{

                let q;

                //search

                //dashboard
                if(search){
                    
                    q = await query(collectionRef, where("tags", "array-contains", search), orderBy('createdAt', 'desc'));

                } else{
                    q = await query(collectionRef, orderBy('createdAt', 'desc'));

                }



                await onSnapshot(q, (querySnapshot) => {

                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    );

                });

                setLoading(false);

            }catch (err){
                console.error(err);
                setError(error.message);

                setLoading(false);
            };

        };
        
        loadData();

    }, [docCollection, documents, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {documents, loading, error};

};