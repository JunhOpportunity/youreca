import Header from "../Components/Header";
import Loading from "../Components/Loading";
import FirstLogin from "./FirstLogin";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ListBundle = styled(motion.ul)`
  background-color: yellow;
`;

const List = styled(motion.li)`
  background-color: blue;
  width: 100px;
  height: 100px;
  color: white;
`;

const bundleVar = {
  open: {
    opacity: 1,
    y: 200,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  close: {
    transition: {
      delay: 0.5,
    },
    opacity: 1,
    y: 0,
  },
};


const variants = {
  open: {
    y: 20,
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.5,
    },
  },
  close: {
    y: 20,
    opacity: 0,
  },
};

export default function Profile() {
  const [value, setValue] = useState(5);

  const onChange = (event) => {
    const {
      target: { value},
    } = event;
      setValue(value);
  };

  

  return (
    <>
      <input value={value} onChange={onChange} type="range" min="0" max="10"/>
      {value}
    </>
  );
}
