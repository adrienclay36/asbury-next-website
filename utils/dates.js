import moment from "moment";
const dateNumbers = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const fullMonths = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const getDateInfo = (date, fullMonth = false) => {
  const dateObject = new Date(date);
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const monthText = fullMonth ? fullMonths[month] : dateNumbers[month];
  return {
    day,
    monthText,
  };
};

export const formatTime = (timestamp) => {
  return moment(timestamp, "HH:mm:ss").format("h:mm A");
};

export const convertTime = (time) => {
    console.log(time);
  const fullDate = new Date();
  const d = moment(fullDate).format("L");
  const date = moment(d + " " + time).format();
  const jsDate = moment(date).toDate();
  return jsDate;
};
