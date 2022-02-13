import React from 'react'
import SectionHeader from '../ui/section-heading';
import { Calendar, Badge } from 'antd';
import Link from 'next/link';
const EventsSection = () => {


  function getListData(value) {
    let listData;
    // console.log(new Date(value._d).toLocaleDateString("en-US"));
    switch (value.date()) {
      case 9:
        listData = [
          { type: "success", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
        ];
        break;
      case 10:
        listData = [
          { type: "success", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
          { type: "success", content: "This is error event." },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          { type: "success", content: "This is very long usual event Where something drags on forever" },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." },
        ];
        break;
      default:
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <Link key={item.content} href={`/${item.content}`} passHref>
          <li className="text-lg">
            {<Badge status={'success'} text={item.content} />}
          </li>
          </Link>
        ))}
      </ul>
    );
  }


  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  

  return (
    <SectionHeader title="Events">
      <div className="flex flex-1 justify-center items-center bg-white w-full p-0 lg:w-11/12 md:w-11/12 lg:p-10 md:p-10 mx-auto">

        <Calendar dateCellRender={dateCellRender} monthFullCellRender={monthCellRender}/>
      </div>

    </SectionHeader>
  );
}

export default EventsSection