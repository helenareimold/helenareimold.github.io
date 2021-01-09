var L10_Snowboardpiste_No3;
(function (L10_Snowboardpiste_No3) {
    class Snowboarder extends L10_Snowboardpiste_No3.Moveable {
        constructor() {
            super(...arguments);
            this.check = 0;
        }
        generateSnowPeople(_crc2) {
            _crc2.save();
            _crc2.translate(this.position.x, this.position.y);
            _crc2.save();
            let x = this.size.x;
            let y = -this.size.y;
            _crc2.translate(x, y);
            this.drawSnowPeople(_crc2, "orange");
            _crc2.restore();
            _crc2.restore();
        }
        drawSnowPeople(_crc2, _color) {
            console.log("SnowPeople");
            let snowboarder = new Path2D();
            snowboarder.arc(275, 675, 5, 0, Math.PI * 2, true); // Kopf
            _crc2.fillStyle = _color;
            _crc2.fill(snowboarder);
            snowboarder.moveTo(275, 680); // Rumpf
            snowboarder.lineTo(275, 690);
            snowboarder.closePath();
            snowboarder.moveTo(275, 690); // Bein links
            snowboarder.lineTo(270, 695);
            snowboarder.moveTo(275, 690); // Bein rechts
            snowboarder.lineTo(280, 695);
            snowboarder.moveTo(270, 684); // Arme
            snowboarder.lineTo(280, 685);
            snowboarder.moveTo(265, 696); // Snowboard
            snowboarder.lineTo(285, 696);
            _crc2.strokeStyle = "black";
            _crc2.stroke(snowboarder);
        }
        drawLiftPeople(_crc2) {
            console.log("LiftPeople", this.position, this.size);
            let snowboarder = 15;
            _crc2.save();
            _crc2.translate(this.position.x, this.position.y);
            for (let drawn = 0; drawn < snowboarder; drawn++) {
                _crc2.save();
                let x = 200 + (Math.random() * 250);
                let y = this.size.y;
                _crc2.translate(x, y);
                this.drawSnowPeople(_crc2, "blue");
                _crc2.restore();
            }
            _crc2.restore();
        }
    }
    L10_Snowboardpiste_No3.Snowboarder = Snowboarder;
})(L10_Snowboardpiste_No3 || (L10_Snowboardpiste_No3 = {}));
//# sourceMappingURL=snowboarder.js.map