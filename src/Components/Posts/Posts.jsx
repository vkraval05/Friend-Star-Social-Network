import React from 'react'
import './Posts.scss'
import Post from '../post/Post';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../axios';


const Posts = (props) => {

    const { isLoading, error, data } = useQuery(['posts'], () =>
        makeRequest.get("/posts/" + props.userId).then((res) => {
            return res.data;
        })
    );

    return (
        <div className='posts'>
            {error ? "Something went wrong!"
                : isLoading
                    ? "loading"
                    : data.map((post) => <Post posst={post} key={post.id} />)}
        </div>
    )
}

export default Posts
