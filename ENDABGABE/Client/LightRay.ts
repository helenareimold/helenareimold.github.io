namespace Endabgabe_EIA2 {

    export class LightRay extends Moveable {

        thickness: string;
        color: string;
        radius: number;
        radiusEnde: number;
        duration: number;

        constructor(_position: Vector, _thickness: string, _color: string, _duration: number, _radius: number, _radiusEnde: number) {
            super();
            this.position = _position;
            this.thickness = _thickness;
            this.color = _color;
            this.radius = _radius;
            this.radiusEnde = _radiusEnde;
            this.duration = _duration;
        }

        draw(): void {
            crc2.beginPath();
            for (let grade: number = -1; grade <= 1; grade = grade + 0.2) {

                let jump: number = grade * Math.PI;
                crc2.moveTo(this.position.x, this.position.y);
                crc2.lineTo(this.position.x + this.radius * Math.cos(jump), this.position.y + this.radius * Math.sin(jump));

                let gradient = crc2.createRadialGradient(this.position.x, this.position.y, 0, this.position.x + this.radius * Math.cos(jump), this.position.y + this.radius * Math.sin(jump), this.radiusEnde);
                gradient.addColorStop(0, "black");
                gradient.addColorStop(0.3, this.color);
                gradient.addColorStop(1, "transparent");


                crc2.strokeStyle = gradient;

                switch (this.thickness) {
                    case "small": crc2.lineWidth = 1;
                        break;
                    case "middle": crc2.lineWidth = 2;
                        break;
                    case "big": crc2.lineWidth = 3;
                        break;
                }

                crc2.stroke();

                if (this.radius >= this.radiusEnde) {
                    crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);                                                 //Nach der letzten Schleife Leinwand leeren
                    crc2.putImageData(imageData, 0, 0);
                }

                crc2.beginPath();
            }
            crc2.closePath();
        }

        animate(): void {
            setTimeout(() => {
                if (this.radius <= this.radiusEnde) {
                    this.draw();
                    this.radius++;
                    this.animate();
                }

            }, this.duration / this.radiusEnde);
        }
    }
}