import { useEffect, useRef } from "react";
import { EarthController } from "./EarthController";

export function Earth() {
  const earthBoxRef = useRef();
  useEffect(() => {
    if (earthBoxRef.current) {
      const earth = new EarthController(earthBoxRef.current);
      earth.start();
    }
  }, []);
  return (
    <div className="quality-select">
      <div ref={earthBoxRef} className="earth"></div>
    </div>
  );
}
