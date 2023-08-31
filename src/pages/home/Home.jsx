import React, { useContext } from 'react'
import './Home.scss'
import Stories from '../../Components/Stories/Stories'
import Share from '../../Components/Share/Share'
import { AuthContext } from '../../Context/AuthContext'
import AllPosts from '../../Components/Posts/AllPosts'

const Home = () => {
  
  return (
    <div className='home body'>
      <Stories />
      <Share />
      <AllPosts />
    </div>
  )
}

export default Home
