<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css">
	<link rel="stylesheet" href="../css/styles.css">
	<link rel="stylesheet" href="../css/header.css">
	<link rel="shortcut icon" href="../img/img-iconos/icon.jpg">
	<title>Turismo a las Estrellas</title>
</head>
<body>
    <header class="header">
		<a href="#" class="index">
			<img src="../img/img-iconos/icon2.png" alt="" id="icon-header">
		</a>
		<ul class="ul-header">
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
	<section class="section">		
		<a href="lugares de turismo-php/agujero-negro.php" class="link-item">
			<img src="../img/img-lugares/phoenix2.jpg" class="img">
			<div class="contenido">
				<h2 class="h2-title">Agujero Negro</h2>
				<h3 class="h3-precio">U$60.000.000</h3>
				<h4 class="h4-ubicacion">Desde el Planeta Tierra</h4>
			</div>
		</a>
		<a href="lugares de turismo-php/galaxias.php" class="link-item">
			<img src="../img/img-lugares/galaxy1.jpg" class="img">
			<div class="contenido">
				<h2 class="h2-title">Galaxia</h2>
				<h3 class="h3-precio">U$50.000.000</h3>
				<h4 class="h4-ubicacion">Desde el Planeta Tierra</h4>
			</div>
		</a>
		<a href="lugares de turismo-php/marte.php" class="link-item">
			<img src="../img/img-lugares/mars3.jpg" class="img">
			<div class="contenido">
				<h2 class="h2-title">Marte</h2>
				<h3 class="h3-precio">U$30.000.000</h3>
				<h4 class="h4-ubicacion">Desde el Planeta Tierra</h4>
			</div>
		</a>
		<a href="lugares de turismo-php/la luna.php" class="link-item">
			<img src="../img/img-lugares/moon1.jpg" class="img">
			<div class="contenido">
				<h2 class="h2-title">La Luna</h2>
				<h3 class="h3-precio">U$14.600.000</h3>
				<h4 class="h4-ubicacion">Desde el Planeta Tierra</h4>
			</div>
		</a>
		<a href="lugares de turismo-php/nebulosa.php" class="link-item">
			<img src="../img/img-lugares/nebula3.jpg" class="img">
			<div class="contenido">
				<h2 class="h2-title">Nebulosa</h2>
				<h3 class="h3-precio">U$86.560.000</h3>
				<h4 class="h4-ubicacion">Desde el Planeta Tierra</h4>
			</div>
		</a>
		<a href="lugares de turismo-php/neptuno.php" class="link-item">
			<img src="../img/img-lugares/nep1.jpg" class="img">
			<div class="contenido">
				<h2 class="h2-title">Neptuno</h2>
				<h3 class="h3-precio">U$22.540.000</h3>
				<h4 class="h4-ubicacion">Desde el Planeta Tierra</h4>
			</div>
		</a>
		<a href="lugares de turismo-php/saturno.php" class="link-item">
			<img src="../img/img-lugares/saturn.jpg" class="img">
			<div class="contenido">
				<h2 class="h2-title">Saturno</h2>
				<h3 class="h3-precio">U$22.540.000</h3>
				<h4 class="h4-ubicacion">Desde el Planeta Tierra</h4>
			</div>
		</a> 
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
					<a href="https://www.turismocity.com.ar/?adgroupid=104400380366&adw_cre=452522997483&adw_key=turismocity&adw_mat=e&adw_net=g&campaignid=10690033085&cq_cmp=10690033085&cq_con=104400380366&cq_med=&cq_net=g&cq_plac=&cq_plt=gp&cq_pos=&cq_src=google_ads&cq_term=turismocity&gad_campaignid=10690033085&gad_source=1&gbraid=0AAAAACRQhsXLWWec33quhWEDOyOj2DRBc&gclid=CjwKCAjwpMTCBhA-EiwA_-MsmeE9IPbkL5s0nDSJCJjAcj6-fHaFP-ZB0C5cPegahqatPVAD_JH6QxoCFFsQAvD_BwE">Turismocity</a>
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
		<span class="copyright">©2025 Tranki All rights reserved.</span>
	</footer>
	<canvas id="galaxy-bg"></canvas>
	<script src="../js/script.js"></script>
</body>
</html>