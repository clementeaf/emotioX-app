const fs = require('fs');
const { execSync } = require('child_process');

const credentialsPath = './aws-credentials.json';

try {
  execSync('aws --version');
} catch (error) {
  throw new Error('AWS CLI no está instalado o no está en el PATH.');
}


try {
  if (!fs.existsSync(credentialsPath)) {
    throw new Error(`Archivo ${credentialsPath} no encontrado.`);
  }
  
  // Leer el archivo de credenciales
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  // Validar que las credenciales sean válidas
  if (!credentials.aws_access_key_id || !credentials.aws_secret_access_key || !credentials.region) {
    throw new Error('El archivo aws-credentials.json no tiene los campos necesarios.');
  }

  console.log('Configurando AWS CLI...');

  // Configurar las credenciales usando aws configure
  execSync(`aws configure set aws_access_key_id ${credentials.aws_access_key_id}`);
  execSync(`aws configure set aws_secret_access_key ${credentials.aws_secret_access_key}`);
  execSync(`aws configure set default.region ${credentials.region}`);

  console.log('AWS CLI configurado exitosamente.');
} catch (error) {
  console.error('Error al configurar AWS CLI:', error.message);
  process.exit(1);
}
