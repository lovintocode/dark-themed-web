<?php
$para      = 'jessica1120017@gmail.com';
$titulo    = 'De Marquitos :';
$mensaje   = 'Te quiero un montón bebesita ?';
$cabeceras = 'From: healthstep@gmail.com' . "\r\n" .
    'Reply-To: healthstep@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($para, $titulo, $mensaje, $cabeceras);
?>