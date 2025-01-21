import fs from 'fs';
import { execSync } from 'child_process';

// Paths de configuración
const credentialsPath = './aws-credentials.json';
const assumeRolePolicyPath = './assume-role-policy.json';
const outputsPath = './outputs.json';
const apiConfigPath = './frontend/src/config/apiConfig.ts';

// Tipos para las funciones
type AWSOutput = {
  [key: string]: {
    OutputValue: string;
  };
};

function logMessage(message: string): void {
  console.log(`[INFO]: ${message}`);
}

function logError(message: string): void {
  console.error(`[ERROR]: ${message}`);
  process.exit(1);
}

// Configuración inicial de AWS CLI
function configureAWS(): void {
  try {
    logMessage('Validando instalación de AWS CLI...');
    execSync('aws --version', { stdio: 'ignore' });
    logMessage('AWS CLI está instalado correctamente.');
  } catch {
    logError('AWS CLI no está instalado. Por favor instálalo antes de continuar.');
  }

  if (!fs.existsSync(credentialsPath)) {
    logError(`Archivo de credenciales no encontrado: ${credentialsPath}`);
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  if (!credentials.aws_access_key_id || !credentials.aws_secret_access_key) {
    logError('Las credenciales AWS no son válidas.');
  }

  logMessage('Configurando AWS CLI...');
  try {
    execSync(`aws configure set aws_access_key_id ${credentials.aws_access_key_id}`);
    execSync(`aws configure set aws_secret_access_key ${credentials.aws_secret_access_key}`);
    execSync(`aws configure set default.region ${credentials.region}`);
    logMessage('AWS CLI configurado exitosamente.');
  } catch (error) {
    logError('Error al configurar AWS CLI.');
  }
}

// Creación de roles y políticas con AWS CLI
function createRolesAndPolicies(): void {
  if (!fs.existsSync(assumeRolePolicyPath)) {
    logError(`Archivo de políticas no encontrado: ${assumeRolePolicyPath}`);
  }

  const roleName = 'serverless-deployment-role';
  logMessage(`Creando rol IAM "${roleName}"...`);
  try {
    const assumeRolePolicy = fs.readFileSync(assumeRolePolicyPath, 'utf8');
    execSync(
      `aws iam create-role --role-name ${roleName} --assume-role-policy-document '${assumeRolePolicy}'`,
      { stdio: 'inherit' }
    );
    logMessage(`Rol IAM "${roleName}" creado exitosamente.`);
  } catch (error) {
    logError(`Error al crear el rol IAM: ${error}`);
  }
}

// Instalación de dependencias y despliegue con Serverless
function deployServerless(): void {
  logMessage('Instalando dependencias...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    logMessage('Dependencias instaladas.');
  } catch {
    logError('Error al instalar las dependencias.');
  }

  logMessage('Compilando proyecto TypeScript...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    logMessage('Proyecto compilado correctamente.');
  } catch {
    logError('Error durante la compilación.');
  }

  logMessage('Desplegando con Serverless Framework...');
  try {
    execSync(`npx serverless deploy --output ${outputsPath}`, { stdio: 'inherit' });
    logMessage('Despliegue completado exitosamente.');
  } catch {
    logError('Error durante el despliegue.');
  }
}

// Generar archivo de configuración para el frontend
function generateFrontendConfig(): void {
  logMessage('Generando archivo de configuración para el frontend...');
  if (!fs.existsSync(outputsPath)) {
    logError(`Archivo de outputs no encontrado: ${outputsPath}`);
  }

  try {
    const outputs: AWSOutput = JSON.parse(fs.readFileSync(outputsPath, 'utf8'));
    const config: Record<string, string> = {};

    // Crear objeto de configuración basado en los outputs del stack
    for (const key in outputs) {
      if (outputs[key]?.OutputValue) {
        config[key] = outputs[key].OutputValue;
      }
    }

    const configJs = `export const apiConfig = ${JSON.stringify(config, null, 2)};\n`;
    fs.writeFileSync(apiConfigPath, configJs, 'utf8');
    logMessage(`Archivo de configuración generado en: ${apiConfigPath}`);
  } catch (error) {
    logError(`Error al generar el archivo de configuración: ${error}`);
  }
}

// Ejecución principal
function main(): void {
  logMessage('Iniciando despliegue automatizado...');
  configureAWS();
  createRolesAndPolicies();
  deployServerless();
  generateFrontendConfig();
  logMessage('Proceso de despliegue completado. Todo está listo.');
}

main();
