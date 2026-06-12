// Programa de prueba: grabalo en un micro:bit V2 y conectalo desde el
// entrenador SmartTEAM ML con el botón "📶 Bluetooth".

smartteamMLBT.mostrarNombreBluetooth()

smartteamMLBT.alDetectarClase("clase 1", function () {
    basic.showIcon(IconNames.Happy)
})

smartteamMLBT.cuandoNoHayDeteccion(function () {
    basic.clearScreen()
})
