<?php
session_start();

$conn = new mysqli("localhost", "root", "", "inicio_sesion");
if ($conn->connect_error) die("Conexión fallida: " . $conn->connect_error);

$error = $exito = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['username'];
    $correo =  $_POST['email'];
    $contrasena = $_POST['password'];
    $hash = password_hash($contrasena, PASSWORD_DEFAULT);

    $verifica = $conn->prepare("SELECT id FROM usuarios WHERE usuario = ?");
    $verifica->bind_param("s", $usuario);
    $verifica->execute();
    $verifica->store_result();

    if ($verifica->num_rows > 0) {
        $error = "Ese usuario ya existe.";
    } else {
        $stmt = $conn->prepare("INSERT INTO usuarios (usuario, correo, contraseña) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $usuario, $correo, $hash);
        if ($stmt->execute()) {
            $exito = "Usuario registrado correctamente.";
        } else {
            $error = "Error al registrar usuario.";
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Registro</title>
    <link rel="stylesheet" href="../css/registrarse.css">
    <link rel="shortcut icon" href="../img/img-iconos/icon.jpg" type="image/x-icon">
</head>
<body>
<div class="bubbles-background">
        <div class="bubbles">
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
        </div>
    </div>

    <div class="signup-container">
<h2>Registro de Usuario</h2>
<?php if ($error) echo "<p style='color:red;'>$error</p>"; ?>
<?php if ($exito) echo "<p style='color:green;'>$exito</p>"; ?>

<form method="post">
    <input name="username" placeholder="Usuario" required><br><br>
    <input type="email" name="email" placeholder= "Correo Electronico" required><br><br>
    <input type="password" name="password" placeholder="Contraseña" required><br><br>
    <button type="submit">Registrarse</button>

    <p class="p">¿Ya tienes una cuenta? <a href="login.php" class="link-login">Inicia Sesion</a></p>

</form>
</div>
</body>
</html>