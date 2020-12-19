namespace L09_Snowboardpiste_No2 {

    export class House {

        drawHouse(_crc2: CanvasRenderingContext2D): void {
            console.log("House");

            _crc2.beginPath();
            _crc2.rect(750, 730, 300, 300);    //Haus
            _crc2.fillStyle = "#61210B";
            _crc2.fill();

            _crc2.beginPath();              //Dach
            _crc2.moveTo(750, 730);
            _crc2.lineTo(1050, 730);
            _crc2.lineTo(900, 610);
            _crc2.closePath();
            _crc2.lineWidth = 5;
            _crc2.strokeStyle = "black";
            _crc2.stroke();
            _crc2.fillStyle = "#BD1E1E";
            _crc2.fill();

            _crc2.beginPath();      // Holzlatten
            _crc2.lineWidth = 2;
            _crc2.moveTo(1015, 1000);
            _crc2.lineTo(1015, 730);
            _crc2.moveTo(980, 1000);
            _crc2.lineTo(980, 730);
            _crc2.moveTo(945, 1000);
            _crc2.lineTo(945, 730);
            _crc2.moveTo(910, 1000);
            _crc2.lineTo(910, 730);
            _crc2.moveTo(875, 1000);
            _crc2.lineTo(875, 730);
            _crc2.moveTo(840, 1000);
            _crc2.lineTo(840, 730);
            _crc2.moveTo(805, 1000);
            _crc2.lineTo(805, 730);
            _crc2.moveTo(770, 1000);
            _crc2.lineTo(770, 730);
            _crc2.stroke();

            _crc2.beginPath();
            _crc2.rect(785, 760, 230, 90);  // Schild
            _crc2.fillStyle = "#F3F781";
            _crc2.fill();

            _crc2.font = "20px Comic Sans MS";     // Schrift Schild
            _crc2.fillStyle = "black";
            _crc2.textAlign = "center";
            _crc2.fillText("Welcome!", 900, 790);
            _crc2.fillText("Costs: 60€ / day", 900, 815);
            _crc2.fillText("Have fun!", 900, 840);

            _crc2.beginPath();
            _crc2.rect(850, 890, 90, 130);  // Tür
            _crc2.fillStyle = "#320F0F";
            _crc2.fill();
            _crc2.strokeStyle = "#000000";  // Rahmenfarbe schwarz
            _crc2.lineWidth = 2; // Rahmendicke
            _crc2.stroke();
        }

    }

}
