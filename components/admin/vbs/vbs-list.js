import React, { useEffect, useState } from 'react'
import RegistrantItem from './registrant-item'
const VBSList = ({ registrants }) => {
    const [rows, setRows] = useState();

    const getRows = (registrantObject) => {
      let tempRows = [];
      for (let key in registrantObject) {
        tempRows.push({
          rowLabel: key,
        })
      }

      setRows(tempRows);
    }

    useEffect(() => {
      if(registrants.length > 0) {

        getRows(registrants[0]);
      }
    }, [])


   

    if(!rows) {
      return null;
    }
    return (
        <div className="flex flex-col mx-auto mt-12 w-11/12 lg:w-5/6 md:11/12">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                   {rows.map(row => (
                      <th
                      key={row.rowLabel}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {row.rowLabel}
                    </th>
                   ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrants.map(registrant => (
                      <RegistrantItem rows={rows} registrant={registrant} key={registrant?.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}

export default VBSList