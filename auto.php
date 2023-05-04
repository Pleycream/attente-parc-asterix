<?php
$url = 'http://meteosensible.free.fr/internetasterix.htm';
$file_path = 'internetasterix.htm';

$content = file_get_contents($url);
if ($content !== false) {
    file_put_contents($file_path, $content);
} else {
    echo "Erreur lors du téléchargement de la page";
}
?>
