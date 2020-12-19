namespace L09_Snowboardpiste_No2 {

   export class Background {

        drawBackground(_crc2: CanvasRenderingContext2D): void {
            console.log("Background");

            let gradient: CanvasGradient = _crc2.createLinearGradient(0, 0, 0, _crc2.canvas.height);
            gradient.addColorStop(0, "blue");
            gradient.addColorStop(.2, "lightblue");
            gradient.addColorStop(.4, "white");
            gradient.addColorStop(1, "white");

            _crc2.fillStyle = gradient;
            _crc2.fillRect(0, 0, _crc2.canvas.width, _crc2.canvas.height);
        }
    }
}