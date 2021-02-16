var Endabgabe_EIA2;
(function (Endabgabe_EIA2) {
    class LightRay extends Endabgabe_EIA2.Moveable {
        constructor(_position, _thickness, _color, _duration, _radius, _radiusEnde) {
            super();
            this.position = _position;
            this.thickness = _thickness;
            this.color = _color;
            this.radius = _radius;
            this.radiusEnde = _radiusEnde;
            this.duration = _duration;
        }
        draw() {
            Endabgabe_EIA2.crc2.beginPath();
            for (let grade = -1; grade <= 1; grade = grade + 0.2) {
                let jump = grade * Math.PI;
                Endabgabe_EIA2.crc2.moveTo(this.position.x, this.position.y);
                Endabgabe_EIA2.crc2.lineTo(this.position.x + this.radius * Math.cos(jump), this.position.y + this.radius * Math.sin(jump));
                let gradient = Endabgabe_EIA2.crc2.createRadialGradient(this.position.x, this.position.y, 0, this.position.x + this.radius * Math.cos(jump), this.position.y + this.radius * Math.sin(jump), this.radiusEnde);
                gradient.addColorStop(0, "black");
                gradient.addColorStop(0.3, this.color);
                gradient.addColorStop(1, "transparent");
                Endabgabe_EIA2.crc2.strokeStyle = gradient;
                switch (this.thickness) {
                    case "small":
                        Endabgabe_EIA2.crc2.lineWidth = 1;
                        break;
                    case "middle":
                        Endabgabe_EIA2.crc2.lineWidth = 2;
                        break;
                    case "big":
                        Endabgabe_EIA2.crc2.lineWidth = 3;
                        break;
                }
                Endabgabe_EIA2.crc2.stroke();
                if (this.radius >= this.radiusEnde) {
                    Endabgabe_EIA2.crc2.clearRect(0, 0, Endabgabe_EIA2.crc2.canvas.width, Endabgabe_EIA2.crc2.canvas.height); //Nach der letzten Schleife Leinwand leeren
                    Endabgabe_EIA2.crc2.putImageData(Endabgabe_EIA2.imageData, 0, 0);
                }
                Endabgabe_EIA2.crc2.beginPath();
            }
            Endabgabe_EIA2.crc2.closePath();
        }
        animate() {
            setTimeout(() => {
                if (this.radius <= this.radiusEnde) {
                    this.draw();
                    this.radius++;
                    this.animate();
                }
            }, this.duration / this.radiusEnde);
        }
    }
    Endabgabe_EIA2.LightRay = LightRay;
})(Endabgabe_EIA2 || (Endabgabe_EIA2 = {}));
//# sourceMappingURL=LightRay.js.map