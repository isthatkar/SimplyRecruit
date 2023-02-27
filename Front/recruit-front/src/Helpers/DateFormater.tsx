function GetFormatedDate(dateString: string) {
  const date = new Date(dateString);
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    date.getDay()
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const formattedDate = `${month} ${date.getDate()}, ${weekday}, ${hour}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${ampm}`;
  return formattedDate;
}

export default GetFormatedDate;
