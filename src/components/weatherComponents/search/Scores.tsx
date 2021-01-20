import React, { FC } from 'react'

interface ScoresProps {
    cityName: string,

}
 
const Scores: FC<ScoresProps> = ({cityName}) => {
    return (
        <span>scores</span>
    );
}
 
export default Scores;