import { useEffect, useRef } from "react";

const ShapesBackground = ({ themeIndex = 0, shapeCount = 50 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // 🔥 prevent null errors
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Color themes
    const colorThemes = [
      ["#1a2a6c", "#b21f1f", "#fdbb2d"],
      ["#833ab4", "#fd1d1d", "#fcb045"],
      ["#00c6ff", "#0072ff", "#005bea"],
      ["#f46b45", "#eea849", "#f46b45"],
      ["#56ab2f", "#a8e063"],
    ];

    class Shape {
      constructor() {
        this.size = Math.random() * 30 + 10;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.type = Math.floor(Math.random() * 3);
        this.color = this.getRandomColorFromTheme();
      }

      getRandomColorFromTheme() {
        const theme = colorThemes[themeIndex % colorThemes.length];
        return theme[Math.floor(Math.random() * theme.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = this.color;

        switch (this.type) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 1: // Square
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            break;
          case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
            break;
          default:
            break;
        }

        ctx.restore();
      }
    }

    let shapes = Array.from({ length: shapeCount }, () => new Shape());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach((shape) => {
        shape.update();
        shape.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();

    console.log("Shapes drawing:", shapes.length);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [themeIndex, shapeCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ShapesBackground;
