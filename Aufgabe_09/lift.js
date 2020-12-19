var L09_Snowboardpiste_No2;
(function (L09_Snowboardpiste_No2) {
    class Lift {
        drawLift(_crc2) {
            console.log("Lift");
            _crc2.beginPath(); // Liftbahn außen
            _crc2.moveTo(0, 450);
            _crc2.lineTo(900, 650);
            _crc2.strokeStyle = "black";
            _crc2.lineWidth = 5;
            _crc2.stroke();
            _crc2.save();
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
            _crc2.fillStyle = "pink";
            _crc2.fill();
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.arc(662, 609, 6, 0, 2 * Math.PI); // Person Helm lila
            _crc2.lineWidth = 1;
            _crc2.fillStyle = "#C900F2";
            _crc2.fill();
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.moveTo(350, 530); // Sesselaufhänger (2 - fährt hin)
            _crc2.lineTo(350, 560);
            _crc2.lineWidth = 3;
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.moveTo(330, 600); // Sitzfläche Skilift (2 - fährt hin)
            _crc2.lineTo(303, 590);
            _crc2.lineTo(350, 566);
            _crc2.lineWidth = 2;
            _crc2.fillStyle = "#86B404";
            _crc2.fill();
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.moveTo(330, 570); //Lehne Skilift (2 - fährt hin)
            _crc2.lineTo(380, 540);
            _crc2.lineTo(380, 570);
            _crc2.lineTo(330, 600);
            _crc2.fillStyle = "#8A084B";
            _crc2.fill();
            _crc2.closePath();
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.arc(335, 559, 6, 0, 2 * Math.PI); // Person Helm blau
            _crc2.lineWidth = 1;
            _crc2.fillStyle = "#385AAB";
            _crc2.fill();
            _crc2.stroke();
            _crc2.beginPath();
            _crc2.arc(360, 545, 6, 0, 2 * Math.PI); // Person Helm türkis
            _crc2.lineWidth = 1;
            _crc2.fillStyle = "#19CBD8";
            _crc2.fill();
            _crc2.stroke();
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
            _crc2.beginPath();
            _crc2.moveTo(0, 490); // Liftbahn innen
            _crc2.lineTo(850, 750);
            _crc2.lineWidth = 5;
            _crc2.stroke();
            _crc2.save();
        }
    }
    L09_Snowboardpiste_No2.Lift = Lift;
})(L09_Snowboardpiste_No2 || (L09_Snowboardpiste_No2 = {}));
//# sourceMappingURL=lift.js.map