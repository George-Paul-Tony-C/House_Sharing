// src/Layouts/AuthLayout.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children }) => {
  
  const pageVariants = {
    initial: {
      opacity: 0.5,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0.5,
      scale: 0.95,
    },
  };

  const pageTransition = {
    duration : 0.5 ,
    ease : "easeInOut",
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className=" flex items-center justify-center w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default AuthLayout;
