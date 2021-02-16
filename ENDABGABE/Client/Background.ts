namespace Endabgabe_EIA2 {

    export class Background extends Moveable {

        draw(): void {
            crc2.rect(0, 0, crc2.canvas.width, crc2.canvas.height);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.font = "1em Nunito";
            crc2.fillStyle = "white";
            crc2.textAlign = "center";
            crc2.fillText("Try out your firework below", 205, 30);
        }
    }
}
