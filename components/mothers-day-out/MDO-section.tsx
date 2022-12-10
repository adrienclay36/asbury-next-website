import React from 'react'
import MDOCard from './MDO-card'
import { BsClock } from 'react-icons/bs';
import { FaChild } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
import SectionHeading from '../ui/section-heading';

const MDOSection = () => {

  const trClass = "text-xs lg:text-base md:text-base";
  const tdClass = "lg:px-6 md:px-6 px-2 py-4 whitespace-nowrap";
  const thClass = "lg:px-6 md:px-6 px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  return (
    <SectionHeading title={"MDO"}>
      <MDOCard />
      <div className="container grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="p-4 my-4 flex flex-col justify-center items-center w-5/6 mx-auto">
          <BsClock className="mb-6" size={50} />
          <h1 className="text-xl text-center font-semibold">
            We provide Full time, Part time and Drop in services.
          </h1>
        </div>
        <div className="p-4 my-4 flex flex-col justify-center items-center w-5/6 mx-auto">
          <FaChild className="mb-6" size={50} />
          <h1 className="text-xl text-center font-semibold">
            MDO accepts children from 4 months, up to the age of 6.
          </h1>
        </div>
        <div className="p-4 my-4 flex flex-col justify-center items-center w-5/6 mx-auto">
          <RiSecurePaymentLine className="mb-6" size={50} />
          <h1 className="text-xl text-center font-semibold">
            MDO accepts state child care payments.
          </h1>
        </div>
      </div>

      <div className="container flex flex-col mt-12 w-11/12 lg:w-3/6 md:11/12">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className={thClass}
                    >
                      Rates
                    </th>
                    <th
                      scope="col"
                      className={thClass}
                    >
                      Half Day
                    </th>
                    <th
                      scope="col"
                      className={thClass}
                    >
                      Full Day
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>One Child</h1>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>$25.00</h1>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>$25.00</h1>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>
                          Each Additional{" "}
                          <span className="text-red-600">*</span>
                        </h1>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>Add $20</h1>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>Add $35</h1>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>7:30AM - 8:00AM</h1>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>Additional $4</h1>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>Additional $4</h1>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>5:00PM - 5:30PM</h1>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>Additional $4</h1>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <div className="flex items-center">
                        <h1 className={trClass}>Additional $4</h1>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-gray-500">
          <span className="text-red-600">*</span> Brothers, sisters and/or
          foster children of the same family.
        </p>
      </div>
    </SectionHeading>
  );
}

export default MDOSection