import { useContext, useState } from 'react';
import './Comment.scss'
import { AuthContext } from '../../Context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';

const Comment = ({ postId }) => {

    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState('');


    const { isLoading, error, data } = useQuery(["comment"], () =>
        makeRequest.get("/comments?postId=" + postId).then((res) => {
            return res.data;

        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["comment"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");
    };

    return (
        <div className='Comments'>
            <div className="write">
                <img src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "/upload/user Default image.png"} alt="" />
                <input type="text" placeholder='Write an comment...' value={desc} onChange={(e) => setDesc(e.target.value)} />
                <button onClick={handleClick}>Send</button>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                    ? "loading"
                    : data?.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <img src={comment.profilePic ? "/upload/" + comment.profilePic : "/upload/user Default image.png"} alt="" />
                            <div className="info">
                                <span>{comment.name}</span>
                                <p>{comment.description}</p>
                            </div>
                            <span className="date">
                                {moment(comment.createdAt).fromNow()}
                            </span>
                        </div>

                    ))}

        </div>
    )
}

export default Comment
