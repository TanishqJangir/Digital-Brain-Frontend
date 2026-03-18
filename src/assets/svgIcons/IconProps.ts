import React from "react";
export interface IconProps {
    className?: string;
    onClick?: ((e: React.MouseEvent<SVGElement, MouseEvent>) => void) | (() => void);
}