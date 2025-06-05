document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");
    const submitButton = document.querySelector(".botonEnviar");
    const reviewBox = document.querySelector(".review-box");
    let selectedRating = 0;
    

    //Función para actualizar el color de las estrellas
    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = "gold";  
            } else {
                star.style.color = "#ddd";  
            }
        });
    }
    

    
    //Evento al pasar el cursor sobre una estrella
    stars.forEach((star, index) => {
        star.addEventListener("mouseover", () => {
            updateStars(index + 1);  
        });

        //Volver a la calificación seleccionada al quitar el cursor
        star.addEventListener("mouseout", () => {
            updateStars(selectedRating);  //Actualizar estrellas según la selección
        });

        //Selección de estrellas al hacer clic
        star.addEventListener("click", () => {
            selectedRating = index + 1;  //Guardar la calificación seleccionada
            updateStars(selectedRating);  
        });
    });






    //Evento al hacer clic en el botón "Enviar Reseña"
    submitButton.addEventListener("click", () => {
    if (selectedRating > 0) {
        // Asignar la calificación al campo oculto
        ratingInput.value = selectedRating; 
        
        //Crear un objeto FormData para enviar los datos
        const formData = new FormData(document.getElementById('reviewForm'));
        
        //Enviar la calificación a través de AJAX
        fetch('php/conexiones.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            //Ocultar las estrellas y el botón
            stars.forEach(star => {
                star.style.display = "none";
            });
            submitButton.style.display = "none";

            //Mostrar el mensaje de agradecimiento
            const thankYouMessage = document.createElement("div");
            thankYouMessage.textContent = "Gracias por su reseña, estamos trabajando para mejorar nuestro servicio.";
            reviewBox.appendChild(thankYouMessage);
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert("Por favor, selecciona una calificación antes de enviar.");
    }
});
});















document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");
    const ratingInput = document.getElementById("ratingInput");
    let selectedRating = 0;

    //Función para actualizar el color de las estrellas
    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = "gold";  //Estrellas seleccionadas en dorado
            } else {
                star.style.color = "#ddd";  //Estrellas no seleccionadas en gris claro
            }
        });
    }

    //Evento al pasar el cursor sobre una estrella
    stars.forEach((star, index) => {
        star.addEventListener("mouseover", () => {
            updateStars(index + 1);  //Actualizar estrellas al pasar el cursor
        });

        //Volver a la calificación seleccionada al quitar el cursor
        star.addEventListener("mouseout", () => {
            updateStars(selectedRating);  //Actualizar estrellas según la selección
        });

        //Selección de estrellas al hacer clic
        star.addEventListener("click", () => {
            selectedRating = index + 1;  //Guardar la calificación seleccionada
            updateStars(selectedRating);  //Actualizar las estrellas seleccionadas
            ratingInput.value = selectedRating;  //Asignar la calificación al campo oculto
        });
    });
});
















// Función para cargar el promedio desde el backend
function cargarPromedio() {
    console.log('Intentando cargar el promedio...');
    fetch('php/conexiones.php')  // Enviar solicitud GET para obtener el promedio
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            if (data.promedio !== undefined) {
                const promedio = data.promedio;
                console.log('Promedio recibido:', promedio);

                // Actualizar el número del promedio
                document.getElementById('average-stars-number').textContent = promedio;

            } else {
                console.error('Error: No se pudo obtener el promedio');
            }
        })
        .catch(error => console.error('Error al cargar el promedio:', error));
}

// Cargar el promedio cuando la página haya cargado
document.addEventListener('DOMContentLoaded', cargarPromedio);