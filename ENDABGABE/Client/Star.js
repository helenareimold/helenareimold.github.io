var Endabgabe_EIA2;
(function (Endabgabe_EIA2) {
    class Star extends Endabgabe_EIA2.Moveable {
        constructor(_position, _size) {
            super();
            this.position = _position;
            this.size = _size;
        }
        draw() {
            let stars = 1000;
            let radiusParticle = 0.5;
            let particle = new Path2D();
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            Endabgabe_EIA2.crc2.save();
            Endabgabe_EIA2.crc2.translate(this.position.x, this.position.y);
            Endabgabe_EIA2.crc2.fillStyle = "white";
            for (let drawn = 0; drawn < stars; drawn++) {
                Endabgabe_EIA2.crc2.save();
                let x = (Math.random() - 0.5) * this.size.x;
                let y = (Math.random() - 0.5) * this.size.y;
                Endabgabe_EIA2.crc2.translate(x, y);
                Endabgabe_EIA2.crc2.fill(particle);
                Endabgabe_EIA2.crc2.restore();
            }
            Endabgabe_EIA2.crc2.restore();
        }
    }
    Endabgabe_EIA2.Star = Star;
})(Endabgabe_EIA2 || (Endabgabe_EIA2 = {}));
//# sourceMappingURL=Star.js.map