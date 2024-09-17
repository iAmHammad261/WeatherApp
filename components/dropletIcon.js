import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgDroplet = (props) => (
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
    className="droplet_svg__lucide droplet_svg__lucide-droplet"
    {...props}
  >
    <Path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7" />
  </Svg>
);
export default SvgDroplet;

