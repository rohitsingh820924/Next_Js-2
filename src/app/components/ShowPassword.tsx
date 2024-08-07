import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const ShowPassword = ({ showPassword }) => {
  return (
    <>
      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
    </>
  );
}

export default ShowPassword;
