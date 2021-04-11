<?php

class H5AI{

    private $_tree;
    private $_path;

    function __construct($_path)
    {  
        $this->_tree = array();
        $this->_path = $_path;
    }

    function getPath(){
        return $this->_path;
    }

    function setPath($_path){
        $this->_path = $_path;
        return $this->_path;
    }

    function getTree(){
        return $this->_tree;
    }

    function setTree($_tree){
        $this->_tree = $_tree;
        return $this->_tree;
    }

    function getFiles($listFile, $parent){
        $directory = scandir($parent);
        foreach ($directory as $key => $value) {
            if (substr($value, 0 ,1) != ".") {
                //echo $value . PHP_EOL;
                $file = $parent . "/" . $value;

                if (is_dir($file)) {
                    $listFileActual = array();
                    $listFile[$value] = $this->getFiles($listFileActual, $file);
                } else {
                    array_push($listFile, $value);
                }    
            }
        }

        $this->setTree($listFile);
        return $listFile;
    }

    function printTree($tree, $actualFolder){

        foreach ($tree as $key => $files) {
            
            if (is_array($files)) {
                $path = $actualFolder . "/" . $key;
                $lastModif = date("F j, Y, g:i a", filemtime($path));
                $sizeFile = convertByte(filesize($path));
                echo "<tr><td class='icon'><i class='fas fa-folder fa-2x'></i></td><td id='" . $key . "' class='folder name'>" . $key . "</td> <td class='date'>". $lastModif ."</td><td class='size' size='". filesize($path) ."'>". $sizeFile ."</td></tr>";
            } else {
                $files_id = str_replace(".", "_", $files);
                $path = $actualFolder . "/" . $files;
                $sizeFile = convertByte(filesize($path));
                $lastModif = gmdate("F j, Y, g:i a", filemtime($path));
                echo "<tr>";
                $this->iconExtension($path);
                echo "<div id='colorPicker'></div></td>";
                echo "<td id='" . $files_id . "' class='file name'>" . $files;
                echo "<div id='dialog' style='display: none;'></div>";
                echo  "</td> <td class='date'>". $lastModif ."</td><td class='size' size='". filesize($path) ."'>". $sizeFile ."</td></tr>";

            }
                        
        }

    }

    function iconExtension($path){

        $extension = substr($path, strrpos($path, "."));

        switch ($extension) {
            case '.php':
                echo "<td class='icon'><i class='fab fa-php fa-2x'></i>";
                break;
            
            case '.html':

                if (strstr(htmlentities(file_get_contents($path)), ".ico") !== false) {
                    echo "<td class='icon'><img src='favicon.ico' height='32px'></td>";
                } else {
                    echo "<td class='icon'><i class='fab fa-html5 fa-2x'></i>";
                }
                
                break;

            case '.css':
                echo "<td class='icon'><i class='fab fa-css3-alt fa-2x'></i>";
                break;

            case '.js':
                echo "<td class='icon'><i class='fab fa-js fa-2x'></i>";
                break;

            case '.png':
            case '.jpg':
            case '.jpeg':
            case '.gif':
                echo "<td class='icon'><i class='fas fa-file-image fa-2x'></i>";
                break;

            case '.txt':
            case '.docx':
            case '.odf':
            case '.json':
                echo "<td class='icon'><i class='far fa-file-alt fa-2x'></i>";
                break;

            case '.pdf':
                echo "<td class='icon'><i class='fas fa-file-pdf fa-2x'></i>";
                break;

            case '.py':
                echo "<td class='icon'><i class='fab fa-python fa-2x'></i>";
                break;

            case '.ico':
                echo "<td class='icon'><i class='fas fa-star fa-2x'></i>";
                break;

            default:
                echo "<td class='icon'><i class='fas fa-align-left'></i>";
                break;
        }
    }

}

function convertByte($fileSize){

    $fileSize = floatval($fileSize);

    $arrayByte = array(
        0 => array(
            "UNIT" => "TB",
            "VALUE" => pow(1024, 4)
        ),
        1 => array(
            "UNIT" => "GB",
            "VALUE" => pow(1024, 3)
        ),
        2 => array(
            "UNIT" => "MB",
            "VALUE" => pow(1024, 2)
        ),
        3 => array(
            "UNIT" => "KB",
            "VALUE" => 1024
        ),
        4 => array(
            "UNIT" => "B",
            "VALUE" => 1
        ),
    );

    foreach ($arrayByte as $value) {
        if ($fileSize >= $value['VALUE']) {
            $result = $fileSize / $value['VALUE'];
            $result = str_replace(".", ",", strval(round($result, 2). " ".$value['UNIT']));
            break;
        }
    }

    return $result;

}

?>