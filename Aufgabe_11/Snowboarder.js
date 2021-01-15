var L11_Snowboardpiste_No4;
(function (L11_Snowboardpiste_No4) {
    class Snowboarder extends L11_Snowboardpiste_No4.Moveable {
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
    }
    L11_Snowboardpiste_No4.Snowboarder = Snowboarder;
})(L11_Snowboardpiste_No4 || (L11_Snowboardpiste_No4 = {}));
//# sourceMappingURL=Snowboarder.js.map