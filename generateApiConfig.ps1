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

# Guardar el archivo en la ruta del frontend
$configJs | Set-Content -Path "./frontend/src/config/apiConfig.ts"
