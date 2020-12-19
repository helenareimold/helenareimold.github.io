namespace L09_Snowboardpiste_No2 {

    export class Snow {
        position: Vector;
        size: Vector;
        particle: Path2D;

        constructor(_size: Vector, _position: Vector) {
            console.log("Snow constructor");

            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);

            this.size = _size;
            this.particle = new Path2D();
        }

        drawSnow(_crc2: CanvasRenderingContext2D): void {
            _crc2.save();
            console.log("Snow", this.position, this.size);

            let radiusParticle: number = Math.random() * 5;
            this.particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
           

            _crc2.translate(this.position.x, this.position.y);
            _crc2.fillStyle = "white";

            let x: number = this.size.x;
            let y: number = - this.size.y;
            _crc2.translate(x, y);
            _crc2.fill(this.particle);
            _crc2.restore();

        }
        move(_crc2: CanvasRenderingContext2D): void {
            this.size.y -= 2;

            if (this.size.y < -_crc2.canvas.height)
                this.size.y = 0;
        }

    }

}