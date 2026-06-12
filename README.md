# SmartTEAM ML Bluetooth — extensión para micro:bit (MakeCode)

Bloques en español para que el micro:bit reaccione **por Bluetooth** a las
clases que detecta el **entrenador SmartTEAM ML** en el navegador. Sin cables:
ideal para proyectos que se mueven (robots, wearables) y para tablets/Android,
donde el USB no está disponible.

> **Requiere micro:bit V2.** La V1 queda sin memoria con el stack Bluetooth.
>
> Para conexión por **cable USB** usá la extensión `smartteam-makecode-extension`.
> No agregues las dos al mismo proyecto: este paquete usa `bluetooth`, que en
> MakeCode además es incompatible con `radio`.

## Bloques

| Bloque | Tipo | Qué hace |
|---|---|---|
| `mostrar nombre Bluetooth` | acción | Muestra en los LEDs el nombre propio de la placa (ej. `zatig`) para encontrarla en el selector del navegador |
| `nombrar placa [alias]` | acción | Le pone un alias (ej. "placa de Juana") que el entrenador muestra al conectar |
| `al detectar clase ML [nombre]` | evento | Se ejecuta cuando el entrenador detecta esa clase |
| `cuando no se detecta ninguna clase ML` | evento | Se ejecuta cuando se pierde la detección |
| `clase ML actual` | reporter (texto) | La última clase conocida (`none` si no hay). Se actualiza sola |
| `clase ML es [nombre]` | reporter (booleano) | Verdadero si la clase actual es esa. Se actualiza sola |
| `pedir clase ML` | acción | Fuerza un pedido inmediato (opcional: la extensión ya pregunta sola) |
| `al conectar Bluetooth` / `al desconectar Bluetooth` | eventos | Para mostrar un ✓/✗ y que los chicos sepan si están conectados |

El nombre de la clase debe escribirse **igual** que en el entrenador
(mayúsculas/minúsculas y espacios incluidos).

### Cómo funciona por dentro

Mismo protocolo "a pedido" que la versión USB: la extensión envía `ML?` cada
~200 ms **solo mientras hay una computadora conectada**, y el entrenador
responde una línea `ML:<clase>`. El buffer del micro:bit nunca se llena porque
nada llega sin pedirlo.

## Paso a paso para docentes

### 1. Programar el micro:bit (una sola vez por programa)

1. Abrí [makecode.microbit.org](https://makecode.microbit.org) y creá un proyecto nuevo.
2. ⚙️ → **Extensiones** → pegá la URL de este repositorio. Aparece la categoría
   **SmartTEAM ML BT** (celeste).
3. Armá tu programa. Ejemplo:
   - `al iniciar` → `nombrar placa "placa de Juana"` + `mostrar nombre Bluetooth`
   - `al conectar Bluetooth` → `mostrar ícono` ✓
   - `al detectar clase ML "pulgar arriba"` → `mostrar ícono` 😊
4. **Verificá el emparejamiento**: ⚙️ → **Configuración del proyecto** → debe
   estar en **"No Pairing Required"** (esta extensión ya lo preconfigura, pero
   confirmalo si la conexión pide emparejar).
5. Conectá el micro:bit por USB **solo para grabar** el programa (Descargar).
   Después podés desenchufarlo: alcanza con una batería.

### 2. Conectar desde el entrenador

1. Abrí el entrenador SmartTEAM ML en **Chrome o Edge** (también funciona en
   Android/ChromeOS) y entrená tus clases.
2. En el panel **micro:bit** tocá **📶 Bluetooth**.
3. En el selector del navegador buscá el nombre que muestra la placa en sus
   LEDs (ej. "BBC micro:bit [zatig]") y conectá.
4. El panel muestra la placa conectada (nombre + alias) y el contador de
   "pedidos respondidos" late a ~5 por segundo.

### 3. Jugar

Hacé el gesto: el micro:bit reacciona sin cables. Alcance típico en aula:
unos metros con línea de vista; si se aleja demasiado, el panel avisa que se
perdió la conexión y se reconecta con un toque.

## Problemas frecuentes

- **"GATT Error: Not supported" al conectar** → el `.hex` quedó compilado con
  emparejamiento requerido. En MakeCode: ⚙️ → Configuración del proyecto →
  activá **"No Pairing Required"** → **volvé a descargar y regrabar** (la
  config vive dentro del firmware). Si la placa figura emparejada en el
  Bluetooth del sistema operativo, eliminala de ahí y reintentá.
- **La placa no aparece en el selector** → verificá que el programa con esta
  extensión esté grabado y la placa encendida; acercala a la computadora.
- **Pide emparejar / no conecta** → el proyecto debe estar en "No Pairing
  Required" (paso 1.4). En Windows, si la placa se emparejó antes desde la
  configuración del sistema, "olvidála" ahí y probá de nuevo.
- **Conecta pero no llegan clases** → ¿el modelo está entrenado? ¿el contador
  de pedidos crece? Si no crece, regrabá el `.hex` (programas con la extensión
  USB no preguntan por Bluetooth).
- **"La placa no tiene el servicio UART"** → el programa grabado no usa esta
  extensión; grabá uno que sí.
- **Cada conexión es de a una** → una placa acepta UNA computadora por vez.

## Detalles técnicos

- Servicio UART de Nordic (NUS) sobre BLE; escrituras del navegador en
  paquetes de ≤20 bytes.
- micro:bit → navegador: `ML?\n` (sondeo, solo conectado) y `ML@<alias>\n`
  (al conectar, si se usó `nombrar placa`).
- navegador → micro:bit: `ML:<clase>\n`, una respuesta por pedido; `none` es
  la clase reservada para "sin detección".
- Emparejamiento: modo abierto (`bluetooth.open = 1` vía yotta config).

## Licencia

MIT

#### Metadatos (usados para búsqueda, renderizado)

* for PXT/microbit
