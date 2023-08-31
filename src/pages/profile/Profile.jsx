import './Profile.scss';
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from '../../Components/Posts/Posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Update from '../../Components/Update/Update';


const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [err, setErr] = useState(null);


  const userId = parseInt(useLocation().pathname.split('/')[2]);

  const { currentUser } = useContext(AuthContext);

  const { UpdateUser } = useContext(AuthContext);


  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);


  const { isLoading, error, data } = useQuery(['users'], () =>
    makeRequest.get('/users/find/' + userId).then((res) => {
      setErr(error);
      return res.data;
    })
  );


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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setErr(error.response.data)
    }

  }

  return (
    <>
      <div className="profile" >
        {isLoading ? ("Loading") :
          (<>
            <div className="images">
              <img
                src={data.coverPic ? "/upload/" + data.coverPic : "/upload/user Default image.png"}
                alt=""
                className="cover"
              />
              <img
                src={data.profilePic ? "/upload/" + data.profilePic : "/upload/user Default image.png"}
                alt=""
                className="profilePic"
              /></div>

            <div className="profileContainer">
              <div className="uInfo">
                <div className="left">
                  <a href="http://facebook.com">
                    <FacebookTwoToneIcon fontSize="large" />
                  </a>
                  <a href="http://instagram.com">
                    <InstagramIcon fontSize="large" />
                  </a>
                  <a href="http://twitter.com">
                    <TwitterIcon fontSize="large" />
                  </a>
                  <a href="http://linkedIn.com">
                    <LinkedInIcon fontSize="large" />
                  </a>
                  <a href="http://pinterest.com">
                    <PinterestIcon fontSize="large" />
                  </a>
                </div>
                <div className="center">
                  <span>{data.name}</span>
                  <div className="info">
                    <div className="item">
                      <PlaceIcon />
                      <span>{data.city}</span>
                    </div>
                    <div className="item">
                      <LanguageIcon />
                      <span>{data.website}</span>
                    </div>
                  </div>
                  {rIsLoading ? (
                    "loading"
                  ) : userId === currentUser.id ? (
                    <button onClick={() => setOpenUpdate(true)}>Update</button>
                  ) : (<button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}</button>)}
                </div>
                <div className="right">
                  <EmailOutlinedIcon />
                  <MoreVertIcon className='MoreVertIcon' onClick={() => setMenuOpen(!menuOpen)} />
                  {menuOpen && userId === currentUser.id && (
                    <button onClick={handleLogout}>Logout</button>
                  )}
                </div>

              </div>
              <Posts userId={userId} />
            </div>
          </>)
        }
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </>
  )
}

export default Profile
