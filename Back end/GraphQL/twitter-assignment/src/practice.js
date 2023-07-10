import {useEffect, useState} from "react";


export const Practce = () => {
    const [size,setsize] = useState(window.innerWidth);

    const handleResize = () => {
        setsize(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    },[]);

    return(
        <div>
            <h1>{size}</h1>
        </div>
    )
}