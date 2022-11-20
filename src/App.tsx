import { useEffect, useState } from 'react'
import { Cell } from './types';

function App() {
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10)
    
    const [cells, setCells] = useState<Cell[][]>();

    useEffect(() => {
    }, [width, height])

    return (
        <div className="App">
        </div>
    )
}

export default App
