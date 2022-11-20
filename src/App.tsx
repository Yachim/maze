import { useEffect, useState } from 'react'
import {Cell} from './components';
import { CellData } from './types';

const defaultData: CellData = {
    type: "normal",
    walls: {
        top: true,
        bottom: true,
        left: true,
        right: true 
    }
} 
function App() {
    const [rowCnt, setRowCnt] = useState(5);
    const [colCnt, setColCnt] = useState(5)
    
    const [cells, setCells] = useState<CellData[][]>(
        Array(rowCnt).fill(
            Array(colCnt).fill(defaultData)
        )
    );

    useEffect(() => {
        setCells(prev => {
            const prevRowCnt = prev.length;
            const prevColCnt = prev[0].length;
            
            const diffRowCnt = rowCnt - prevRowCnt;
            const diffColCnt = colCnt - prevColCnt;
            
            if (diffRowCnt < 0) {
                prev = prev.slice(0, rowCnt);
                prev[prev.length - 1] = prev[prev.length - 1].map(c => {
                    c.walls.bottom = true;
                    return c;
                });
            }
            else {
                prev = [
                    ...prev,
                    ...Array(diffRowCnt).fill(
                        Array(colCnt).fill(defaultData)
                    )
                ];
            }

            if (diffColCnt < 0) {
                prev = prev.map(row => {
                    row.slice(0, colCnt);
                    row[row.length - 1].walls.right = true;

                    return row;
                })
            }
            else {
                prev = prev.map(row => [
                    ...row,
                    ...Array(diffColCnt).fill(defaultData)
                ]);
            }

            return prev;
        })
    }, [rowCnt, colCnt])

    return (
        <div> 
            {/* maze grid container */}
            <div
                className="grid"
                style={{
                    gridTemplateRows: `repeat(${rowCnt}, minmax(0, 1fr))`,
                    gridTemplateColumns: `repeat(${colCnt}, minmax(0, 1fr))`
                }}
            > 
                {cells.map((row, rowI) => 
                    row.map((cell, colI) => {
                        let edges: ("top" | "bottom" | "left" | "right")[] = [];
                        if (rowI === 0) edges.push("top");
                        if (rowI === rowCnt - 1) edges.push("bottom");
                        if (colI === 0) edges.push("left");
                        if (colI === colCnt - 1) edges.push("right");

                        return (<Cell
                            key={`${rowI}-${colI}`}
                            data={cell}
                            edges={edges}
                            click={() => 
                                setCells(prev => {
                                    let cellData = prev[rowI][colI];
                                    let cellType = cellData.type;
                                    const allValues = new Set(cells.flat().map(
                                        cell => cell.type
                                    ));
    
                                    if (cellType === "exit" || (
                                        allValues.has("entrance") &&
                                        allValues.has("exit")
                                    )) {
                                        cellType = "normal";
                                    }
                                    else if (!allValues.has("entrance")) {
                                        cellType = "entrance";
                                    }
                                    else if (!allValues.has("exit")) {
                                        cellType = "exit";
                                    }
    
                                    return [
                                        ...prev.slice(0, rowI),
                                        [
                                            ...prev[rowI].slice(0, colI),
                                            {
                                                ...cellData,
                                                type: cellType
                                            },
                                            ...prev[rowI].slice(colI + 1)
                                        ],
                                        ...prev.slice(rowI + 1)
                                    ]
                                })
                            }
                            topBorderClick={() => {
                                setCells(prev => {
                                    const prevState = JSON.parse(JSON.stringify(prev))

                                    const target = prevState[rowI][colI];
                                    const neighbor = prevState[rowI - 1][colI];

                                    target.walls.top = !target.walls.top;
                                    neighbor.walls.bottom = !neighbor.walls.bottom;

                                    return prevState;
                                })
                            }}
                            bottomBorderClick={() => {
                                setCells(prev => {
                                    const prevState = JSON.parse(JSON.stringify(prev))

                                    const target = prevState[rowI][colI];
                                    const neighbor = prevState[rowI + 1][colI];

                                    target.walls.bottom = !target.walls.bottom;
                                    neighbor.walls.top = !neighbor.walls.top;

                                    return prevState;
                                })
                            }}
                            leftBorderClick={() => {
                                setCells(prev => {
                                    const prevState = JSON.parse(JSON.stringify(prev))

                                    const target = prevState[rowI][colI];
                                    const neighbor = prevState[rowI][colI - 1];

                                    target.walls.left = !target.walls.left;
                                    neighbor.walls.right = !neighbor.walls.right;

                                    return prevState;
                                })
                            }}
                            rightBorderClick={() => {
                                setCells(prev => {       
                                    const prevState = JSON.parse(JSON.stringify(prev))

                                    const target = prevState[rowI][colI];
                                    const neighbor = prevState[rowI][colI + 1];

                                    target.walls.right = !target.walls.right;
                                    neighbor.walls.left = !neighbor.walls.left;

                                    return prevState;
                                })
                            }}
                        />)
                    })
                )}
            </div>
            {/* input container */}
            <div className="flex gap-4 flex-col">
                <label htmlFor="row-cnt">Rows: {rowCnt}</label>
                <input
                    id="row-cnt"
                    type="range"
                    min="3"
                    max="50"
                    value={rowCnt}
                    onChange={e => setRowCnt(+e.target.value)}
                />
                <label htmlFor="row-cnt">Columns: {colCnt}</label>
                <input
                    type="range"
                    min="3"
                    max="50"
                    value={colCnt}
                    onChange={e => setColCnt(+e.target.value)}
                />
            </div>
        </div>
    )
}

export default App
