import React from 'react';
import './Rank.css';

const Rank = ({userName,userEntries}) =>{

    return (
        <div >
            <div className='white f3'>
                {`Welcome ${userName}, you have used this tool the following times:`}
            </div>
            <div className='white f1'>
                {userEntries}
            </div>
        </div>
    )
}

export default Rank;