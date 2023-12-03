::Se correo con el comando .\ejecutar_escenarios.bat en powershell o con el comando ejecutar_escenarios.bat

@echo off

:: Define the function
:process_files
setlocal EnableDelayedExpansion
set index=1
set end=21

:: Change directory to features
cd features

:loop
if %index% lss %end% (
    echo ------------------------------------ESCENARIO!index!------------------------------------
    set file=Escenario!index!.feature.txt
	echo file: !file!
    REM Remove the last 4 characters
	set filename=!file:~0,-4!
	echo filename: !filename!
	
	ren  "!file!" "!filename!"
	
    set ESCENARIO=escenario!index!
    cd ..
    call npx kraken-node run
    cd features
    ren  "!filename!" "!file!"

    :: Increment index
    set /a index+=1
    goto :loop
)
endlocal
exit /b

:: Call the function
call :process_files
