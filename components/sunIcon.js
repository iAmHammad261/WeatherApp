import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SvgSun = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // This ensures the SVG scales correctly
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="sun_svg__lucide sun_svg__lucide-sun"
    {...props}
  >
    <Circle cx={12} cy={12} r={4} />
    <Path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Svg>
);
export default SvgSun;

