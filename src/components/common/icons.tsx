import type { SVGProps } from "react";

export const TikTokIcon = ({ size = 20, ...props }: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M16.5 3c.3 2.1 1.6 3.8 3.7 4.1v2.9c-1.4 0-2.7-.4-3.8-1.1v6.7c0 3.4-2.8 6.1-6.2 6-3.1-.1-5.6-2.7-5.6-5.8 0-3.4 2.8-6.1 6.2-6 .3 0 .5 0 .8.1v3c-.3-.1-.5-.1-.8-.1-1.6 0-2.9 1.4-2.9 3 0 1.6 1.3 2.9 2.9 2.9 1.6 0 3-1.3 3-2.9V3h2.7z" />
  </svg>
);
