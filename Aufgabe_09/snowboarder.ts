namespace L09_Snowboardpiste_No2 {

    export class Snowboarder {
        check: number = 0;
        position: Vector;
        size: Vector;

        constructor(_position: Vector, _size: Vector) {
            this.position = _position;
            this.size = _size;
        }

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


        drawLiftPeople(_crc2: CanvasRenderingContext2D) {
            console.log("LiftPeople", this.position, this.size);
            let snowboarder: number = 15;
            _crc2.save();
            _crc2.translate(this.position.x, this.position.y);

            for (let drawn: number = 0; drawn < snowboarder; drawn++) {
                _crc2.save()
                let x: number = 200 + (Math.random() * 250);
                let y: number = this.size.y;
                _crc2.translate(x, y);
                this.drawSnowPeople(_crc2, "blue");
                _crc2.restore();
            }
            _crc2.restore();
        }

        moveSnowboarder(_crc2: CanvasRenderingContext2D): void {
            this.size.x += 10;

            if (this.check % 2 == 0) {
                this.size.y += Math.random() * 13;
            } else {
                this.size.y -= Math.random() * 12;
            }
            if (this.size.x > 700) {
                this.size.x = -200;
            }

            this.check++;
        }

    }

}