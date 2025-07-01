<?php
session_start();

$conn = new mysqli("localhost", "root", "", "inicio_sesion");
if ($conn->connect_error) die("Conexión fallida: " . $conn->connect_error);

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['username'];
    $contrasena = $_POST['password'];

    $stmt = $conn->prepare("SELECT contraseña FROM usuarios WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $fila = $resultado->fetch_assoc();
        if (password_verify($contrasena, $fila['contraseña'])) {
            $_SESSION['usuario'] = $usuario;
            header("Location: index.php");
            exit();
        } else {
            $error = "Contraseña incorrecta.";
        }
    } else {
        $error = "Usuario no encontrado.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
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
    <h2>Iniciar sesión</h2>
<?php if ($error) echo "<p style='color:red;'>$error</p>"; ?>

        <form method="post">
            <input name="username" placeholder="Usuario" required><br><br>
            <input type="password" name="password" placeholder="Contraseña" required><br><br>
            <button type="submit">Entrar</button>
        </form>

        <p class="p">¿No tienes una cuenta? <a href="registro.php" class="link-login">Registrarse</a></p>
    </div>
</body>
</html>