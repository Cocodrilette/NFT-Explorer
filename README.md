# Avalanche NFT Explorer

## Configuración inicial

### 1. Crear una ApiKey en Avacloud

Para eso vamos a ir [aqui](https://app.avacloud.io/glacier-api/), vamos a crear una cuenta si no la tenemos y vamos una ApiKey y la vamos guardar.

### 2. Completar las varibles de entorno

Crear un archivo `.env` en la raiz del proyecto y vamos a agregar este contenido:

```
REACT_APP_AVACLOUD_API_KEY=""

REACT_APP_RPC_URL="https://rpc.ankr.com/avalanche_fuji"
REACT_APP_AVACLOUD_CHAIN_ID="43113"
REACT_APP_AVACLOUD_NETWORK="fuji"
```
