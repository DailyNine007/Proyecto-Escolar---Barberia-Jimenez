<?php
// Conectar a la base de datos
$host = "127.0.0.1";
$username = "root";
$password = "Daily@007";
$dbname = "barberia"; 


// Crear la conexión
$conn = new mysqli($host, $username, $password, $dbname);


// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


// Procesar solicitud POST para agregar reseña
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['rating'])) {
        $rating = intval($_POST['rating']);  // Obtener la calificación enviada desde el formulario

        // Insertar la calificación en la base de datos
        $sql = "INSERT INTO reseñas (calificacion) VALUES ('$rating')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => "¡Reseña agregada correctamente!"]);
        } else {
            echo json_encode(["error" => "Error al agregar la reseña: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "No se ha recibido ninguna calificación."]);
    }
}



// Procesar solicitud GET para obtener el promedio de reseñas
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $avgSql = "SELECT AVG(calificacion) as average FROM reseñas";
    $avgResult = $conn->query($avgSql);

    if ($avgResult && $avgResult->num_rows > 0) {
        $averageRating = round($avgResult->fetch_assoc()['average'], 1); // Redondeamos a 1 decimal
        echo json_encode(["promedio" => $averageRating]); // Devolvemos el promedio en formato JSON
    } else {
        echo json_encode(["error" => "No se pudieron obtener las reseñas."]);
    }
}


//Cerrar la conexión
$conn->close();
?>


