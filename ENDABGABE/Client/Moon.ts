namespace Endabgabe_EIA2 {

    export class Moon extends Moveable {

        constructor(_position: Vector) {
            super();
            this.position = _position;
        }
        draw(): void {
            crc2.beginPath();
            let r1: number = 30;
            let r2: number = 60;
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

            gradient.addColorStop(0, "HSLA(0, 0%, 90%, 1)");
            gradient.addColorStop(1, "HSLA(0, 0%, 50%, 0)");

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;
            crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            crc2.fill();
            crc2.restore();
            crc2.closePath();
        }

    }
}