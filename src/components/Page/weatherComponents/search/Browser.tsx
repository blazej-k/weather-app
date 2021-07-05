import React, { ChangeEvent, FC, useState } from 'react'

interface BrowserProps {
    error: boolean,
    loading: boolean,
    handleInputChange: (city: string) => void,
}

const Browser: FC<BrowserProps> = ({ handleInputChange, error, loading }) => {
    const [cityName, setCityName] = useState('')

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value)
        handleInputChange(e.target.value)
    }

    return (
        <div className="Browser-wrapper">
            <div className="Browser-search">
                <form>
                    <label>City:
                        <input
                            type='search'
                            value={cityName}
                            onChange={handleInput}
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                        />
                    </label>
                </form>
            </div>
            <div className="Browser-error">
                {error && <b>Wrong name of city({cityName})</b>}
            </div>
            <div className="Browser-loading">
                {loading && <div className="loader">Loading...</div>}
            </div>
        </div>
    );
}

export default Browser;