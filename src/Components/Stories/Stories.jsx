import React, { useContext, useEffect, useRef, useState } from 'react'
import './Stories.scss'
import { AuthContext } from '../../Context/AuthContext';
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CloseIcon from '@mui/icons-material/Close';
import WatchSrory from './WatchSrory';


const Stories = () => {
    const { currentUser } = useContext(AuthContext);
    const [watchSrory, setWatchSrory] = useState(false);
    const [file, setFile] = useState(null);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const { isLoading, error, data } = useQuery(['stories'], () =>
        makeRequest.get("/stories/").then((res) => {
            return res.data;
        })
    );
    console.log(data);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newStory) => {
            return makeRequest.post("/stories", newStory);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["stories"]);
            },
        }
    );


    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({ image: imgUrl });
        setFile(null);
    };


    let name = file ? file.name : "nun.jpg";
    let dotIndex = name.lastIndexOf(".");
    let partAfterDot = name.substring(dotIndex + 1);


    const videoRef = useRef();

    const handleEnter = () => {
        videoRef.current.play();
    };
    const handleLeave = () => {
        videoRef.current.pause();
    }

    console.log(file + partAfterDot);
    return (
        <>
            <div className="smain">
                <div className='stories'>
                    <div className="storys">
                        <div className="story">
                            <img src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "/upload/user Default image.png"} alt="user Profile Picture" />
                            <span>{currentUser.name}</span>
                            <input
                                type="file"
                                id="story"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <label htmlFor="story">
                                <span className='button'>+</span>
                            </label>
                        </div>
                        {data?.map((story) => {
                            let name = story.img;
                            let dotIndex = name.lastIndexOf(".");
                            let partAfterDot = name.substring(dotIndex + 1);
                            return (
                                <div className="story" key={story.id} onClick={() => setWatchSrory(true)}>
                                    {partAfterDot === 'mp4' ?
                                        <video ref={videoRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave} tabIndex="0" loop controls=''>
                                            <source src={'/upload/' + story.img} type="video/mp4" />
                                        </video> :
                                        <img src={'/upload/' + story.img} alt="" />}
                                    <span>{story.name}</span>
                                </div>
                            )
                        })
                        }

                    </div>
                </div>
                {file && <div className="addStory">
                    <div className="wrapper">
                        {
                            partAfterDot === 'mp4' ?
                                <video className="file" alt="" src={URL.createObjectURL(file)} ></video>
                                : <img className="file" style={{height:'100vh'}} alt="" src={URL.createObjectURL(file)} />
                        }

                        <div className="close" onClick={() => { setFile(null) }}>
                            <CloseIcon />
                        </div>

                        <div className="submit">
                            <button onClick={handleClick}>SHARE</button>
                        </div>
                    </div>
                </div>}
                {watchSrory && <WatchSrory story={data} setWatchSrory={setWatchSrory} />}
            </div>

        </>
    )
}

export default Stories
