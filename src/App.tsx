import { useEffect, useState } from 'react'
import {Cell} from './components';
import { CellType } from './types';

function App() {
    const [rowCnt, setRowCnt] = useState(5);
    const [colCnt, setColCnt] = useState(5)
    
    const [cells, setCells] = useState<CellType[][]>(
        Array(rowCnt).fill(
            Array(colCnt).fill("normal")
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
            }
            else {
                prev = [
                    ...prev,
                    ...Array(diffRowCnt).fill(
                        Array(colCnt).fill("normal")
                    )
                ];
            }

            if (diffColCnt < 0) {
                prev = prev.map(row => row.slice(0, colCnt));
            }
            else {
                prev = prev.map(row => [
                    ...row,
                    ...Array(diffColCnt).fill("normal")
                ]);
            }

            console.log(prev)
            return prev;
        })
    }, [rowCnt, colCnt])

    return (
        <div> 
            {/* maze grid container maze grid container  */}
            <div
                className="grid"
                style={{
                    gridTemplateRows: `repeat(${rowCnt}, minmax(0, 1fr))`,
                    gridTemplateColumns: `repeat(${colCnt}, minmax(0, 1fr))`
                }}
            > 
                {cells.map((row, rowI) => 
                    row.map((cell, colI) => 
                        <Cell
                            key={`${rowI}-${colI}`}
                            type={cell}
                            click={() => 
                                setCells(prev => {
                                    let value = prev[rowI][colI];
                                    const allValues = new Set(cells.flat());

                                    if (value === "exit" || (
                                        allValues.has("entrance") &&
                                        allValues.has("exit")
                                    )) {
                                        value = "normal";
                                    }
                                    else if (!allValues.has("entrance")) {
                                        value = "entrance";
                                    }
                                    else if (!allValues.has("exit")) {
                                        value = "exit";
                                    }

                                    return [
                                        ...prev.slice(0, rowI),
                                        [
                                            ...prev[rowI].slice(0, colI),
                                            value,
                                            ...prev[rowI].slice(colI + 1)
                                        ],
                                        ...prev.slice(rowI + 1)
                                    ]
                                })
                            }
                        />
                    )
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
