import { CellType } from "../types"

type CellProps = {
        type: CellType;
}
export default function Cell(props: CellProps) {
    return (
        <div
            className='aspect-square w-full h-full box-border border border-gray-900 border-solid'
        ></div> 
    )
}
