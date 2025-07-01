<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css">

    <link rel="stylesheet" href="../css/acercaEmpresa.css">
	<link rel="stylesheet" href="../css/header.css">
	<link rel="shortcut icon" href="../img/img-iconos/icon.jpg" type="image/x-icon">
    <title>Acerca de La Empresa</title>
</head>
<body>
    <header class="header">
		<a href="index.html" class="index">
			<img src="../img/img-iconos/icon2.png" alt="icono" id="icon-header">
		</a>
		<div class="div-container"><span class="span">Mas Lugares</span>
      <ul class="ul-header-ple">
        <li class="li-header-ple">
          <a href="lugares de turismo-php/agujero-negro.php" class="link-header-ple"><span class="span">Agujero Negro</span></a>
        </li>
        <li class="li-header-ple">
          <a href="lugares de turismo-php/galaxias.php" class="link-header-ple"><span class="span">Galaxias</span></a>
        </li>
        <li class="li-header-ple">
          <a href="lugares de turismo-php/la luna.php" class="link-header-ple"><span class="span">La Luna</span></a>
        </li>
        <li class="li-header-ple">
          <a href="lugares de turismo-php/marte.php" class="link-header-ple"><span class="span">Marte</span></a>
        </li>
        <li class="li-header-ple">
          <a href="lugares de turismo-php/nebulosa.php" class="link-header-ple"><span class="span">Nebulosa</span></a>
        </li>
        <li class="li-header-ple">
          <a href="lugares de turismo-php/neptuno.php" class="link-header-ple"><span class="span">Neptuno</span></a>
        </li>
        <li class="li-header-ple">
          <a href="lugares de turismo-php/saturno.php" class="link-header-ple"><span class="span">Saturno</span></a>
        </li>
		</div>
		<ul class="ul-header">
		<li class="li-header">
                <a href="index.php" id="link-header">Inicio</a>
            </li>
			<li class="li-header">
				<a href="contactos.php" id="link-header"> <span>Contactos</span></a>
			</li>
				<li class="li-header contenedor-usuario" tabindex="0">
					<i class='bx bxs-user usuario'></i>
					<ul class="ul-usuario">
					<i class='bx bxs-user usuario'></i>
					<h1 class="h1"><?php echo htmlspecialchars($_SESSION['usuario']) ?></h1>
					<hr>
					<li class="li-usuario">
						<a href="bienvenida.php" class="link-usuario">
						<i class='bx bxs-user'></i>
						Mi Cuenta
						</a>
					</li>
					<li class="li-usuario">
						<a href="#" class="link-usuario">
						<i class='bx bxs-bell'></i>
						Notificaciones
						</a>
					</li>
					<li class="li-usuario">
						<a href="logout.php" class="link-usuario">
						<i class='bx bxs-log-out'></i>
						Cerrar Sesion
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</header>

    <section id="mision">
        <h2>Nuestra Misión</h2>
        <p>Llevar la exploración espacial a todos, haciendo posible los sueños de viajar más allá de la Tierra.</p>
    </section>

    <section id="servicios">
        <h2>Servicios</h2>
        <ul>
            <li>Vuelos espaciales comerciales</li>
            <li>Lanzamiento de satélites</li>
            <li>Turismo espacial</li>
            <li>Investigación y desarrollo tecnológico</li>
        </ul>
    </section>

    <section id="equipo">
        <h2>Equipo</h2>
        <p>Contamos con astronautas, ingenieros y científicos apasionados por el futuro del espacio.</p>
    </section>

    <section id="contacto">
        <h2>Contacto</h2>
        <p>Email: contacto@astrovuelos.com</p>
        <p>Teléfono: +34 600 123 456</p>
    </section>

    <footer class="footer">
		<ul class="footer-menu-container">
			<li class="menu-item">
			<i class='bx bx-hive'></i> Acerca de
				<div class="footer-submenu">
					<a href="acercaDe.php">Nosotros</a>
					<a href="acercaEmpresa.php">La Empresa</a>
				</div>
			</li>
			<li class="menu-item">
			<i class='bx bx-link'></i> Otros sitios
				<div class="footer-submenu">
					<a href="https://turismocity.com">Turismocity</a>
				</div>
			</li>
			<li class="menu-item">
				<i class='bx bxs-info-circle'></i> Ayuda
				<div class="footer-submenu">
					<a href="contactos.php">Contactanos</a>
				</div>
			</li>
			<li class="menu-item">
				<i class='bx bxs-cloud'></i> Redes sociales
				<div class="footer-submenu">
					<a href="#">Gmail</a>
					<a href="#">Instagram</a>
					<a href="#">Twitter</a>
					<a href="#">TikTok</a>
					<a href="#">GitHub</a>
				</div>
			</li>
			<!-- <li class="menu-item">
				<i class='bx bxs-user-account'></i> Mi cuenta
				<div class="footer-submenu">
					<a href="php/registro.php">Registro</a>
					<a href="php/login.php">Iniciar</a>
				</div>
			</li> -->
		</ul>
		<span class="copyright">©2025 Turismo a las Estrellas All rights reserved.</span>
	</footer>

</body>
</html>