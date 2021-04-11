<?php

include 'h5ai.php';

$test = new H5AI($_GET['filePrompt']);

$array = array();

$fullPath = $_GET['filePrompt'];

$test->getFiles($array,$test->getPath());

$test->printTree($test->getTree(), $fullPath);

?>