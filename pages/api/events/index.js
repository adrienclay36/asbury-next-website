
import axios from 'axios';
const ical = require("ical");

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
const handler = async (req, res) => {
  if (req.method === "GET") {
    const response = await axios.get(churchEventsURL);

     const data = ical.parseICS(response.data);
     const events = [];
     for (let k in data) {
       if (data.hasOwnProperty(k)) {
         var ev = data[k];
         if (data[k].type == "VEVENT") {
            if(new Date(ev.start) >= new Date()){

                events.push({
                    summary: ev.summary,
                    start: new Date(ev.start),
                    end: new Date(ev.end),
                    location: ev.location,
                })
            }
        //    console.log(
        //      `${ev.summary} is in ${
        //        ev.location
        //      } on the ${new Date(ev.start).getDate()} of ${
        //        months[new Date(ev.start).getMonth()]
        //      } at ${new Date(ev.start).toLocaleTimeString("en-US")}`
        //    );
         }
       }
     }
    const byDate = events.sort((a, b) => {
        return a.start - b.start;
    })
    
    res.status(200).json({status: "ok", events: byDate});
  }
};

export default handler;
