var L11_Snowboardpiste_No4;
(function (L11_Snowboardpiste_No4) {
    class Moveable {
        constructor(_position, _size, _name) {
            this.check = 0;
            this.isEnd = false;
            this.position = _position;
            this.size = _size;
            this.particle = new Path2D();
            this.name = _name;
        }
        move(_crc2) {
            if (this.name == "snowboarder") {
                this.size.x += 5;
                if (this.isEnd == false) {
                    if (this.check % 2) {
                        this.size.y -= Math.random() * 25;
                    }
                    else {
                        this.size.y += Math.random() * 10;
                    }
                    if (this.size.x > 330) {
                        this.size.y = -260;
                        this.isEnd = true;
                    }
                }
                if (this.size.x > 700) {
                    this.isEnd = false;
                    this.size.x = 0;
                    this.size.y = 0;
                }
                this.check++;
            }
            else if (this.name == "snow") {
                this.size.y -= 2;
                if (this.size.y < -_crc2.canvas.height)
                    this.size.y = 0;
            }
            else {
                this.position.x -= 5;
                this.position.y += 1.1;
                if (this.size.x == 270) {
                    if (this.position.x == -600) {
                        this.size.x = -550;
                        this.size.y = 165;
                    }
                }
                else if (this.position.x == -620) {
                    this.position.x = 200;
                    this.position.y = -44;
                }
                else {
                    this.size.x += 5;
                    this.size.y -= 1.5;
                }
            }
        }
    }
    L11_Snowboardpiste_No4.Moveable = Moveable;
})(L11_Snowboardpiste_No4 || (L11_Snowboardpiste_No4 = {}));
//# sourceMappingURL=Moveable.js.map