import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface ShowPasswordProps {
  showPassword: boolean;
}

const ShowPassword: React.FC<ShowPasswordProps> = ({ showPassword }) => {
  return (
    <>
      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
    </>
  );
}

export default ShowPassword;
