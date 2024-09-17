import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgWind = (props) => (
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
    className="wind_svg__lucide wind_svg__lucide-wind"
    {...props}
  >
    <Path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2" />
  </Svg>
);
export default SvgWind;

