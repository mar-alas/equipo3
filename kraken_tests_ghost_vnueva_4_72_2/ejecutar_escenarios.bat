::Se correo con el comando .\ejecutar_escenarios.bat en powershell o con el comando ejecutar_escenarios.bat

@echo off

:: Define the function
:process_files
setlocal EnableDelayedExpansion

:: en la siguiente lista se ponen los escenarios que se desean correr
set indices= 2 6 7 8 9 10 12 16 17 18
::set indices= 6


:: Change directory to features
cd features


for %%i in (%indices%) do (
    set index=%%i
    echo ------------------------------------ESCENARIO!index!------------------------------------
    set file=Escenario!index!.feature.txt
    echo file: !file!
    REM Remove the last 4 characters
    set filename=!file:~0,-4!
    echo filename: !filename!

    ren "!file!" "!filename!"

    set ESCENARIO=escenario!index!
    cd ..
    call npx kraken-node run
    cd features
    ren "!filename!" "!file!"
)
endlocal
exit /b

:: Call the function
call :process_files
