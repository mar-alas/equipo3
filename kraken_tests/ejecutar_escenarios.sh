#!/bin/bash

process_files() {
  index=1
  end=21
  # entra a features
  cd features/
  until [ $index -lt $end ]
  do
    # le quita la extencion .txt para poder ejecutarlo
    echo "------------------------------------ESCENARIO$index------------------------------------"
    file="Escenario$index.feature.txt"
    filename=$(basename "$file" .txt)
    mv "$file" "$filename"

    # crea la variable de ambiente para guardar el screenshot del escenario correcto
    export ESCENARIO="escenario${index}"
    # Corre kraken (se sale del folder features)
    cd ../
    ./node_modules/kraken-node/bin/kraken-node run
    # vuelve a entrar al folder features para renombrar de nuevo el EscenarioX.feature con el .txt
    cd features/
    mv "$filename" "$filename.txt"

    # idealmente encontrar una forma decente de limpiar la instancia, esto es lo q hay por ahora
    # curl 'http://localhost:2368/ghost/api/admin/db/' -X DELETE -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Referer: http://localhost:2368/ghost/' -H 'app-pragma: no-cache' -H 'x-ghost-version: 5.73' -H 'Origin: http://localhost:2368' -H 'Connection: keep-alive' -H 'Cookie: ghost-admin-api-session=s%3AAYoPGlOIVtuwDye27BKHvTAmo87k4EAQ.eXLLcaNQ5inTFPbg53tPjFT4GaTDTqAV5N8u26rANns' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin'
    
    # Llama a rename screenshots que le quita el timestamp a las .png y les pone el nombre esperado
    rename_screenshots
    ((index++))
  done
}

rename_screenshots() {
    cd ../
    directory="screenshots/$ESCENARIO"
    counter=1

    # Enra el directorio de screenshots/escenarioX
    cd "$directory" || exit

    # Itera los archivos .png en el folder escenarioX
    for file in *.png; do
        # Saca el timestamp del archivo
        timestamp=$(echo "$file" | grep -oE '[0-9]+')
        
        # Variable con el nuevo nombre de la imagen
        new_filename="paso${counter}.png"
        
        # Renombra el archivo timestamp.png a pasoX.png
        mv "$file" "$new_filename"
        
        # Incrementa el contador (seria el # de paso)
        ((counter++))
    done
    cd ../../features/
}

# Call the function
process_files