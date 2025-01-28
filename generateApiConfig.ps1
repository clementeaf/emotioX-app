try {
    # Definir la ruta completa del archivo endpoints.json dentro de la carpeta backend
    $endpointsPath = "./backend/endpoints.json"

    # Verificar si el archivo endpoints.json existe
    if (-Not (Test-Path $endpointsPath)) {
        Write-Host "El archivo endpoints.json no existe en $endpointsPath. Genera los endpoints con Serverless antes de ejecutar este script." -ForegroundColor Red
        exit 1
    }

    # Cargar el archivo endpoints.json generado por Serverless
    $json = Get-Content -Raw -Path $endpointsPath | ConvertFrom-Json

    # Verificar si el contenido no está vacío
    if (-Not $json) {
        Write-Host "El archivo endpoints.json está vacío o no tiene un formato válido." -ForegroundColor Red
        exit 1
    }

    # Crear un objeto de configuración
    $config = @{
        ApiUrl = "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com" # Base URL de la API
        Routes = @{}
    }

    # Rellenar las rutas desde el JSON cargado
    foreach ($key in $json.PSObject.Properties.Name) {
        $config.Routes[$key] = $json.$key
    }

    # Convertir el objeto de configuración a un archivo JavaScript
    $configJs = "export const apiConfig = " + (ConvertTo-Json -InputObject $config -Depth 3)

    # Crear el directorio si no existe
    $outputDir = "./frontend/src/config"
    if (-Not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Force -Path $outputDir
    }

    # Guardar el archivo en la ruta del frontend
    $configJs | Set-Content -Path "$outputDir/apiConfig.ts"

    Write-Host "Archivo apiConfig.ts generado con éxito en $outputDir/" -ForegroundColor Green
} catch {
    Write-Host "Ocurrió un error: $_" -ForegroundColor Red
    exit 1
}
