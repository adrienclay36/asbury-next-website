import React from 'react'
import RegistrantItem from './registrant-item'
const VBSList = ({ registrants }) => {
    return (
        <table className="table-auto">
            <thead>
                <tr>

                    <th>Child Name</th>
                </tr>
            </thead>
            <tbody>

                {registrants.map(registrant => (
                    <RegistrantItem key={registrant.id} registrant={registrant} />
                ))}
            </tbody>
        </table>
    )
}

export default VBSList