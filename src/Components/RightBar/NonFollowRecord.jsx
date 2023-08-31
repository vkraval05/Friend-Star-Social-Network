import React, { useContext, useEffect, useState } from 'react'
import './RightBar.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const NonFollowRecord = () => {
    const { currentUser } = useContext(AuthContext);

    const [nonFollowData1, setNonFollowData1] = useState([]);
    const [userId, setUserId] = useState(null);

    const { isLoading: nIsLoading, error: nerror, data } = useQuery(['users'], () =>
        makeRequest.get('/users/nonFollow/').then((res) => {
            setNonFollowData1(res.data)
            return res.data;
        })
    );

    useEffect(() => {
        setNonFollowData1(data);
    }, [userId])


    console.log(userId);


    const { isLoading: rIsLoading, data: relationshipData } = useQuery(['relationships'], () =>
        makeRequest.get('/relationships?followedId=' + userId).then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (following) => {
            if (following) return makeRequest.delete("/relationships?userId=" + userId);
            return makeRequest.post("/relationships", { userId });
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["relationships"]);
            },
        }
    );

    const handleFollow = () => {
        mutation.mutate(relationshipData.includes(currentUser.id));
    }

    return (
        <>
            {nonFollowData1?.map((datas) => {
                return (<div className="user" key={datas.id}>
                    <NavLink className="userInfo" to={`/profile/${datas.id}`}>
                        <img src={datas.profilePic ? "/upload/" + datas.profilePic : "/upload/user Default image.png"} alt="" />
                        <span>{datas.name}</span>
                    </NavLink>
                    <div className="buttons" onFocus={() => setUserId(datas.id)}>
                        {rIsLoading ? (
                            "loading"
                        ) : (<button onClick={(datas) => handleFollow(datas.id)}>
                            {relationshipData?.includes(currentUser.id) && !nonFollowData1
                                ? "Following"
                                : "Follow"}</button>)}
                    </div>
                </div>)
            })}
        </>
    )
}

export default NonFollowRecord
