import axios from "axios";
import { useEffect, useState } from "react";
export default function DataFetching(){
    const [posts, setPosts]=useState([])
    useEffect(()=>{
        axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(res=>{
            console.log(res)
            setPosts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[]);
    return (<div>
        <ul>
            {
                posts.map(post=><li key={post.id}>{post.title}</li>)
            }
        </ul>
    </div>);
}