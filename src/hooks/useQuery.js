//react
    //hooks
        //react
import { useMemo } from 'react';
        //react-router-dom
import { useLocation } from 'react-router-dom';


export function useQuery(){
    
    const {search} = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
};