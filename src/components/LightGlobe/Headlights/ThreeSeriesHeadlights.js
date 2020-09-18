import React, { useEffect, useRef, createRef } from 'react'
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { draco, Detailed } from "drei";
import { BackSide } from "three";
import { WebcamImageManager } from "../../WebcamImageManager";

const hkSrc = 'https://tdcctv.data.one.gov.hk/K107F.JPG?';
const nycSrc = 'http://207.251.86.238/cctv884.jpg?';

export function ThreeSeriesHeadlights ({ locations }) {
  const { nodes } = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/series-3-textured.glb",
    draco(process.env.PUBLIC_URL + "/draco-gltf/")
  );

  console.log('nodes:', nodes);

  const { nodes: lowDetailNodes } = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/series-3-low-lod.glb",
    draco(process.env.PUBLIC_URL + "/draco-gltf/")
  );

  const refs = useRef(locations.map(() => createRef()))

  useEffect(() => {
    for (const r of refs.current) {
      r.current.lookAt(0,0,0)
      // r.current.rotateX(Math.PI / 2)
      r.current.rotateY( 5 * Math.PI / 4)
      // r.current.rotateZ(Math.PI / 4)
    }
  }, [])

  const meshObjects = locations.map(({ position, name, lightOn }, i) => {
    return (
      <group scale={[0.02, 0.02, 0.02 ]} key={name} position={position} ref={refs.current[i]}>
        <mesh visible geometry={lowDetailNodes['visor'].geometry}>
          <meshPhysicalMaterial
            attach="material"
            color={0xeeeeee}
            roughness={0.05}
            clearcoat={0.9}
            metalness={0.9}
            opacity={1}
            transmission={0.6}
            transparent
            depthWrite={false}
          />
        </mesh>
        <mesh visible geometry={nodes['bulbs'].geometry}>
          <meshStandardMaterial
            attach="material"
            roughness={0.3}
            metalness={0.5}
            map={nodes['bulbs'].material.map}
            emissive={lightOn ? 0xaaaaff : 0x000000}
          />
        </mesh>
        <Detailed distances={[0, 6]}>
          <mesh visible geometry={nodes['headlight-simpler'].geometry}>
            <meshStandardMaterial
              attach="material"
              // color={0x666666}
              roughness={0.3}
              metalness={0.7}
              map={nodes['headlight-simpler'].material.map}
            />
          </mesh>
          <mesh visible geometry={lowDetailNodes['headlight-simpler'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0x666666}
              roughness={0.3}
              metalness={0.7}
              lightMap={nodes['headlight-simpler'].material.map}
              lightMapIntensity={2}
            />
          </mesh>
        </Detailed>
        <Detailed distances={[0, 3]}>
          <mesh>
            <mesh visible geometry={nodes['griddy-thing'].geometry}>
              <meshPhysicalMaterial
                attach="material"
                color={0xddeeff}
                roughness={0.2}
                metalness={0.8}
                emissive={lightOn ? 0xaaaaff : 0x000000}
                opacity={1}
                transparent
                transmission={0.94}
                depthWrite={false}
              />
            </mesh>
            <mesh visible geometry={nodes['griddy-thing'].geometry}>
              <meshPhysicalMaterial
                attach="material"
                color={0xddeeff}
                roughness={0.2}
                metalness={0.8}
                emissive={lightOn ? 0xaaaaff : 0x000000}
                opacity={1}
                transparent
                transmission={0.4}
                depthWrite={false}
                side={BackSide}
              />
            </mesh>
          </mesh>
          <mesh visible geometry={lowDetailNodes['griddy-thing'].geometry}>
            <meshPhysicalMaterial
              attach="material"
              color={0xddeeff}
              roughness={0.2}
              metalness={0.8}
              emissive={lightOn ? 0xaaaaff : 0x000000}
              opacity={1}
              transparent
              transmission={0.4}
              depthWrite={false}
            />
          </mesh>
        </Detailed>
        <Detailed distances={[0, 3]}>
          <mesh visible geometry={nodes['top-light'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0xeeffff}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          <mesh visible geometry={lowDetailNodes['top-light'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0xeeffff}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Detailed>
        <Detailed distances={[0, 6]}>
          <mesh visible geometry={nodes['top-light-2'].geometry}>
            <meshStandardMaterial
              attach="material"
              // color={0xddddff}
              roughness={0.1}
              metalness={0.8}
              map={nodes['top-light-2'].material.map}
            />
          </mesh>
          <mesh visible geometry={lowDetailNodes['top-light-2'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0xddddff}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Detailed>
        <Detailed distances={[0, 6]}>
          <mesh visible geometry={nodes['outer-liner'].geometry}>
            <meshStandardMaterial
              attach="material"
              // color={0x666666}
              roughness={0.1}
              metalness={0.8}
              map={nodes['outer-liner'].material.map}
            />
          </mesh>
          <mesh visible geometry={lowDetailNodes['outer-liner'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0x666666}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Detailed>
        <Detailed distances={[0, 6]}>
          <mesh visible geometry={nodes['hanger'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0x8888ff}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          <mesh visible geometry={lowDetailNodes['hanger'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0x8888ff}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Detailed>
        <Detailed distances={[0, 6]}>
          <mesh visible geometry={nodes['griddy-thing-case'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0x999999}
              roughness={0.1}
              metalness={0.8}
              map={nodes['griddy-thing-case'].material.map}
            />
          </mesh>
          <mesh visible geometry={lowDetailNodes['griddy-thing-case'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0x999999}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Detailed>
        <Detailed distances={[0, 6]}>
          <mesh visible geometry={nodes['inner-body'].geometry}>
            <meshStandardMaterial
              attach="material"
              roughness={0.1}
              metalness={0.8}
              map={nodes['inner-body'].material.map}
            />
          </mesh>
          <mesh visible geometry={lowDetailNodes['inner-body'].geometry}>
            <meshStandardMaterial
              attach="material"
              color={0x999999}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        </Detailed>
      </group>
    )})
  return (
    <group>
      {meshObjects}
    </group>
  );
}
