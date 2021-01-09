namespace L10_Snowboardpiste_No3 {

    export class Moveable {

        position: Vector;
        size: Vector;
        particle: Path2D;
        check: number = 0;


        constructor(_position: Vector, _size: Vector) {
            this.position = _position;
            this.size = _size;
            this.particle = new Path2D();

        }

        move(_crc2: CanvasRenderingContext2D): void {
            if (this.position.x == -200) {               // Snowboarder Position Start
                this.size.x += 10;

                if (this.check % 2 == 0) {                   // Zahl gerade = Snowboarder up
                    this.size.y += Math.random() * 13;
                } else {
                    this.size.y -= Math.random() * 12;      // Zahl ungerade = Snowboarder down
                }
                if (this.size.x > 700) {                     // Snowboarder bestimmte Position erreicht (Höhe Haus) = startet wieder von links
                    this.size.x = -200;
                }
    
                this.check++;
            }
            else {
                this.size.y -= 2;                       // Schnee Position Start

                if (this.size.y < -_crc2.canvas.height)       
                    this.size.y = 0;
            }
        }

    }


}


