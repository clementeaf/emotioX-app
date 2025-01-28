try {
    # Verificar si el archivo outputs.json existe
    if (-Not (Test-Path "outputs.json")) {
        Write-Host "El archivo outputs.json no existe. Genera los outputs con AWS CLI antes de ejecutar este script." -ForegroundColor Red
        exit 1
    }

    # Cargar el archivo outputs.json generado por AWS CLI
    $json = Get-Content -Raw -Path outputs.json | ConvertFrom-Json

    # Crear un objeto de configuración
    $config = @{}

    # Rellenar el objeto con los Outputs del stack
    foreach ($output in $json) {
        $config[$output.OutputKey] = $output.OutputValue
    }

    # Convertir el objeto de configuración a un archivo JavaScript
    $configJs = "export const apiConfig = " + (ConvertTo-Json -InputObject $config -Depth 2)

    # Crear el directorio si no existe
    if (-Not (Test-Path "./frontend/src/config")) {
        New-Item -ItemType Directory -Force -Path "./frontend/src/config"
    }

    # Guardar el archivo en la ruta del frontend
    $configJs | Set-Content -Path "./frontend/src/config/apiConfig.ts"

    Write-Host "Archivo apiConfig.ts generado con éxito en ./frontend/src/config/" -ForegroundColor Green
} catch {
    Write-Host "Ocurrió un error: $_" -ForegroundColor Red
    exit 1
}
