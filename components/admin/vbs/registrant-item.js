import React from 'react'

import { useRouter } from 'next/router';
const RegistrantItem = ({ registrant, rows, href }) => {
    const router = useRouter();

    const tableRow = (text, rowLabel) => (
        <td key={rowLabel} className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <h1>{text}</h1>
            </div>
        </td>
    )
    console.log(href);
    return (
        <tr onClick={() => router.push(`${href}/${registrant?.id}`)} className="cursor-pointer hover:bg-gray-100">

            {rows.map(row => {
                if(registrant[row.rowLabel] === true ){
                   return tableRow('Yes', row.rowLabel);
                } 
                
                if (registrant[row.rowLabel] === false) {
                   return tableRow('No', row.rowLabel);
                } 

                if(row.rowLabel === 'created_at') {
                    return tableRow(new Date(registrant[row.rowLabel]).toLocaleDateString('en-US'), row.rowLabel)
                }

                  return  tableRow(registrant[row.rowLabel].toString(), row.rowLabel)
                
            })}


        </tr>
    )
}

export default RegistrantItem