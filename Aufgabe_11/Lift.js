var L11_Snowboardpiste_No4;
(function (L11_Snowboardpiste_No4) {
    class Lift extends L11_Snowboardpiste_No4.Moveable {
        drawLift(_crc2) {
            this.drawRopeOne(_crc2);
            this.drawLiftForward(_crc2);
            this.drawLiftBackwards(_crc2);
            this.drawRopeTwo(_crc2);
        }
        drawRopeOne(_crc2) {
            console.log("Lift");
            _crc2.beginPath(); // Liftbahn außen
            _crc2.moveTo(0, 450);
            _crc2.lineTo(900, 650);
            _crc2.strokeStyle = "black";
            _crc2.lineWidth = 5;
            _crc2.stroke();
            _crc2.save();
        }
        drawRopeTwo(_crc2) {
            _crc2.beginPath();
            _crc2.moveTo(0, 490); // Liftbahn innen
            _crc2.lineTo(850, 750);
            _crc2.lineWidth = 5;
            _crc2.stroke();
            _crc2.save();
        }
        drawLiftForward(_crc2) {
            let x = this.position.x;
            let y = -this.position.y;
            _crc2.save();
            _crc2.translate(x, y);
            _crc2.beginPath();
            _crc2.moveTo(650, 595); // Sesselaufhänger (1 - fährt hin)
            _crc2.lineTo(650, 625);
            _crc2.lineWidth = 3;
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.moveTo(630, 665); // Sitzfläche Skilift (1 - fährt hin)
            _crc2.lineTo(603, 655);
            _crc2.lineTo(650, 630);
            _crc2.lineWidth = 2;
            _crc2.fillStyle = "#86B404";
            _crc2.fill();
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.moveTo(630, 635); //Lehne Skilift (1 - fährt hin)
            _crc2.lineTo(680, 605);
            _crc2.lineTo(680, 635);
            _crc2.lineTo(630, 665);
            _crc2.fillStyle = "#8A084B";
            _crc2.fill();
            _crc2.closePath();
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.arc(637, 623, 6, 0, 2 * Math.PI); // Person Helm pink
            _crc2.lineWidth = 1;
            _crc2.fillStyle = "orange";
            _crc2.fill();
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.arc(662, 609, 6, 0, 2 * Math.PI); // Person Helm lila
            _crc2.lineWidth = 1;
            _crc2.fillStyle = "orange";
            _crc2.fill();
            _crc2.stroke();
            _crc2.restore();
        }
        drawLiftBackwards(_crc2) {
            let x = this.size.x;
            let y = -this.size.y;
            _crc2.save();
            _crc2.translate(x, y);
            _crc2.beginPath();
            _crc2.moveTo(490, 640); // Sesselaufhänger (3 - fährt zurück)
            _crc2.lineTo(490, 670);
            _crc2.lineWidth = 3;
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.moveTo(470, 700); // Sitzfläche Skilift (3 - fährt zurück)
            _crc2.lineTo(497, 710);
            _crc2.lineTo(544, 680);
            _crc2.lineTo(520, 670);
            _crc2.lineWidth = 2;
            _crc2.fillStyle = "#86B404";
            _crc2.fill();
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.moveTo(470, 670); //Lehne Skilift (3 - fährt zurück)
            _crc2.lineTo(520, 640);
            _crc2.lineTo(520, 670);
            _crc2.lineTo(470, 700);
            _crc2.fillStyle = "#8A084B";
            _crc2.fill();
            _crc2.closePath();
            _crc2.stroke();
            _crc2.restore();
        }
    }
    L11_Snowboardpiste_No4.Lift = Lift;
})(L11_Snowboardpiste_No4 || (L11_Snowboardpiste_No4 = {}));
//# sourceMappingURL=Lift.js.map