namespace Endabgabe_EIA2 {

    export class LightRay {

        position: Vector;
        color: string;
        radius: number;
        radiusEnde: number;

        constructor(_position: Vector, _color: string, _radius: number, _radiusEnde: number) {
            this.position = _position;
            this.color = _color;
            this.radius = _radius;
            this.radiusEnde = _radiusEnde;
        }

        drawLightRays(): void {

            for (let grade: number = -1; grade <= 1; grade = grade + 0.2) {

                let jump: number = grade * Math.PI;
                crc2.moveTo(this.position.x, this.position.y);
                crc2.lineTo(this.position.x + this.radius * Math.cos(jump), this.position.y + this.radius * Math.sin(jump));

                let gradient = crc2.createRadialGradient(this.position.x, this.position.y, 0, this.position.x + this.radius * Math.cos(jump), this.position.y + this.radius * Math.sin(jump), this.radiusEnde);
                gradient.addColorStop(0, "black");
                gradient.addColorStop(0.3, this.color);
                gradient.addColorStop(0.4, "black");
                gradient.addColorStop(1, "grey");

                crc2.strokeStyle = gradient;
                crc2.stroke();

                if (this.radius >= this.radiusEnde) {
                    crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);                                                 //Nach der letzten Schleife Leinwand leeren
                    crc2.putImageData(imageData, 0, 0);

                }

                crc2.beginPath();
            }
        }
    }
}