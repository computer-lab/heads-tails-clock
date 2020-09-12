import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

import { sphericalCoordsToCartesian, latlngToSphericalCoords, calculateAngleForTime } from "../../lib";
import cities from "../../lib/cities.json";
import { Vector3, Matrix4 } from 'three'

import { EightSeriesHeadlights } from "./Headlights/EightSeriesHeadlights";
import { HeadlightBeams } from "./Headlights/HeadlightBeams";

export function LightGlobe () {
  const group = useRef();
  const [rotation, setRotation] = useState()

  useFrame(() => {
    const r = calculateAngleForTime()
    setRotation(r)
    group.current.rotation.y = r
  });

  const RADIUS = 3;
  const locations = cities
    .filter(c => c.render)
    .map(({ lat, lng, name }) => {
      const [inc, azm ] = latlngToSphericalCoords(lat, lng)
      const position = sphericalCoordsToCartesian(RADIUS, inc, azm);
      const pos = new Vector3(...position)
      const worldPos = pos.applyMatrix4(new Matrix4().makeRotationY(rotation))
      const lightOn = !!(worldPos.x > 0.1)
      return {
        position,
        name,
        lightOn
      }
    })

  return (
    <group ref={group}>
      <EightSeriesHeadlights locations={locations} />
      <HeadlightBeams locations={locations} />
    </group>
  )
  ;
};
