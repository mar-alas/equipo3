#!/bin/bash

process_files() {
    index=1
    end=16
    # entra a features
    cd features/
    until [ $index -ge $end ]
    do
    # le quita la extencion .txt para poder ejecutarlo
    echo "------------------------------------ESCENARIO$index------------------------------------"
    file="esc$index.feature.txt"
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

    ((index++))
    done
}

# Call the function
process_files
