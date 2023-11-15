const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span"),
  eventContainer = document.getElementById("event-container");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  // Obtén el índice del primer día de la semana actual
  let firstDayIndex = (firstDayofMonth - 1 + 7) % 7;

  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    let event = localStorage.getItem(`${currYear}-${currMonth + 1}-${i}`);
    let eventClass = event ? "event" : "";
    liTag += `<li class="${isToday} ${eventClass}" data-date="${currYear}-${currMonth + 1}-${i}"><span>${i}</span></li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  // Agregar eventos a los días
  const dayElements = document.querySelectorAll(".days li");
  dayElements.forEach((dayElement, index) => {
    dayElement.addEventListener("click", handleDayClick);
    // Reiniciar clases para sincronizar estilos
    dayElement.className = index < firstDayIndex || index >= firstDayIndex + lastDateofMonth ? "inactive" : "";
  });
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

// Función para manejar el clic en un día
function handleDayClick(event) {
  const clickedDay = event.currentTarget;
  const date = clickedDay.getAttribute("data-date");

  const eventText = prompt("Ingrese un evento para este día:");

  if (eventText) {
    localStorage.setItem(date, eventText);
    clickedDay.classList.add("event");
    clickedDay.style.backgroundColor = "orange";
  }
}
