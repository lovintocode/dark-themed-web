<?php
$para      = 'practicas2@pipeline.es';
$titulo    = 'De pruebas :';
$mensaje   = 'Funsiona o no funsiona';
$cabeceras = 'From: healthstep@gmail.com' . "\r\n" .
    'Reply-To: healthstep@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($para, $titulo, $mensaje, $cabeceras);
?>
