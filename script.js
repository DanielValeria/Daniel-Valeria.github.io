// ============================
// LLUVIA DE 💗 DESDE EL ENCABEZADO
// ============================
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("rain-heart");
  heart.innerHTML = "💗";

  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = "0px";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3250);
}
setInterval(createHeart, 200);

// ============================
// CALENDARIO MODAL INTERACTIVO
// ============================
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const calendarModal = document.getElementById("calendar-modal");
const calendarButton = document.getElementById("calendar-button");
const closeCalendar = document.getElementById("close-calendar");
const calendarContainer = document.getElementById("calendar-container");

// Abre el modal cuando se hace clic en el botón de calendario
calendarButton.addEventListener("click", function () {
  calendarModal.style.display = "block";
  generateCalendar(currentMonth, currentYear);
});

// Cierra el modal cuando se hace clic en la "X"
closeCalendar.addEventListener("click", function () {
  calendarModal.style.display = "none";
});

// Cierra el modal si el usuario hace clic fuera del contenido
window.addEventListener("click", function (event) {
  if (event.target === calendarModal) {
    calendarModal.style.display = "none";
  }
});

// Función para generar el calendario
function generateCalendar(month, year) {
  calendarContainer.innerHTML = ""; // Limpiar el calendario antes de generarlo

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Crear encabezado con el mes y año
  const calendarHeader = document.createElement("div");
  calendarHeader.classList.add("calendar-header");

  const prevButton = document.createElement("button");
  prevButton.innerHTML = "◀";
  prevButton.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
  });

  const nextButton = document.createElement("button");
  nextButton.innerHTML = "▶";
  nextButton.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
  });

  const title = document.createElement("span");
  title.innerHTML = `${monthNames[month]} ${year}`;

  calendarHeader.appendChild(prevButton);
  calendarHeader.appendChild(title);
  calendarHeader.appendChild(nextButton);
  calendarContainer.appendChild(calendarHeader);

  // Días de la semana
  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const daysGrid = document.createElement("div");
  daysGrid.classList.add("calendar-grid");

  weekDays.forEach(day => {
    const dayElement = document.createElement("div");
    dayElement.classList.add("header");
    dayElement.innerText = day;
    daysGrid.appendChild(dayElement);
  });

  // Obtener el primer día del mes y la cantidad de días en el mes
  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  // Agregar espacios vacíos antes del primer día del mes
  for (let i = 0; i < firstDay; i++) {
    let emptyCell = document.createElement("div");
    daysGrid.appendChild(emptyCell);
  }

  // Agregar los días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    let dayElement = document.createElement("div");
    dayElement.innerText = day;

    // Resaltar los días 2 de cada mes en rosa
    if (day === 2) {
      dayElement.classList.add("highlight");
    }

    daysGrid.appendChild(dayElement);
  }

  calendarContainer.appendChild(daysGrid);
}

// ============================
// MODAL PARA ABRIR IMÁGENES DE DEDICATORIA
// ============================
document.querySelectorAll(".carta").forEach(img => {
  img.addEventListener("click", function() {
    document.getElementById("imagen-grande").src = this.src;
    document.getElementById("modal-imagen").style.display = "block";
  });
});

// Función para cerrar el modal
document.getElementById("cerrar-modal").addEventListener("click", function() {
  document.getElementById("modal-imagen").style.display = "none";
});

// Cerrar el modal si se hace clic fuera de la imagen
window.addEventListener("click", function(event) {
  let modal = document.getElementById("modal-imagen");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// ============================
// MODAL PARA ABRIR IMÁGENES Y VIDEOS DE GALERÍA Y DEDICATORIA
// ============================
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal-imagen");
    const modalImg = document.getElementById("imagen-grande");
    const modalVideo = document.getElementById("video-grande");
    const closeModal = document.getElementById("cerrar-modal");

    // Función para abrir imágenes en el modal
    function abrirImagen(src) {
        modal.style.display = "flex";
        modalImg.src = src;
        modalImg.style.display = "block";
        modalVideo.style.display = "none";
        modalVideo.pause();
    }

    // Función para abrir videos en el modal
    function abrirVideo(src) {
        modal.style.display = "flex";
        modalVideo.src = src;
        modalVideo.style.display = "block";
        modalImg.style.display = "none";
        modalVideo.play();
    }

    // Detectar imágenes de GALERÍA y DEDICATORIA
    document.querySelectorAll(".grid img, .dedicatoria img").forEach(img => {
        img.addEventListener("click", function () {
            abrirImagen(this.src);
        });
    });

    // Detectar videos de GALERÍA
    document.querySelectorAll(".grid video").forEach(video => {
        video.addEventListener("click", function () {
            abrirVideo(this.querySelector("source").src);
        });
    });

    // Cerrar el modal cuando se haga clic en el botón cerrar
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
        modalVideo.pause();
    });

    // Cerrar el modal si se hace clic fuera del contenido
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
            modalVideo.pause();
        }
    });
});
