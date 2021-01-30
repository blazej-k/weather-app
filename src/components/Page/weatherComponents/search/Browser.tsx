import React, { ChangeEvent, FC } from 'react'

interface BrowserProps {
    cityName: string,
    error: boolean,
    loading: boolean,
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const Browser: FC<BrowserProps> = ({ cityName, handleInputChange, error, loading }) => {
    return (
        <div className="Browser-wrapper">
            <div className="Browser-search">
                <span>City: </span>
                <input value={cityName} onChange={handleInputChange} />
            </div>
            <div className="Browser-error">
                {error && <b>Wrong name of city({cityName})</b>}
            </div>
            <div className="Browser-loading">
                {loading && 'Loading...'}
            </div>
        </div>
    );
}

export default Browser;