import React, { useEffect, useState } from 'react'
import './RightBar.scss';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { NavLink } from 'react-router-dom';
import NonFollowRecord from './nonFollowRecord';

const RightBar = () => {

  const [loading, setLoading] = useState(false)
  const [data1, setData1] = useState([])

  const { isLoading, error, data } = useQuery(['user'], () =>
    makeRequest.get('/users/all/').then((res) => {
      return res.data;
    })
  );


  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    setData1(data);
  }, [data])

  return (
    <div className='rightBar'>
      {!loading ? ("Loading") : (<>
        <div className="container">
          <div className="item">
            <span>Suggestion For You</span>
            <>
              {/* <NonFollowRecord /> */}
              {data1?.map((datas, index) => {
                return (<div className="user" key={datas.id}>
                  <NavLink className="userInfo" to={`/profile/${datas.id}`}>
                    <img src={datas.profilePic ? "/upload/" + datas.profilePic : "/upload/user Default image.png"} alt="" />
                    <span>{datas.name}</span>
                  </NavLink>
                  <div className="buttons" onFocus={() => setUserId(datas.id)}>
                    <button>Follow</button>
                  </div>
                </div>)
              })}

            </>
          </div>
          <div className="item">
            <span>Letest Activity</span>
            {data1?.map((user, index) => {
              return (<div className="user" key={index}>
                <NavLink className="userInfo" to={`/profile/${user.id}`}>
                  <img src={user.profilePic ? "/upload/" + user.profilePic : "/upload/user Default image.png"} alt="" />
                  <p>
                    <span>{user.name}</span>
                    Changed their Covor page
                  </p>
                </NavLink>
                <div className="buttons">
                  <span>some min ago</span>
                </div>
              </div>)
            })
            }
          </div>
          <div className="item">
            <span>Online Friends</span>
            {data1?.map((users) => {
              return <div className="user" key={users.id}>
                <NavLink className="userInfo" to={`/profile/${users.id}`}>
                  <img src={users.profilePic ? "/upload/" + users.profilePic : "/upload/user Default image.png"} alt="" />
                  <div className="online"></div>
                  <span>{users.name}</span>
                </NavLink>
              </div>
            })
            }
          </div>

        </div>
      </>)}
    </div>
  )
}

export default RightBar
