import React from 'react'

const RegistrantItem = ({ registrant }) => {
    return (
        <tr className="">
            <td>

                <p className="font-semibold">{registrant?.child_first} {registrant?.child_last}</p>
            </td>
        </tr>
    )
}

export default RegistrantItem