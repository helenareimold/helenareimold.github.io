let canvas = document.querySelector("canvas");
let crc2 = canvas.getContext("2d");
crc2.fillStyle = "#FF0000";
//crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
// crc2.strokeStyle = "#ff0000";
// crc2.beginPath();
// crc2.arc(100, 100, 20, 0, 1.5 * Math.PI);
// crc2.closePath();
// crc2.stroke();
// crc2.beginPath();
// crc2.ellipse(100, 100, 50, 20, 0, 0, 1.5 * Math.PI );
// crc2.closePath();
// crc2.stroke();
// crc2.beginPath();              //Dreieck
// crc2.moveTo(75, 50);
// crc2.lineTo(100, 75);
// crc2.lineTo(100, 25);
// crc2.closePath();
// crc2.stroke();
// let path: Path2D = new Path2D();
// path.arc(60, 60, 50, 0, 2 * Math.PI); // Kreis
// crc2.beginPath();                       // Kreis + Dreieck
// crc2.moveTo(75, 50);
// crc2.lineTo(100, 75);
// crc2.lineTo(100, 25);
// crc2.closePath();
// crc2.stroke();
// crc2.stroke(path);
// crc2.beginPath();      
// crc2.moveTo(2.1, 1);     // Linien gerade + Treppen
// crc2.lineTo(2.1, 10);
// crc2.moveTo(4.5, 1);
// crc2.lineTo(4.5, 10);
// crc2.moveTo(7.5, 1);
// crc2.lineTo(10.5, 10);
// crc2.stroke();
// let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 100);
// gradient.addColorStop(0, "black");          // scharfe Kanten
// gradient.addColorStop(0.3, "black");
// gradient.addColorStop(.3, "red");
// gradient.addColorStop(.7, "red");
// gradient.addColorStop(.7, "gold");
// gradient.addColorStop(1, "gold");
// crc2.fillStyle = gradient;
// crc2.fillRect(0, 0, 200, 100);
let pattern = document.createElement('canvas').getContext('2d');
pattern.canvas.width = 40;
pattern.canvas.height = 20;
pattern.strokeStyle = "#ff0000";
pattern.fillStyle = '#fec';
pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
pattern.moveTo(0, 10);
pattern.lineTo(10, 10);
pattern.lineTo(20, 0);
pattern.lineTo(30, 0);
pattern.lineTo(40, 10);
pattern.lineTo(30, 20);
pattern.lineTo(20, 20);
pattern.lineTo(10, 10);
pattern.stroke();
crc2.fillStyle = crc2.createPattern(pattern.canvas, 'repeat');
crc2.fillRect(0, 0, canvas.width, canvas.height);
//# sourceMappingURL=test.js.map