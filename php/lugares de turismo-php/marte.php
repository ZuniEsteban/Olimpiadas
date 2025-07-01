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
  <title>Vamos a Marte</title>
	<link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css">
  <link rel="stylesheet" href="../../css/descripcion.css">
  <link rel="stylesheet" href="../../css/header.css">
  <link rel="shortcut icon" href="../../img/img-iconos/icon.jpg" type="image/x-icon">
</head>
<body>
  <header class="header">
  <a href="../index.php" class="index">
			<img src="../../img/img-iconos/icon2.png" alt="" id="icon-header">
		</a>
    <div class="div-container"><span class="span">Mas Lugares</span>
      <ul class="ul-header-ple">
        <li class="li-header-ple">
          <a href="agujero-negro.php" class="link-header-ple"><span class="span">Agujero Negro</span></a></li>
        <li class="li-header-ple">
          <a href="galaxias.php" class="link-header-ple"><span class="span">Galaxias</span></a></li>
        <li class="li-header-ple">
          <a href="la luna.php" class="link-header-ple"><span class="span">La Luna</span></a></li>
        <li class="li-header-ple">
          <a href="marte.php" class="link-header-ple elegido"><span class="span">Marte</span></a></li>
        <li class="li-header-ple">
          <a href="nebulosa.php" class="link-header-ple"><span class="span">Nebulosa</span></a></li>
        <li class="li-header-ple">
          <a href="neptuno.php" class="link-header-ple"><span class="span">Neptuno</span></a></li>
        <li class="li-header-ple">
          <a href="saturno.php" class="link-header-ple"><span class="span">Saturno</span></a></li>
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
            <a href="../bienvenida.php" class="link-usuario">
              <i class='bx bxs-user'></i>
              Mi Cuenta
            </a>
          </li>
          <li class="li-usuario">
            <a href="../bienvenida.php" class="link-usuario">
              <i class='bx bxs-bell'></i>
              Notificaciones
            </a>
          </li>
          <li class="li-usuario">
            <a href="../logout.php" class="link-usuario">
              <i class='bx bxs-log-out'></i>
              Cerrar Sesion
            </a>
          </li>
				</ul>
			</li>

    </ul>
	</header>

  <section class="producto-info">
    <div class="div-contenedor">
      <div class="imagen-cr">
        <img src="../../img/img-lugares/mars3.jpg" alt="Galaxia">
      </div>
      <div class="caract">
        <h2>¿Que es Marte?</h2>
        <h3>
          Marte es el cuarto planeta del Sistema Solar, conocido como el "Planeta Rojo" debido a la apariencia rojiza de su superficie causada por óxido de hierro. Es un planeta rocoso, con una atmósfera delgada y una superficie marcada por volcanes, cañones y cráteres.         </h3>
      </div>
    </div>
  </section>

  <section class="precios">
    <h2>Precios y Tiendas</h2>
    <table>
      <thead>
        <tr>
          <th>Sucursales</th>
          <th>Precio</th>
          <th>Fecha de Abordaje</th>
          <th>Cuotas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Saturno</td>
          <td>$U36.199.890</td>
          <td>Consultar</td>
          <td>Hasta 6 cuotas sin interés</td>
        </tr>
        <tr>
          <td>Alfa Centauri</td>
          <td>$U46.300.460</td>
          <td>Gratis a todo el sistema</td>
          <td>Consultar</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="opinion">
    <h2>Opiniones de Usuarios</h2>
    <p>Calificación promedio: <strong>4.5 de 5</strong> basada en más de <strong>1.600 opiniones</strong>.</p>
    <p>Al 77% de los compradores era como se esperaban.</p>
  </section>

  <section class="qna">
    <h2>Preguntas Frecuentes</h2>
    <dl>
      <dt>¿ Se puede ir por si solo?</dt>
      <dd>No, por la seguridad del ciudadano, es necesario que viaje en uno de nuestros transbordadores, ya con la seguridad incluida.</dd>
  </section>
  <footer class="footer">
    <ul class="footer-menu-container">
      <li class="menu-item">
      <i class='bx bx-hive'></i> Acerca de
        <div class="footer-submenu">
          <a href="../acercaDe.php">Nosotros</a>
          <a href="../acercaEmpresa.php">La Empresa</a>
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
          <a href="../contactos.php">Contactanos</a>
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
    </ul>
    <span class="copyright">©2025 Tranki All rights reserved.</span>
  </footer>
  <canvas id="fondo-estrellado" style="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;"></canvas>
  <script src="../../js/estrellas.js"></script>
</body>
</html>