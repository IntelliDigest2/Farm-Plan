import React from "react";
import "./WaveLoader.css";
import { motion } from "framer-motion";

const loadingContainer = {
  width: "2rem",
  height: "2rem",
  display: "flex",
  justifyContent: "space-around",
};

const loadingCircle = {
  display: "block",
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "black",
  borderRadius: "0.25rem",
};

const loadingContainerVariants = {
  start: {},
  end: {},
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

export default function WaveLoader() {
  return (
    <motion.div
      style={loadingContainer}
      variant={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span style={loadingCircle} variant={loadingCircleVariants} />
      <motion.span style={loadingCircle} variant={loadingCircleVariants} />
      <motion.span style={loadingCircle} variant={loadingCircleVariants} />
    </motion.div>
  );
}
