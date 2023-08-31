import React, { useContext, useState } from 'react'
import Stories from 'react-insta-stories';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { AuthContext } from '../../Context/AuthContext';



const WatchSrory = ({ story, setWatchSrory }) => {
    const { currentUser } = useContext(AuthContext);

    const [menuOpen, setMenuOpen] = useState(false);
    let stories = [];
    story.map((sdoc) => {
        stories.push({ url: `/upload/` + sdoc.img, name: sdoc.name })
    })
    console.log(stories);

    return (
        <div className='addStory' style={{ height: '100vh' }}>
            <Stories
                stories={stories}
                defaultInterval={2000}
                keyboardNavigation={true}
            />
            {/* <span>{ssry.name}</span> */}
            <div style={{ position: 'relative' }}>
                <CloseIcon className="closeIcon" onClick={() => { setWatchSrory(false) }} />
                {/* {story.id === currentUser.id && (<>
                    <MoreHorizIcon className='moreHorizIcon' onClick={() => setMenuOpen(!menuOpen)} />
                    menuOpen &&(<button onClick={handleDelete}>delete</button>)
                </>
                )} */}
            </div>
        </div>

    )
}

export default WatchSrory
