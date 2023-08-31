import React from 'react'
import './Posts.scss';
import Post from '../post/Post';
import { makeRequest } from '../../axios';
import { useQuery } from '@tanstack/react-query';

const AllPosts = () => {
    const { isLoading: pIsLoading, error: perror, data: Pdata } = useQuery(['posts'], () =>
        makeRequest.get("/posts/allPost").then((res) => {
            return res.data;
        })
    );
    return (
        <div className='posts'>
            {perror ? "Something went wrong!"
                : pIsLoading 
                    ? "loading"
                    : Pdata.map((post) => <Post posst={post} key={post.id} />)}
        </div>
    )
}

export default AllPosts
