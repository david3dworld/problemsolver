import React from "react";
import { useFBX } from "@react-three/drei";
import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

function Model() {
  const fbx = useFBX("ProblemSolver.fbx");
  const ref = useRef();
  const { camera, mouse, size } = useThree();
  let position = size.width < 1460 ? [0, 2.5, 0] : [0, 0, 0];
  let scale = size.width < 1088 ? 0.02 : size.width < 1460 ? 0.035 : 0.043;

  useFrame(() => ref.current.lookAt(mouse.x, mouse.y, camera.position.z));
  return <primitive object={fbx} scale={scale} ref={ref} position={position} />; //put scale to 0.02
}

export default Model;
