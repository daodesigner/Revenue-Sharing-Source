/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/mask.glb -t -r public --draco 
*/

import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
   nodes: {
      Hair: THREE.Mesh;
      Mask: THREE.Mesh;
      Wire: THREE.Mesh;
   };
   materials: {
      Hair: THREE.MeshStandardMaterial;
      ['Face - Wood']: THREE.MeshStandardMaterial;
      Wire: THREE.MeshStandardMaterial;
   };
};

export function Mask(props: JSX.IntrinsicElements['group']) {
   const { nodes, materials } = useGLTF('/models/mask.glb') as GLTFResult;
   return (
      <group {...props} dispose={null}>
         <mesh
            geometry={nodes.Hair.geometry}
            material={materials.Hair}
            rotation={[1.463, -0.102, 0.754]}
         />
         <mesh
            geometry={nodes.Mask.geometry}
            material={materials['Face - Wood']}
            rotation={[1.463, -0.102, 0.754]}
         />
         <mesh
            geometry={nodes.Wire.geometry}
            material={materials.Wire}
            rotation={[1.463, -0.102, 0.754]}
         />
      </group>
   );
}

useGLTF.preload('/models/mask.glb');
