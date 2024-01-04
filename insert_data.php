<?php 
    /*
    Arguments from index file
    */
    $sheetId = $_POST['sheetId'];
    $sheet = $_POST['sheet'];
    $gameData = $_POST['gamesData'];



    $path = 'gamesList.json';
    $fp = fopen($path, 'w');
    fwrite($fp, $gameData);
    fclose($fp);

    // Local Testing
    /* $python_file_name = "insertGames.py "; 
    $python_execution = "python ".$python_file_name .$sheetId .'sheetname' .$sheet .'gamesData' .$gameData; 
    $output = shell_exec($python_execution); 
    echo ($output);  */  
    
    // For Server
    $py_command = escapeshellcmd('source /home/neuronic/virtualenv/public_html/earshot/3.9/bin/python insertGames.py ' .$sheetId .'sheetname' .$sheet .'gamesData' .$gameData); 
    $com_output = shell_exec($py_command); 
    echo $com_output;
?>