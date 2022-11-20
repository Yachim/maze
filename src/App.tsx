import { useEffect, useState } from 'react'
import { Cell } from './types';

function App() {
    const [rowCnt, setRowCnt] = useState(5);
    const [colCnt, setColCnt] = useState(5)
    
    const [cells, setCells] = useState<Cell[][]>(
        Array(rowCnt).fill(
            Array(colCnt).fill("empty")
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
                        Array(colCnt).fill("empty")
                    )
                ];
            }

            if (diffColCnt < 0) {
                prev = prev.map(row => row.slice(0, colCnt));
            }
            else {
                prev = prev.map(row => [
                    ...row,
                    ...Array(diffColCnt).fill("empty")
                ]);
            }

            console.log(prev)
            return prev;
        })
    }, [rowCnt, colCnt])

    return (
        <div className="App">
        </div>
    )
}

export default App
