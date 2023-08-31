import React, { useContext } from 'react'
import './LeftBar.scss'
import item1 from '../../assets/Item1.json';
import item2 from '../../assets/Item2.json';
import item3 from '../../assets/Item3.json';
import { AuthContext } from '../../Context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser === null) {
      navigate("/login")
  }
  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <NavLink className="user" to={`/profile/${currentUser.id}`}>
            <img src={currentUser.profilePic ? "/upload/"+ currentUser.profilePic : "/upload/user Default image.png"} alt="abc" />
            <span>{currentUser.name}</span>
          </NavLink>
          {item1.map((items, index) => {
            return <div className="item" key={index}>
              <img src={items.imageUrl} alt={items.name} />
              <span>{items.name}</span>
            </div>
          })}
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          {item2.map((items, index) => {
            return <div className="item" key={index}>
              <img src={items.imageUrl} alt={items.name} />
              <span>{items.name}</span>
            </div>
          })}
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          {item3.map((items, index) => {
            return <div className="item" key={index}>
              <img src={items.imageUrl} alt={items.name} />
              <span>{items.name}</span>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default LeftBar
