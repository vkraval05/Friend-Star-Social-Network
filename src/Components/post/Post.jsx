import React, { useContext, useEffect, useRef, useState } from 'react'
import './Post.scss';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { NavLink, useNavigate } from 'react-router-dom';
import Comment from '../Comment/Comment';
import moment from 'moment';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from '../../axios';
import { AuthContext } from '../../Context/AuthContext';


const Post = ({ posst }) => {

    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(['likes', posst.id], () =>
        makeRequest.get('/likes?postId=' + posst.id).then((res) => {
            return res.data;
        })
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser === null) {
            navigate("/login")
        }
    }, [currentUser]);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?postId=" + posst.id);
            return makeRequest.post("/likes", { postId: posst.id });
        },
        {
            onSuccess: () => {
    
                queryClient.invalidateQueries(["likes"]);
            },
        }
    );

    const handelLike = () => {
        mutation.mutate(data.includes(currentUser.id))
    }

    const deleteMutation = useMutation(
        (postId) => {
            return makeRequest.delete("/posts?postId=" + postId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleDelete = () => {
        deleteMutation.mutate(posst.id)
    }


    let name = posst.image;
    let dotIndex = name.indexOf(".");
    let partAfterDot = name.substring(dotIndex + 1);

    const videoRef = useRef();

    const handleEnter = () => {
        videoRef.current.play();
    };
    const handleLeave = () => {
        videoRef.current.pause();
    }


    return (
        <div className='post'>
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={posst.profilePic ? "/upload/" + posst.profilePic : "/upload/user Default image.png"} alt="pp" />
                        <div className="details">
                            <NavLink to={`/profile/${posst.userId}`} style={{ textDecoration: "none", color: 'inherit' }}>
                                <span>{posst.name}</span>
                            </NavLink>
                            <span className='date'>{moment(posst.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon className='moreHorizIcon' onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && posst.userId === currentUser.id && (
                        <button onClick={handleDelete}>delete</button>
                    )}
                </div>
                <div className="content">
                    <p>{posst.description}</p>
                    <div onDoubleClick={handelLike}>
                        {partAfterDot === 'mp4' ?
                            <video ref={videoRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave} tabIndex="0" loop controls=''>
                                <source src={'/upload/' + posst.image} type="video/mp4" />
                            </video> :
                            <img src={'/upload/' + posst.image} alt="" />}
                    </div>
                </div>
                <div className="info">
                    <div className="item">
                        {data?.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{ color: "red" }} onClick={handelLike} /> : <FavoriteBorderOutlinedIcon onClick={handelLike} />}
                        {data?.length} likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        Comment
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comment postId={posst.id} />}
            </div>
        </div>
    )
}

export default Post
