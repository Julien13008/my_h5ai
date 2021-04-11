<?php

include 'h5ai.php';

echo '----';

$array = array();

$test->getFiles($array,$test->getPath() . $_POST['folder']);

$test->printTree($test->getTree());
?>