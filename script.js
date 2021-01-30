const date = new Date();

const renderCalendar = () => {
  date.setDate(1);
  const monthDays = document.querySelector(".days");
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const nextDays = 7 - lastDayIndex - 1;
  const months = [
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
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];
  document.querySelector(".date p").innerHTML = new Date().toDateString();
  clearBtn = document.querySelector("#clear");
  //getting storred selected dates form session storage
  selectedDates = JSON.parse(localStorage.getItem("date selected"));
  //function to display the days
  const dispDays = () => {
    let days = "";

    //create days for previous month
    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    //create days wih id  //highliting selected dates
    for (let i = 1; i <= lastDay; i++) {
      if (selectedDates.includes(i)) {
        days += `<div id="${i}" class="selected">${i}</div>`;
      } else {
        days += `<div id="${i}">${i}</div>`;
      }
    }

    //create days of next month
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
    }
    monthDays.innerHTML = days;

    //storing clicked dates in array
    for (let l = 1; l <= lastDay; l++) {
      document.getElementById(l).addEventListener("click", function () {
        selectedDates.push(parseInt(this.id));
        // updating the page to see the highlited dates
        dispDays();
      });
    }

    //storing array of selected dates in localStorage
    localStorage.setItem("date selected", JSON.stringify(selectedDates));
    console.log("in session storage: " + localStorage.getItem("date selected"));
  };
  dispDays();
};

document.querySelector("#prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.getElementById("next").addEventListener("click", function () {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

try {
  renderCalendar();
} catch (error) {
  selecteddates = [];
  localStorage.setItem("date selected", JSON.stringify(selecteddates));
  renderCalendar();
}
//clear localStorage s
clearBtn.addEventListener("click", function () {
  selecteddates = [];
  localStorage.setItem("date selected", JSON.stringify(selecteddates));
  renderCalendar();
});
