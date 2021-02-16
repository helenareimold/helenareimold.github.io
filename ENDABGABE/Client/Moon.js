var Endabgabe_EIA2;
(function (Endabgabe_EIA2) {
    class Moon extends Endabgabe_EIA2.Moveable {
        constructor(_position) {
            super();
            this.position = _position;
        }
        draw() {
            Endabgabe_EIA2.crc2.beginPath();
            let r1 = 30;
            let r2 = 60;
            let gradient = Endabgabe_EIA2.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(0, 0%, 90%, 1)");
            gradient.addColorStop(1, "HSLA(0, 0%, 50%, 0)");
            Endabgabe_EIA2.crc2.save();
            Endabgabe_EIA2.crc2.translate(this.position.x, this.position.y);
            Endabgabe_EIA2.crc2.fillStyle = gradient;
            Endabgabe_EIA2.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            Endabgabe_EIA2.crc2.fill();
            Endabgabe_EIA2.crc2.restore();
            Endabgabe_EIA2.crc2.closePath();
        }
    }
    Endabgabe_EIA2.Moon = Moon;
})(Endabgabe_EIA2 || (Endabgabe_EIA2 = {}));
//# sourceMappingURL=Moon.js.map