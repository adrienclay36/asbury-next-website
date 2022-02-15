import axios from "axios";
const ical = require("ical");
import { nanoid } from 'nanoid';
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const googleURL =
  "https://calendar.google.com/calendar/ical/4ljcopth0tueaa6nt426kbb99ksvaqmv%40import.calendar.google.com/public/basic.ics";

const churchEventsURL =
  "http://www.mychurchevents.com/calendar/ical/57664083/public.ics?tz=z93";

function addMonths(d, n) {
  var dt = new Date(d.getTime());
  dt.setMonth(dt.getMonth() + n);
  return dt;
}


const handler = async (req, res) => {
  if (req.method === "GET") {
    const response = await axios.get(churchEventsURL);

    const data = ical.parseICS(response.data);
    const events = [];

    const formatter = new Intl.DateTimeFormat('en-US', { timeZone: "America/Denver"});
    const today = formatter.format(new Date());
    const todayDateObject = new Date(today);
    const oneMonthForward = addMonths(todayDateObject, 1);


    for (let k in data) {
      if(data[k].rrule) {
        if(data[k].summary !== "Mother's Day Out") {
          const dates = data[k].rrule.between(todayDateObject, oneMonthForward);
          dates.forEach(date => {
            events.push({
              id: nanoid(),
              summary: data[k].summary,
              start: data[k].start,
              end: data[k].end,
              date: date,
            });
          })
        }
      } else {
        if(data[k].summary && data[k].start && data[k].end) {
          events.push({
            id: nanoid(),
            summary: data[k].summary,
            start: new Date(data[k].start),
            end: new Date(data[k].end),
            date: new Date(data[k].start),
          });
        }
      }
    }

    const byDate = events.sort((a, b) => {
      return a.date - b.date;
    });

    const todayAndLater = byDate.filter(item => {return item.date >= todayDateObject});

    res.status(200).json({ status: "ok", events: todayAndLater });
  }
};

export default handler;
