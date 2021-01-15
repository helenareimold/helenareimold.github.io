namespace L11_Snowboardpiste_No4 {

    export class Snow extends Moveable{

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
    }

}