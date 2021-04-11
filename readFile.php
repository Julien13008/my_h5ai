<?php

$extension = substr($_GET['file'], strrpos($_GET['file'], "."));

if ($extension !== ".png" && $extension !== ".jpeg" && $extension !== ".jpg" && $extension !== '.ico') {
    $file = file_get_contents($_GET['file']);
} else {
    $file = substr($_GET['file'], strrpos($_GET['file'], "/"));
    $file = "<img src='" . $file . "'>";
}

$file = nl2br($file);
$file = str_replace("   ", "&nbsp;&nbsp;&nbsp;&nbsp;", $file);

echo $file;

?>