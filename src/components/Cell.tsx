import { CellType } from "../types"

type CellProps = {
    type: CellType;
    click: () => void; 
}
export default function Cell(props: CellProps) {
    let content;
    if (props.type === "entrance") {
        content = ( 
            <svg height="100%" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame 1">
                    <path id="Arrow" d="M0.5 24V19C0.5 18.4477 0.947715 18 1.5 18H12C12.5523 18 13 17.5523 13 17V12.1655C13 11.3126 13.9992 10.8512 14.6485 11.4043L25.6064 20.7388C26.0751 21.138 26.0751 21.862 25.6064 22.2612L14.6485 31.5958C13.9992 32.1488 13 31.6874 13 30.8345V26C13 25.4477 12.5523 25 12 25H1.5C0.947715 25 0.5 24.5523 0.5 24Z" fill="black" stroke="black"/>
                    <path id="Rect" d="M12 0.5H23.5C29.0228 0.5 33.5 4.97715 33.5 10.5V30.5C33.5 36.0228 29.0228 40.5 23.5 40.5H12" stroke="black"/>
                </g>
            </svg>
        );
    }
    else if (props.type === "exit") {
        content = (
            <svg height="100%" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame 2">
                    <path id="Arrow" d="M26.5 24V19C26.5 18.4477 26.0523 18 25.5 18H14.5C13.9477 18 13.5 17.5523 13.5 17V12.1655C13.5 11.3126 12.5008 10.8512 11.8515 11.4043L0.893633 20.7388C0.424921 21.138 0.424923 21.862 0.893635 22.2612L11.8515 31.5958C12.5008 32.1488 13.5 31.6874 13.5 30.8345V26C13.5 25.4477 13.9477 25 14.5 25H25.5C26.0523 25 26.5 24.5523 26.5 24Z" fill="black" stroke="black"/>
                    <path id="Rect" d="M12 0.5H23.5C29.0228 0.5 33.5 4.97715 33.5 10.5V30.5C33.5 36.0228 29.0228 40.5 23.5 40.5H12" stroke="black"/>
                </g>
            </svg>
        );
    }

    return (
        <div
            className='aspect-square w-full h-full box-border border border-gray-900 border-solid p-8 flex justify-center content-center'
            onClick={props.click}
        >
            {content}
        </div> 
    )
}
