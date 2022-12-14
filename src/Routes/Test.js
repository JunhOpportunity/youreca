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

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }
  ::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }
`;

export default function Profile() {
  const [value, setValue] = useState(1);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  return (
    <>
      <Loading/>
    </>
  );
}
