import React, { ChangeEvent, FC } from 'react'

interface BrowserProps {
    cityName: string,
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
}
 
const Browser: FC<BrowserProps> = ({cityName, handleInputChange}) => {
    return (
        <div className="browser">
            <input value={cityName} onChange={handleInputChange}/>
        </div>
    );
}
 
export default Browser;