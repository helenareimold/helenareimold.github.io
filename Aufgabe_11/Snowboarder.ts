namespace L11_Snowboardpiste_No4 {

    export class Snowboarder extends Moveable {
        check: number = 0;

        generateSnowPeople(_crc2: CanvasRenderingContext2D): void {
            _crc2.save();
            _crc2.translate(this.position.x, this.position.y);
            _crc2.save()
            let x: number = this.size.x;
            let y: number = -this.size.y;
            _crc2.translate(x, y);
            this.drawSnowPeople(_crc2, "orange");
            _crc2.restore();
            _crc2.restore();
        }

        drawSnowPeople(_crc2: CanvasRenderingContext2D, _color: string): void {
            console.log("SnowPeople");
            let snowboarder: Path2D = new Path2D();
            snowboarder.arc(275, 675, 5, 0, Math.PI * 2, true); // Kopf
            _crc2.fillStyle = _color;
            _crc2.fill(snowboarder);

            snowboarder.moveTo(275, 680);       // Rumpf
            snowboarder.lineTo(275, 690);
            snowboarder.closePath();

            snowboarder.moveTo(275, 690);       // Bein links
            snowboarder.lineTo(270, 695);

            snowboarder.moveTo(275, 690);       // Bein rechts
            snowboarder.lineTo(280, 695);

            snowboarder.moveTo(270, 684);       // Arme
            snowboarder.lineTo(280, 685);

            snowboarder.moveTo(265, 696);       // Snowboard
            snowboarder.lineTo(285, 696);
            _crc2.strokeStyle = "black";
            _crc2.stroke(snowboarder);
        }
    }

}