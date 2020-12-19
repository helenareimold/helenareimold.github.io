namespace L09_Snowboardpiste_No2 {

    export class Cloud {
        position: Vector;
        size: Vector;

        constructor(_position: Vector, _size: Vector) {
            this.position = _position;
            this.size = _size;
        }

        drawCloud(_crc2: CanvasRenderingContext2D): void {
            console.log("Cloud", this.position, this.size);

            let radiusParticle: number = 40;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = _crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

            _crc2.save();
            _crc2.translate(this.position.x, this.position.y);
            _crc2.fillStyle = gradient;

            _crc2.save();
            let x: number = this.size.x;
            let y: number = -this.size.y;
            _crc2.translate(x, y);
            _crc2.fill(particle);
            _crc2.restore();

            _crc2.restore();
        }
    }
}