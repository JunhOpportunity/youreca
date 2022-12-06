import Header from "../Components/Header";
import Loading from "../Components/Loading";
import FirstLogin from "./FirstLogin";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const ListBundle = styled(motion.ul)``;

const List = styled(motion.li)``;



export default function Profile() {
  const [isOpen, setIsOpen] = useState(true);
  
  const bundleVar = {
    open: {
      opacity: 1,
      
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.5,
      },
    },
    close: {
      opacity: 0,
      
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.5,
      },
    },
  };
  
  const variants = {
    open: {
      x: 0
    },
    close: {
      x: window.innerWidth
    }
  };
  return (
    <>
      <div
        onClick={() => {
          setIsOpen((e) => !e);
        }}
      >
        toggle
      </div>
      <ListBundle variants={bundleVar} initial={false} animate={isOpen ? "open" : "close"} >
        <List variants={variants} animate={isOpen ? "open" : "close"}>A</List>
        <List variants={variants} animate={isOpen ? "open" : "close"}>B</List>
        <List variants={variants} animate={isOpen ? "open" : "close"}>C</List>
        <List variants={variants} animate={isOpen ? "open" : "close"}>D</List>
      </ListBundle>
    </>
  );
}
