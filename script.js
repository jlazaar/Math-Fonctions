// Classe pour gérer le rendu des graphiques
class GraphRenderer {
    constructor(canvasId, width = 600, height = 400) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;

        // Configuration des axes
        this.xMin = -10;
        this.xMax = 10;
        this.yMin = -10;
        this.yMax = 10;
        this.gridSize = 1;
    }

    // Conversion des coordonnées mathématiques en coordonnées canvas
    mathToCanvas(x, y) {
        const canvasX = ((x - this.xMin) / (this.xMax - this.xMin)) * this.width;
        const canvasY = this.height - ((y - this.yMin) / (this.yMax - this.yMin)) * this.height;
        return { x: canvasX, y: canvasY };
    }

    // Effacer le canvas
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    // Dessiner la grille et les axes
    drawGrid() {
        this.ctx.strokeStyle = '#e5e7eb';
        this.ctx.lineWidth = 0.5;

        // Lignes verticales
        for (let x = Math.ceil(this.xMin); x <= this.xMax; x += this.gridSize) {
            const pos = this.mathToCanvas(x, 0);
            this.ctx.beginPath();
            this.ctx.moveTo(pos.x, 0);
            this.ctx.lineTo(pos.x, this.height);
            this.ctx.stroke();
        }

        // Lignes horizontales
        for (let y = Math.ceil(this.yMin); y <= this.yMax; y += this.gridSize) {
            const pos = this.mathToCanvas(0, y);
            this.ctx.beginPath();
            this.ctx.moveTo(0, pos.y);
            this.ctx.lineTo(this.width, pos.y);
            this.ctx.stroke();
        }
    }

    // Dessiner les axes
    drawAxes() {
        this.ctx.strokeStyle = '#374151';
        this.ctx.lineWidth = 2;

        // Axe X
        const yAxisPos = this.mathToCanvas(0, 0);
        this.ctx.beginPath();
        this.ctx.moveTo(0, yAxisPos.y);
        this.ctx.lineTo(this.width, yAxisPos.y);
        this.ctx.stroke();

        // Axe Y
        const xAxisPos = this.mathToCanvas(0, 0);
        this.ctx.beginPath();
        this.ctx.moveTo(xAxisPos.x, 0);
        this.ctx.lineTo(xAxisPos.x, this.height);
        this.ctx.stroke();

        // Labels des axes
        this.ctx.fillStyle = '#374151';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';

        // Labels X
        for (let x = Math.ceil(this.xMin); x <= this.xMax; x += 2) {
            if (x === 0) continue;
            const pos = this.mathToCanvas(x, 0);
            this.ctx.fillText(x.toString(), pos.x, pos.y + 15);
        }

        // Labels Y
        this.ctx.textAlign = 'right';
        for (let y = Math.ceil(this.yMin); y <= this.yMax; y += 2) {
            if (y === 0) continue;
            const pos = this.mathToCanvas(0, y);
            this.ctx.fillText(y.toString(), pos.x - 5, pos.y + 4);
        }

        // Labels des axes
        this.ctx.fillStyle = '#2563eb';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('x', this.width - 20, yAxisPos.y - 10);
        this.ctx.fillText('y', xAxisPos.x + 15, 15);
    }

    // Dessiner une fonction
    drawFunction(func, color = '#7c3aed', lineWidth = 3) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();

        let started = false;
        const step = (this.xMax - this.xMin) / this.width;

        for (let x = this.xMin; x <= this.xMax; x += step) {
            try {
                const y = func(x);

                // Vérifier si y est valide
                if (isNaN(y) || !isFinite(y)) continue;

                // Limiter y pour éviter les valeurs extrêmes
                if (y < this.yMin - 100 || y > this.yMax + 100) continue;

                const pos = this.mathToCanvas(x, y);

                if (!started) {
                    this.ctx.moveTo(pos.x, pos.y);
                    started = true;
                } else {
                    this.ctx.lineTo(pos.x, pos.y);
                }
            } catch (e) {
                // Ignorer les erreurs de calcul
                started = false;
            }
        }

        this.ctx.stroke();
    }

    // Dessiner un point
    drawPoint(x, y, color = '#ef4444', radius = 5) {
        const pos = this.mathToCanvas(x, y);
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    // Rendu complet
    render(func, options = {}) {
        this.clear();
        this.drawGrid();
        this.drawAxes();
        this.drawFunction(func, options.color, options.lineWidth);

        // Dessiner des points spéciaux si fournis
        if (options.points) {
            options.points.forEach(point => {
                this.drawPoint(point.x, point.y, point.color);
            });
        }
    }
}

// ========== FONCTIONS LINÉAIRES ==========
const linearGraph = new GraphRenderer('linear-graph');
let linearParams = { a: 1, b: 0 };

function updateLinear() {
    const a = linearParams.a;
    const b = linearParams.b;

    // Mettre à jour l'affichage de l'équation
    let equationText = '';
    if (a === 0) {
        equationText = `${b}`;
    } else {
        equationText = a === 1 ? 'x' : a === -1 ? '-x' : `${a}x`;
        if (b > 0) equationText += ` + ${b}`;
        else if (b < 0) equationText += ` - ${Math.abs(b)}`;
    }
    document.getElementById('linear-eq').textContent = equationText;

    // Dessiner la fonction
    const func = (x) => a * x + b;
    linearGraph.render(func, {
        color: '#7c3aed',
        lineWidth: 3,
        points: [
            { x: 0, y: b, color: '#ef4444' } // Point d'intersection avec l'axe Y
        ]
    });
}

// Event listeners pour les sliders linéaires
document.getElementById('linear-a').addEventListener('input', (e) => {
    linearParams.a = parseFloat(e.target.value);
    document.getElementById('linear-a-value').textContent = linearParams.a.toFixed(1);
    updateLinear();
});

document.getElementById('linear-b').addEventListener('input', (e) => {
    linearParams.b = parseFloat(e.target.value);
    document.getElementById('linear-b-value').textContent = linearParams.b.toFixed(1);
    updateLinear();
});

// ========== FONCTIONS QUADRATIQUES ==========
const quadGraph = new GraphRenderer('quad-graph');
let quadParams = { a: 1, h: 0, k: 0 };

function updateQuadratic() {
    const { a, h, k } = quadParams;

    // Mettre à jour l'affichage de l'équation
    let equationText = `${a === 1 ? '' : a === -1 ? '-' : a}(x${h === 0 ? '' : h > 0 ? ` - ${h}` : ` + ${Math.abs(h)}`})²`;
    if (k > 0) equationText += ` + ${k}`;
    else if (k < 0) equationText += ` - ${Math.abs(k)}`;
    document.getElementById('quad-eq').textContent = equationText;

    // Mettre à jour le sommet
    document.getElementById('quad-vertex').textContent = `${h}, ${k}`;

    // Dessiner la fonction
    const func = (x) => a * Math.pow(x - h, 2) + k;
    quadGraph.render(func, {
        color: '#7c3aed',
        lineWidth: 3,
        points: [
            { x: h, y: k, color: '#ef4444' } // Sommet
        ]
    });
}

// Event listeners pour les sliders quadratiques
document.getElementById('quad-a').addEventListener('input', (e) => {
    quadParams.a = parseFloat(e.target.value);
    document.getElementById('quad-a-value').textContent = quadParams.a.toFixed(1);
    updateQuadratic();
});

document.getElementById('quad-h').addEventListener('input', (e) => {
    quadParams.h = parseFloat(e.target.value);
    document.getElementById('quad-h-value').textContent = quadParams.h.toFixed(1);
    updateQuadratic();
});

document.getElementById('quad-k').addEventListener('input', (e) => {
    quadParams.k = parseFloat(e.target.value);
    document.getElementById('quad-k-value').textContent = quadParams.k.toFixed(1);
    updateQuadratic();
});

// ========== FONCTIONS EXPONENTIELLES ==========
const expGraph = new GraphRenderer('exp-graph');
let expParams = { a: 1, b: 2, h: 0, k: 0 };

function updateExponential() {
    const { a, b, h, k } = expParams;

    // Mettre à jour l'affichage de l'équation
    let equationText = `${a === 1 ? '' : a === -1 ? '-' : a + ' · '}${b.toFixed(1)}^(x${h === 0 ? '' : h > 0 ? ` - ${h}` : ` + ${Math.abs(h)}`})`;
    if (k > 0) equationText += ` + ${k}`;
    else if (k < 0) equationText += ` - ${Math.abs(k)}`;
    document.getElementById('exp-eq').textContent = equationText;

    // Dessiner la fonction
    const func = (x) => a * Math.pow(b, x - h) + k;
    expGraph.render(func, {
        color: '#7c3aed',
        lineWidth: 3,
        points: []
    });
}

// Event listeners pour les sliders exponentiels
document.getElementById('exp-a').addEventListener('input', (e) => {
    expParams.a = parseFloat(e.target.value);
    document.getElementById('exp-a-value').textContent = expParams.a.toFixed(1);
    updateExponential();
});

document.getElementById('exp-b').addEventListener('input', (e) => {
    expParams.b = parseFloat(e.target.value);
    document.getElementById('exp-b-value').textContent = expParams.b.toFixed(1);
    updateExponential();
});

document.getElementById('exp-h').addEventListener('input', (e) => {
    expParams.h = parseFloat(e.target.value);
    document.getElementById('exp-h-value').textContent = expParams.h.toFixed(1);
    updateExponential();
});

document.getElementById('exp-k').addEventListener('input', (e) => {
    expParams.k = parseFloat(e.target.value);
    document.getElementById('exp-k-value').textContent = expParams.k.toFixed(1);
    updateExponential();
});

// ========== FONCTIONS TRIGONOMÉTRIQUES ==========
const trigGraph = new GraphRenderer('trig-graph');
trigGraph.xMin = -2 * Math.PI;
trigGraph.xMax = 2 * Math.PI;
let trigParams = { a: 1, b: 1, h: 0, k: 0 };

function updateTrigonometric() {
    const { a, b, h, k } = trigParams;

    // Mettre à jour l'affichage de l'équation
    let equationText = `${a === 1 ? '' : a === -1 ? '-' : a + ' · '}sin(${b === 1 ? '' : b}(x${h === 0 ? '' : h > 0 ? ` - ${h.toFixed(2)}` : ` + ${Math.abs(h).toFixed(2)}`}))`;
    if (k > 0) equationText += ` + ${k}`;
    else if (k < 0) equationText += ` - ${Math.abs(k)}`;
    document.getElementById('trig-eq').textContent = equationText;

    // Mettre à jour la période
    const period = (2 * Math.PI) / Math.abs(b);
    document.getElementById('trig-period').textContent = `${period.toFixed(2)} (${(period / Math.PI).toFixed(2)}π)`;

    // Dessiner la fonction
    const func = (x) => a * Math.sin(b * (x - h)) + k;
    trigGraph.render(func, {
        color: '#7c3aed',
        lineWidth: 3,
        points: []
    });
}

// Event listeners pour les sliders trigonométriques
document.getElementById('trig-a').addEventListener('input', (e) => {
    trigParams.a = parseFloat(e.target.value);
    document.getElementById('trig-a-value').textContent = trigParams.a.toFixed(1);
    updateTrigonometric();
});

document.getElementById('trig-b').addEventListener('input', (e) => {
    trigParams.b = parseFloat(e.target.value);
    document.getElementById('trig-b-value').textContent = trigParams.b.toFixed(1);
    updateTrigonometric();
});

document.getElementById('trig-h').addEventListener('input', (e) => {
    trigParams.h = parseFloat(e.target.value);
    document.getElementById('trig-h-value').textContent = trigParams.h.toFixed(2);
    updateTrigonometric();
});

document.getElementById('trig-k').addEventListener('input', (e) => {
    trigParams.k = parseFloat(e.target.value);
    document.getElementById('trig-k-value').textContent = trigParams.k.toFixed(1);
    updateTrigonometric();
});

// ========== INITIALISATION ==========
window.addEventListener('load', () => {
    updateLinear();
    updateQuadratic();
    updateExponential();
    updateTrigonometric();
});
