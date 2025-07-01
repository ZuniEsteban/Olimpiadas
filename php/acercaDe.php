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
    <link rel="stylesheet" href="../css/acercaDe.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="shortcut icon" href="../img/img-iconos/icon.jpg" type="image/x-icon">
    <title>Acerca De</title>
</head>
<body>
    <header class="header">
		<a href="index.php" class="index">
			<img src="../img/img-iconos/icon2.png" alt="" id="icon-header">
		</a>
        <div class="div-container"><span class="span">Mas Lugares</span>
      <ul class="ul-header-ple">
        <li class="li-header-ple">
          <a href="agujero-negro.php" class="link-header-ple"><span class="span">Agujero Negro</span></a>
        </li>
        <li class="li-header-ple">
          <a href="galaxias.php" class="link-header-ple"><span class="span">Galaxias</span></a>
        </li>
        <li class="li-header-ple">
          <a href="la luna.php" class="link-header-ple"><span class="span">La Luna</span></a>
        </li>
        <li class="li-header-ple">
          <a href="marte.php" class="link-header-ple"><span class="span">Marte</span></a>
        </li>
        <li class="li-header-ple">
          <a href="nebulosa.php" class="link-header-ple"><span class="span">Nebulosa</span></a>
        </li>
        <li class="li-header-ple">
          <a href="neptuno.php" class="link-header-ple"><span class="span">Neptuno</span></a>
        </li>
        <li class="li-header-ple">
          <a href="saturno.php" class="link-header-ple"><span class="span">Saturno</span></a>
        </li>
      </ul>
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
						<a href="../php/logout.php" class="link-usuario">
						<i class='bx bxs-log-out'></i>
						Cerrar Sesion
						</a>
					</li>
				</ul>
			</li>
        </ul>
	</header>

    <section>
        <div class="contenido">
            <h2><strong>Acerca de nosotros</strong></h2>
            <p class="p-acerca">Somos un grupo de estudiantes de la carrera de Programación en la Escuela Tecnica John F.Kennedy de Lanus. Este sitio web es parte de nuestro proyecto final, donde hemos trabajado juntos para crear una plataforma que permita a los usuarios explorar y aprender sobre diversos temas.</p>
            <p class="p-acerca">Nuestro objetivo es proporcionar un recurso útil y accesible para todos, combinando nuestras habilidades en programación, diseño y contenido.</p>
        </div> 
    </section>
    <aside class="aside">
        <div class="div">
            <img src="../img/img-nosotros/trani.jpg" alt="" class="img">
            <div class="contenedor-info">
                <h2>Thiago Trani</h2>
                <p class="titulo-div">Lider De Grupo</p>
                <p>
                    Coordina y supervisa el equipo, toma desiciones clave y asegura la calidad del trabajo entregado.

                </p>
                <p>Motivo del Rol: <br>
                    Es alguien con caracter fuerte y con un conocimiento alto sobre las tecnologias usadas en nuestro proyecto
                </p>
            </div>
        </div>
        <div class="div">
            <div class="contenedor-img">
                <img src="../img/img-nosotros/marino.jpg" alt="" class="img-reverse">
            </div>
            <div class="contenedor-info">
                <h2 class="info">Nicolas Marino</h2>
                <p class="info titulo-div">Analista</p>
                <p class="info">
                    Se encarga de recopilar, analizar e interpretar datos para tomar desiciones o resilver problemas como finanzas, marketing, tecnologias, negocios, etc.
                </p>
                <p class="info">Motivo del Rol: <br>
                    Posee conocimientos medios sobre HTML, CSS y MySQL, se le dio este puesto debido a sus conocimientos sobre análisis y uso de word.
                </p>
            </div>
        </div>
        <div class="div">
            <div class="contenedor-img">
                <img src="../img/img-nosotros/acolla.jpg" alt="" class="img">
            </div>
            <div class="contenedor-info">
                <h2>Joaquin Accolla</h2>
                <p  class="titulo-div">Programador Back - End</p>
                <p>
                    Se encarga de toda la logica de la pagina web y de la base de datos, su trabajo no es visible a simple vista, pero sin él la pagina no tendria función.
                </p>
                <p>Motivos del Rol: <br>
                    Posee un conocimiento medio sobre MySQL, tomo este puesto debido a que es el mas sabe sobre base de datos.
                </p>
            </div>
            </div>
        <div class="div">
            <div class="contenedor-img">
                <img src="../img/img-nosotros/yo3.jpg" alt="" class="img-reverse img-zuñiga">
            </div>
            <div class="contenedor-info">
                <h2 class="info">Esteban Zuñiga</h2>
                <p class="info titulo-div" >Desarrollador Front - End</p>
                <p class="info">
                    Encargado de darle forma y estilos a la pagina web, basicamente hace que la página sea más atractiva visualmente y fácil de usar para el usuario.
                </p>
                <p class="info">Motivos del Rol: <br>
                    Se le dio este puesto debido a sus conocimientos avanzados sobre las tecnologias usadas en el proyecto, especialmente HTML, CSS y JAVASCRIPT.
                </p>
            </div>
        </div>
    </aside>
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
					<a href="#">Registro</a>
					<a href="#">Iniciar</a>
				</div>
			</li> -->
		</ul>
		<span class="copyright">©2025 Tranki All rights reserved.</span>
	</footer>
</body>
</html>