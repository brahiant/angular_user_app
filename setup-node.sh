#!/bin/bash

# Script para configurar Node.js para el proyecto Angular
echo "🚀 Configurando Node.js para el proyecto Angular..."

# Cargar NVM si no está cargado
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Verificar si existe .nvmrc
if [ -f ".nvmrc" ]; then
    echo "📋 Archivo .nvmrc encontrado"
    REQUIRED_VERSION=$(cat .nvmrc)
    echo "📦 Versión requerida: $REQUIRED_VERSION"
    
    # Verificar si la versión está instalada
    if nvm list | grep -q "$REQUIRED_VERSION"; then
        echo "✅ Versión $REQUIRED_VERSION ya está instalada"
    else
        echo "📥 Instalando versión $REQUIRED_VERSION..."
        nvm install "$REQUIRED_VERSION"
    fi
    
    # Usar la versión especificada
    nvm use "$REQUIRED_VERSION"
    echo "✅ Cambiado a Node.js $REQUIRED_VERSION"
else
    echo "⚠️  No se encontró archivo .nvmrc, usando versión por defecto"
    nvm use default
fi

# Mostrar versiones actuales
echo ""
echo "📊 Versiones actuales:"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo ""

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
else
    echo "✅ Dependencias ya instaladas"
fi

echo ""
echo "🎉 ¡Configuración completada!"
echo "💡 Para ejecutar el proyecto: ng serve"
echo "💡 Para cambiar versiones: nvm use <version>" 