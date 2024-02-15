import { SVGProps } from "react";
import * as icon from "assets/icons/index";
import "styles/Icon.style.css";

type IconNameType = keyof typeof icon;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconNameType;
  size?: number;
  width?: number | string;
  height?: number | string;
}

const DEFAULT_SIZE = 24;

export default function Icon({
  name,
  size = DEFAULT_SIZE,
  width,
  height,
  ...rest
}: IconProps) {
  const SVGIcon = icon[name];

  return (
    <SVGIcon
      {...rest}
      style={{
        width: `${width ? `${width}` : `${size}px`}`,
        height: `${height ? `${height}` : `${size}px`}`,
      }}
    />
  );
}
