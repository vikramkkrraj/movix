import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../utils/api";


export const useFetch = (url) => {
    const [data, setDate] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading('loading...');
        setDate(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res)=>{
                setLoading(false);
                setDate(res);
            })
            .catch((err)=>{
                setLoading(false);
                setError("Something went wrong...!")
            });
    },[url]);

    return { data, loading , error};
};