namespace L08_Canvas_SnowboardPiste {
    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let horizon: number = crc2.canvas.height * golden;
        let posMountains: Vector = { x: 0, y: horizon };

        drawBackground();
        drawSun({ x: 100, y: 75 });
        drawCloud({ x: 400, y: 220 }, { x: 250, y: 75 });
        drawCloud({ x: 800, y: 125 }, { x: 250, y: 75 });
        drawMountains(posMountains, 200, 500, "grey", "white");
        drawMountains(posMountains, 150, 470, "grey", "lightgrey");
        drawMountains(posMountains, 100, 340, "grey", "white");
        drawMountains(posMountains, 50, 250, "grey", "lightgrey");
        drawPiste();
        generateSnowPeople({ x:0, y:200 }, { x: crc2.canvas.width, y: 200 });
        drawLiftPeople({ x: 0, y: 250 }, { x: crc2.canvas.width, y: 0 });
        drawLift();
        drawTrees();
        drawHouse();
        drawSnow({ x: 600, y: 1000 }, { x: crc2.canvas.width, y: crc2.canvas.height });
    }


    function drawSnow(_position: Vector, _size: Vector): void {
        console.log("Snow", _position, _size);

        let snowflakes: number = 2000;
        let radiusParticle: number = 4;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        
        
        for (let drawn: number = 0; drawn < snowflakes; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
    }


    function generateSnowPeople(_position: Vector, _size: Vector): void {
        let snowboarder: number = 15;
        crc2.save();
        crc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < snowboarder; drawn++) {
            crc2.save()
            let x: number =(Math.random()-0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            drawSnowPeople("orange");
            crc2.restore();
        }
        crc2.restore();
    }


    function drawSnowPeople(_color:string): void {
        console.log("SnowPeople");
        let snowboarder: Path2D = new Path2D();
        snowboarder.arc(275, 675, 5, 0, Math.PI * 2, true); // Kopf
        crc2.fillStyle=_color;
        crc2.fill(snowboarder);

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
        crc2.strokeStyle="black";
        crc2.stroke(snowboarder);
    }
    

    function drawLiftPeople(_position: Vector, _size: Vector) {
        console.log("LiftPeople", _position, _size);
        let snowboarder: number = 15;
        crc2.save();
        crc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < snowboarder; drawn++) {
            crc2.save()
            let x: number = 200 + (Math.random()*250);
            let y: number =  _size.y;
            crc2.translate(x, y);
            drawSnowPeople("blue");
            crc2.restore();
        }
        crc2.restore();
    }


    function drawTrees(): void {

        crc2.beginPath();
        crc2.rect(1045, 820, 20, 90);   //Stamm (1)
        crc2.fillStyle = "#8A4B08";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();              //Baum (1)
        crc2.moveTo(1045, 540);
        crc2.lineTo(970, 820);
        crc2.lineTo(1120, 820);
        crc2.fillStyle = "HSL(75, 70%, 30%";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.rect(1135, 800, 30, 140);   //Stamm (2)
        crc2.fillStyle = "#8A4B08";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();              //Baum (2)
        crc2.moveTo(1150, 480);
        crc2.lineTo(1015, 800);
        crc2.lineTo(1260, 800);
        crc2.fillStyle = "HSL(20, 70%, 30%";
        crc2.fill();
        crc2.closePath();
    }


    function drawPiste(): void {
        console.log("Piste");

        crc2.beginPath();
        crc2.moveTo(0, 550);
        crc2.lineTo(crc2.canvas.width, crc2.canvas.height * golden + 50);
        crc2.lineTo(crc2.canvas.width, crc2.canvas.height);
        crc2.lineTo(0, crc2.canvas.height);
        crc2.fillStyle = "white";
        crc2.fill();

        crc2.beginPath();              //Dreieck
        crc2.moveTo(crc2.canvas.width, crc2.canvas.height * golden + 250);
        crc2.lineTo(crc2.canvas.width, crc2.canvas.height);
        crc2.lineTo(200, crc2.canvas.height);
        crc2.fillStyle = "HSL(60, 50%, 30%";
        crc2.fill();
       
    }


    function drawLift(): void {
        console.log("Lift");

        crc2.beginPath();            // Liftbahn außen
        crc2.moveTo(0, 450);
        crc2.lineTo(900, 650);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 5;
        crc2.stroke();
        crc2.save();

        crc2.beginPath();
        crc2.moveTo(650, 595);    // Sesselaufhänger (1 - fährt hin)
        crc2.lineTo(650, 625);
        crc2.lineWidth = 3;
        crc2.stroke();

        crc2.beginPath();
        crc2.moveTo(630, 665);    // Sitzfläche Skilift (1 - fährt hin)
        crc2.lineTo(603, 655);
        crc2.lineTo(650, 630);
        crc2.lineWidth = 2;
        crc2.fillStyle = "#86B404";
        crc2.fill();
        crc2.stroke();

        crc2.beginPath();
        crc2.moveTo(630, 635);   //Lehne Skilift (1 - fährt hin)
        crc2.lineTo(680, 605);
        crc2.lineTo(680, 635);
        crc2.lineTo(630, 665);
        crc2.fillStyle = "#8A084B";
        crc2.fill();
        crc2.closePath();
        crc2.stroke();

        crc2.beginPath();
        crc2.arc(637, 623, 6, 0, 2 * Math.PI);    // Person Helm pink
        crc2.lineWidth = 1;
        crc2.fillStyle = "pink";
        crc2.fill();
        crc2.stroke();

        crc2.beginPath();
        crc2.arc(662, 609, 6, 0, 2 * Math.PI);    // Person Helm lila
        crc2.lineWidth = 1;
        crc2.fillStyle = "#C900F2";
        crc2.fill();
        crc2.stroke();


        crc2.beginPath();
        crc2.moveTo(350, 530);    // Sesselaufhänger (2 - fährt hin)
        crc2.lineTo(350, 560);
        crc2.lineWidth = 3;
        crc2.stroke();

        crc2.beginPath();
        crc2.moveTo(330, 600);    // Sitzfläche Skilift (2 - fährt hin)
        crc2.lineTo(303, 590);
        crc2.lineTo(350, 566);
        crc2.lineWidth = 2;
        crc2.fillStyle = "#86B404";
        crc2.fill();
        crc2.stroke();

        crc2.beginPath();
        crc2.moveTo(330, 570);   //Lehne Skilift (2 - fährt hin)
        crc2.lineTo(380, 540);
        crc2.lineTo(380, 570);
        crc2.lineTo(330, 600);
        crc2.fillStyle = "#8A084B";
        crc2.fill();
        crc2.closePath();
        crc2.stroke();

        crc2.beginPath();
        crc2.arc(335, 559, 6, 0, 2 * Math.PI);    // Person Helm blau
        crc2.lineWidth = 1;
        crc2.fillStyle = "#385AAB";
        crc2.fill();
        crc2.stroke();

        crc2.beginPath();
        crc2.arc(360, 545, 6, 0, 2 * Math.PI);    // Person Helm türkis
        crc2.lineWidth = 1;
        crc2.fillStyle = "#19CBD8";
        crc2.fill();
        crc2.stroke();

        crc2.beginPath();
        crc2.moveTo(490, 640);    // Sesselaufhänger (3 - fährt zurück)
        crc2.lineTo(490, 670);
        crc2.lineWidth = 3;
        crc2.stroke();

        crc2.beginPath();
        crc2.moveTo(470, 700);    // Sitzfläche Skilift (3 - fährt zurück)
        crc2.lineTo(497, 710);
        crc2.lineTo(544, 680);
        crc2.lineTo(520, 670);
        crc2.lineWidth = 2;
        crc2.fillStyle = "#86B404";
        crc2.fill();
        crc2.stroke();

        crc2.beginPath();
        crc2.moveTo(470, 670);   //Lehne Skilift (3 - fährt zurück)
        crc2.lineTo(520, 640);
        crc2.lineTo(520, 670);
        crc2.lineTo(470, 700);
        crc2.fillStyle = "#8A084B";
        crc2.fill();
        crc2.closePath();
        crc2.stroke();

        crc2.beginPath();
        crc2.moveTo(0, 490);       // Liftbahn innen
        crc2.lineTo(850, 750);
        crc2.lineWidth = 5;
        crc2.stroke();
        crc2.save();
    }


    function drawHouse(): void {
        console.log("House");

        crc2.beginPath();
        crc2.rect(750, 730, 300, 300);    //Haus
        crc2.fillStyle = "#61210B";
        crc2.fill();

        crc2.beginPath();              //Dach
        crc2.moveTo(750, 730);
        crc2.lineTo(1050, 730);
        crc2.lineTo(900, 610);
        crc2.closePath();
        crc2.lineWidth = 5;
        crc2.strokeStyle = "black";
        crc2.stroke();
        crc2.fillStyle = "#BD1E1E";
        crc2.fill();

        crc2.beginPath();      // Holzlatten
        crc2.lineWidth = 2;
        crc2.moveTo(1015, 1000);
        crc2.lineTo(1015, 730);
        crc2.moveTo(980, 1000);
        crc2.lineTo(980, 730);
        crc2.moveTo(945, 1000);
        crc2.lineTo(945, 730);
        crc2.moveTo(910, 1000);
        crc2.lineTo(910, 730);
        crc2.moveTo(875, 1000);
        crc2.lineTo(875, 730);
        crc2.moveTo(840, 1000);
        crc2.lineTo(840, 730);
        crc2.moveTo(805, 1000);
        crc2.lineTo(805, 730);
        crc2.moveTo(770, 1000);
        crc2.lineTo(770, 730);
        crc2.stroke();

        crc2.beginPath();
        crc2.rect(785, 760, 230, 90);  // Schild
        crc2.fillStyle = "#F3F781";
        crc2.fill();

        crc2.font = "20px Comic Sans MS";     // Schrift Schild
        crc2.fillStyle = "black";
        crc2.textAlign = "center";
        crc2.fillText("Welcome!", 900, 790);
        crc2.fillText("Costs: 60€ / day", 900, 815);
        crc2.fillText("Have fun!", 900, 840);

        crc2.beginPath();
        crc2.rect(850, 890, 90, 130);  // Tür
        crc2.fillStyle = "#320F0F";
        crc2.fill();
        crc2.strokeStyle = "#000000";  // Rahmenfarbe schwarz
        crc2.lineWidth = 2; // Rahmendicke
        crc2.stroke();
    }


    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "blue");
        gradient.addColorStop(.2, "lightblue");
        gradient.addColorStop(.4, "white");
        gradient.addColorStop(1, "white");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }


    function drawSun(_position: Vector): void {
        console.log("Sun", _position);

        let r1: number = 50;
        let r2: number = 130;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }


    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);

        let nParticles: number = 20;
        let radiusParticle: number = 40;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }


    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        console.log("Mountains", _position, _min, _max);
        let stepMin: number = 100;
        let stepMax: number = 200;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(.6, "grey");
        gradient.addColorStop(1, "white");
        // gradient.addColorStop(1, "green");

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

}