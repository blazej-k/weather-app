import React, { ChangeEvent, FC } from 'react'

interface BrowserProps {
    cityName: string,
    error: boolean,
    loading: boolean,
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const Browser: FC<BrowserProps> = ({ cityName, handleInputChange, error, loading }) => {
    return (
        <div className="browser-wrapper">
            <div className="browser-search">
                <input value={cityName} onChange={handleInputChange} />
            </div>
            <div className="browser-error">
                {error && <b>Wrong name of city({cityName})</b>}
            </div>
            <div className="browser-loading">
                {loading && 'Loading...'}
            </div>
        </div>
    );
}

export default Browser;