// Programa de prueba: grabalo en un micro:bit V2 y conectalo desde el
// entrenador SmartTEAM ML con el botón "📶 Bluetooth".

smartteamMLBT.nombrarPlaca("placa de prueba")
smartteamMLBT.mostrarNombreBluetooth()

smartteamMLBT.alConectarBluetooth(function () {
    basic.showIcon(IconNames.Yes)
})

smartteamMLBT.alDesconectarBluetooth(function () {
    basic.showIcon(IconNames.No)
})

smartteamMLBT.alDetectarClase("clase 1", function () {
    basic.showIcon(IconNames.Happy)
})

smartteamMLBT.cuandoNoHayDeteccion(function () {
    basic.clearScreen()
})
