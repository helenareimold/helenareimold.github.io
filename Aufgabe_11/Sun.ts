namespace L11_Snowboardpiste_No4 {

  export class Sun {

        drawSun(_crc2: CanvasRenderingContext2D, _position: Vector): void {
            console.log("Sun", _position);

            let r1: number = 50;
            let r2: number = 130;
            let gradient: CanvasGradient = _crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

            gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
            gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");

            _crc2.save();
            _crc2.translate(_position.x, _position.y);
            _crc2.fillStyle = gradient;
            _crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            _crc2.fill();
            _crc2.restore();
        }
    }
}