import React from 'react'

const Profile = ({params}: any) => {
  return (
    <div>Profile
        <p>page id: {params.id}</p>
    </div>
  )
}

export default Profile