import * as React from "react"

const TrendingSvg= (props:any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                fill="#fff"
                d="M21 7c.01-.07.01-.14 0-.21a.639.639 0 0 0-.05-.17 1.097 1.097 0 0 0-.09-.14.748.748 0 0 0-.14-.17l-.12-.07a.689.689 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 1 0 0 2h2.83l-4 4.71-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 1.195 1.546 1 1 0 0 0 .345-.266l4.45-5.34 4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 0 0 2 0V7Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default TrendingSvg

