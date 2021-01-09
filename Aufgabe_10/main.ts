namespace L10_Snowboardpiste_No3 {

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let snowflakes: Snow[] = [];
    let mSnowboarder: Snowboarder[] = [];
    let cloudOne: Cloud[] = [];
    let cloudTwo: Cloud[] = [];

    let background: Background;
    let house: House;
    let lift: Lift;
    let mountain: Mountain;
    let snowboarder: Snowboarder;
    let piste: Piste;
    let sun: Sun;
    let tree: Tree;
    let golden: number;
    let imageData: ImageData;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        background = new Background();
        house = new House();
        lift = new Lift();
        mountain = new Mountain();
        snowboarder = new Snowboarder(new Vector(0, 250), new Vector(crc2.canvas.width, 0))
        piste = new Piste();
        sun = new Sun();
        tree = new Tree();
        golden = 0.62;

        createCanvas();
        imageData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        createClouds(20);
        createSnowboarder(10);
        createSnowflakes(800);
        window.setInterval(update, 100);
    }


    function createSnowflakes(nFlakes: number) {
        for (let i: number = 0; i < nFlakes; i++) {
            let x = (Math.random() - 0.5) * crc2.canvas.width;
            let y = - (Math.random() * crc2.canvas.height);
            let snowflake: Snow = new Snow(new Vector(x, y), new Vector(600, 0));
            snowflakes.push(snowflake);
        }
    }


    function createSnowboarder(nSnowboarder: number): void {
        for (let i: number = 0; i < nSnowboarder; i++) {
            let x: number = (Math.random() - 0.5) * 700;
            let y: number = - (Math.random() * 200);
            let snowboarder: Snowboarder = new Snowboarder(new Vector(-200, 0), new Vector(x, y));
            mSnowboarder.push(snowboarder);
        }
    }


    function createClouds(nCLouds: number): void {
        for (let i: number = 0; i < nCLouds; i++) {
            let x: number = (Math.random() - 0.5) * 250;
            let y: number = - (Math.random() * 75);
            let cloud: Cloud = new Cloud(new Vector(400, 220), new Vector(x, y));
            cloudOne.push(cloud);
        }
        for (let i: number = 0; i < nCLouds; i++) {
            let x: number = (Math.random() - 0.5) * 250;
            let y: number = - (Math.random() * 75);
            let cloud: Cloud = new Cloud(new Vector(800, 125), new Vector(x, y));
            cloudTwo.push(cloud);
        }
    }


    function createCanvas(): void {
        background.drawBackground(crc2);
        sun.drawSun(crc2, new Vector(100, 75));
        mountain.drawMountain(crc2);
        piste.drawPiste(crc2, golden);
        lift.drawLift(crc2);
        tree.drawTrees(crc2);
        house.drawHouse(crc2);
    }

    function update(): void {

        crc2.putImageData(imageData, 0, 0);
        moveObjects();
        drawObjects();
    }


    function moveObjects(): void {
        for (let snow of snowflakes) {
            snow.move(crc2);
        }
        for (let boarder of mSnowboarder) {
            boarder.move(crc2);
        }
    }


    function drawObjects(): void {

        snowboarder.drawLiftPeople(crc2);

        for (let cloud of cloudOne) {
            cloud.drawCloud(crc2)
        }
        for (let cloud of cloudTwo) {
            cloud.drawCloud(crc2);
        }
        for (let boarder of mSnowboarder) {
            boarder.generateSnowPeople(crc2);
        }
        for (let snow of snowflakes) {
            snow.drawSnow(crc2);
        }
    }
}














