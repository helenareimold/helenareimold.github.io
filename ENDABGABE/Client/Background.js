var Endabgabe_EIA2;
(function (Endabgabe_EIA2) {
    class Background extends Endabgabe_EIA2.Moveable {
        draw() {
            Endabgabe_EIA2.crc2.rect(0, 0, Endabgabe_EIA2.crc2.canvas.width, Endabgabe_EIA2.crc2.canvas.height);
            Endabgabe_EIA2.crc2.fillStyle = "black";
            Endabgabe_EIA2.crc2.fill();
            Endabgabe_EIA2.crc2.font = "1em Nunito";
            Endabgabe_EIA2.crc2.fillStyle = "white";
            Endabgabe_EIA2.crc2.textAlign = "center";
            Endabgabe_EIA2.crc2.fillText("Try out your firework below", 205, 30);
        }
    }
    Endabgabe_EIA2.Background = Background;
})(Endabgabe_EIA2 || (Endabgabe_EIA2 = {}));
//# sourceMappingURL=Background.js.map