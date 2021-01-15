namespace L11_Snowboardpiste_No4 {

    export class Mountain {

        drawMountain(_crc2: CanvasRenderingContext2D): void {
            console.log("Mountains");

            _crc2.beginPath();
            _crc2.moveTo(0, 400);
            _crc2.lineTo(100, 250);
            _crc2.lineTo(200, 420);
            _crc2.lineTo(300, 300);
            _crc2.lineTo(400, 400);
            _crc2.lineTo(500, 150);
            _crc2.lineTo(600, 370);
            _crc2.lineTo(700, 270);
            _crc2.lineTo(800, 470);
            _crc2.lineTo(900, 220);
            _crc2.lineTo(1000, 400);
            _crc2.lineTo(1100, 300);
            _crc2.lineTo(1200, 400);
            _crc2.lineTo(1200, _crc2.canvas.height * 0.62 + 50);
            _crc2.lineTo(0, _crc2.canvas.height * 0.62);
            _crc2.lineTo(0, 400);

            let gradient: CanvasGradient = _crc2.createLinearGradient(0, 0, 0, _crc2.canvas.height * 0.62 + 50);
            gradient.addColorStop(0, "white");
            gradient.addColorStop(0.5, "white");
            gradient.addColorStop(1, "grey");

            _crc2.fillStyle = gradient;
            _crc2.fill();


        }

    }

}