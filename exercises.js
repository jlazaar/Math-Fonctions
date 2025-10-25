// Gestion du score
let totalScore = 0;
let completedCount = 0;
let exerciseStates = {
    ex1: { completed: false, data: {} },
    ex2: { completed: false, data: {} },
    ex3: { completed: false, data: {} },
    ex4: { completed: false, data: {} },
    ex5: { completed: false, data: {} },
    ex6: { completed: false, data: {} },
    ex7: { completed: false, data: {} }
};

// Charger le score depuis localStorage
function loadScore() {
    const savedScore = localStorage.getItem('mathExercisesScore');
    const savedCompleted = localStorage.getItem('mathExercisesCompleted');
    const savedStates = localStorage.getItem('mathExercisesStates');

    if (savedScore) totalScore = parseInt(savedScore);
    if (savedCompleted) completedCount = parseInt(savedCompleted);
    if (savedStates) exerciseStates = JSON.parse(savedStates);

    updateScoreDisplay();
}

// Sauvegarder le score
function saveScore() {
    localStorage.setItem('mathExercisesScore', totalScore);
    localStorage.setItem('mathExercisesCompleted', completedCount);
    localStorage.setItem('mathExercisesStates', JSON.stringify(exerciseStates));
    updateScoreDisplay();
}

// Mettre à jour l'affichage du score
function updateScoreDisplay() {
    document.getElementById('total-score').textContent = totalScore;
    document.getElementById('completed-count').textContent = completedCount + '/7';
}

// Réinitialiser tous les exercices
function resetAllExercises() {
    if (confirm('Voulez-vous vraiment réinitialiser tous vos progrès?')) {
        totalScore = 0;
        completedCount = 0;
        exerciseStates = {
            ex1: { completed: false, data: {} },
            ex2: { completed: false, data: {} },
            ex3: { completed: false, data: {} },
            ex4: { completed: false, data: {} },
            ex5: { completed: false, data: {} },
            ex6: { completed: false, data: {} },
            ex7: { completed: false, data: {} }
        };
        saveScore();
        location.reload();
    }
}

// Fonction pour afficher/masquer les indices
function showHint(hintId) {
    const hint = document.getElementById(hintId);
    hint.classList.toggle('hidden');
}

// Fonction pour sélectionner une option
function selectOption(exerciseNum, optionIndex) {
    const options = document.querySelectorAll(`input[name="ex${exerciseNum}"]`);
    const optionDivs = document.querySelectorAll(`input[name="ex${exerciseNum}"]`).forEach((radio, idx) => {
        radio.parentElement.classList.remove('selected');
    });

    options[optionIndex].checked = true;
    options[optionIndex].parentElement.classList.add('selected');
}

// Fonction pour afficher le feedback
function showFeedback(feedbackId, message, type) {
    const feedback = document.getElementById(feedbackId);
    feedback.textContent = message;
    feedback.className = 'feedback show ' + type;
}

// Fonction pour ajouter des points
function addPoints(exerciseId, points) {
    if (!exerciseStates[exerciseId].completed) {
        totalScore += points;
        completedCount++;
        exerciseStates[exerciseId].completed = true;
        saveScore();
    }
}

// ========== EXERCICE 1: Identifier les paramètres ==========
function generateExercise1() {
    const a = Math.floor(Math.random() * 11) - 5; // -5 à 5
    const b = Math.floor(Math.random() * 21) - 10; // -10 à 10

    // Éviter a = 0
    if (a === 0) return generateExercise1();

    exerciseStates.ex1.data = { a, b };

    let functionText = '';
    if (a === 1) functionText = 'x';
    else if (a === -1) functionText = '-x';
    else functionText = `${a}x`;

    if (b > 0) functionText += ` + ${b}`;
    else if (b < 0) functionText += ` - ${Math.abs(b)}`;

    document.getElementById('ex1-function').textContent = functionText;
    document.getElementById('ex1-feedback').className = 'feedback';
    document.getElementById('ex1-a').value = '';
    document.getElementById('ex1-b').value = '';
}

function checkExercise1() {
    const userA = parseFloat(document.getElementById('ex1-a').value);
    const userB = parseFloat(document.getElementById('ex1-b').value);
    const { a, b } = exerciseStates.ex1.data;

    if (isNaN(userA) || isNaN(userB)) {
        showFeedback('ex1-feedback', 'Veuillez entrer des valeurs pour a et b.', 'error');
        return;
    }

    if (userA === a && userB === b) {
        showFeedback('ex1-feedback', '✓ Excellent! Vous avez correctement identifié les paramètres!', 'success');
        addPoints('ex1', 10);
    } else {
        let msg = '✗ Incorrect. ';
        if (userA !== a) msg += `La valeur de a est ${a}. `;
        if (userB !== b) msg += `La valeur de b est ${b}.`;
        showFeedback('ex1-feedback', msg, 'error');
    }
}

// ========== EXERCICE 2: Sommet de la parabole ==========
function generateExercise2() {
    const a = Math.random() > 0.5 ? 1 : -1;
    const h = Math.floor(Math.random() * 11) - 5; // -5 à 5
    const k = Math.floor(Math.random() * 11) - 5; // -5 à 5

    exerciseStates.ex2.data = { a, h, k };

    let functionText = a === 1 ? '' : '-';
    functionText += `(x${h === 0 ? '' : h > 0 ? ` - ${h}` : ` + ${Math.abs(h)}`})²`;
    if (k > 0) functionText += ` + ${k}`;
    else if (k < 0) functionText += ` - ${Math.abs(k)}`;

    document.getElementById('ex2-function').textContent = functionText;
    document.getElementById('ex2-feedback').className = 'feedback';
    document.getElementById('ex2-h').value = '';
    document.getElementById('ex2-k').value = '';
}

function checkExercise2() {
    const userH = parseFloat(document.getElementById('ex2-h').value);
    const userK = parseFloat(document.getElementById('ex2-k').value);
    const { h, k } = exerciseStates.ex2.data;

    if (isNaN(userH) || isNaN(userK)) {
        showFeedback('ex2-feedback', 'Veuillez entrer des valeurs pour h et k.', 'error');
        return;
    }

    if (userH === h && userK === k) {
        showFeedback('ex2-feedback', '✓ Parfait! Le sommet est bien en (' + h + ', ' + k + ')!', 'success');
        addPoints('ex2', 10);
    } else {
        showFeedback('ex2-feedback', `✗ Incorrect. Le sommet est en (${h}, ${k}).`, 'error');
    }
}

// ========== EXERCICE 3: Choix multiple - Effet des paramètres ==========
const ex3Questions = [
    {
        question: "Si on augmente le paramètre 'a' dans f(x) = ax + b (avec a > 0), que se passe-t-il?",
        options: [
            "La droite devient plus raide",
            "La droite se déplace vers le haut",
            "La droite se déplace vers la droite",
            "Aucun changement"
        ],
        correct: 0,
        hint: "Le paramètre 'a' est la pente. Plus il est grand, plus la droite est inclinée."
    },
    {
        question: "Dans f(x) = a(x - h)² + k, que fait le paramètre 'k'?",
        options: [
            "Change l'ouverture de la parabole",
            "Déplace la parabole horizontalement",
            "Déplace la parabole verticalement",
            "Inverse la parabole"
        ],
        correct: 2,
        hint: "Le paramètre 'k' affecte la coordonnée y du sommet."
    },
    {
        question: "Si 'a' est négatif dans f(x) = a·sin(x), que se passe-t-il?",
        options: [
            "L'amplitude augmente",
            "La fonction est inversée verticalement",
            "La période change",
            "La fonction se déplace vers la gauche"
        ],
        correct: 1,
        hint: "Un coefficient négatif devant une fonction crée un effet miroir."
    },
    {
        question: "Dans f(x) = 2^(x - h), que fait le paramètre 'h'?",
        options: [
            "Change la base de l'exponentielle",
            "Déplace le graphique verticalement",
            "Déplace le graphique horizontalement",
            "Change l'asymptote verticale"
        ],
        correct: 2,
        hint: "Le paramètre 'h' à l'intérieur de la fonction affecte l'axe horizontal."
    }
];

let currentEx3Question = 0;

function generateExercise3() {
    currentEx3Question = Math.floor(Math.random() * ex3Questions.length);
    const q = ex3Questions[currentEx3Question];

    document.getElementById('ex3-question').textContent = q.question;
    q.options.forEach((opt, idx) => {
        document.getElementById(`ex3-label${idx}`).textContent = opt;
        const radio = document.getElementById(`ex3-opt${idx}`);
        radio.checked = false;
        radio.parentElement.classList.remove('selected', 'correct', 'incorrect');
    });

    document.getElementById('ex3-hint').textContent = q.hint;
    document.getElementById('ex3-feedback').className = 'feedback';
}

function checkExercise3() {
    const selected = document.querySelector('input[name="ex3"]:checked');

    if (!selected) {
        showFeedback('ex3-feedback', 'Veuillez sélectionner une réponse.', 'error');
        return;
    }

    const selectedIndex = parseInt(selected.id.replace('ex3-opt', ''));
    const correct = ex3Questions[currentEx3Question].correct;

    // Marquer visuellement les options
    document.querySelectorAll('input[name="ex3"]').forEach((radio, idx) => {
        radio.parentElement.classList.remove('selected');
        if (idx === correct) {
            radio.parentElement.classList.add('correct');
        } else if (idx === selectedIndex && idx !== correct) {
            radio.parentElement.classList.add('incorrect');
        }
    });

    if (selectedIndex === correct) {
        showFeedback('ex3-feedback', '✓ Correct! Excellente compréhension des paramètres!', 'success');
        addPoints('ex3', 15);
    } else {
        showFeedback('ex3-feedback', `✗ Incorrect. La bonne réponse était: ${ex3Questions[currentEx3Question].options[correct]}`, 'error');
    }
}

// ========== EXERCICE 4: Correspondance graphique ==========
let ex4Graph;
const ex4Functions = [
    { func: (x) => Math.pow(x, 2) + 2, label: "f(x) = x² + 2", a: 1, h: 0, k: 2 },
    { func: (x) => -Math.pow(x, 2) + 2, label: "f(x) = -x² + 2", a: -1, h: 0, k: 2 },
    { func: (x) => Math.pow(x - 2, 2), label: "f(x) = (x - 2)²", a: 1, h: 2, k: 0 },
    { func: (x) => 2 * Math.pow(x, 2), label: "f(x) = 2x²", a: 2, h: 0, k: 0 },
    { func: (x) => Math.pow(x + 2, 2) - 3, label: "f(x) = (x + 2)² - 3", a: 1, h: -2, k: -3 },
    { func: (x) => -0.5 * Math.pow(x - 1, 2) + 3, label: "f(x) = -0.5(x - 1)² + 3", a: -0.5, h: 1, k: 3 }
];

let currentEx4 = 0;

function generateExercise4() {
    // Sélectionner une fonction aléatoire
    currentEx4 = Math.floor(Math.random() * ex4Functions.length);
    const correctFunc = ex4Functions[currentEx4];

    // Créer un ensemble d'options incluant la bonne réponse
    let options = [currentEx4];
    while (options.length < 4) {
        const rand = Math.floor(Math.random() * ex4Functions.length);
        if (!options.includes(rand)) {
            options.push(rand);
        }
    }

    // Mélanger les options
    options = options.sort(() => Math.random() - 0.5);
    exerciseStates.ex4.data = { correct: currentEx4, options };

    // Afficher les options
    options.forEach((funcIdx, optIdx) => {
        document.getElementById(`ex4-label${optIdx}`).textContent = ex4Functions[funcIdx].label;
        const radio = document.getElementById(`ex4-opt${optIdx}`);
        radio.checked = false;
        radio.parentElement.classList.remove('selected', 'correct', 'incorrect');
    });

    // Dessiner le graphique
    if (!ex4Graph) {
        ex4Graph = new GraphRenderer('ex4-graph', 400, 300);
    }
    ex4Graph.render(correctFunc.func, {
        color: '#7c3aed',
        lineWidth: 3,
        points: [{ x: correctFunc.h, y: correctFunc.k, color: '#ef4444' }]
    });

    document.getElementById('ex4-feedback').className = 'feedback';
}

function checkExercise4() {
    const selected = document.querySelector('input[name="ex4"]:checked');

    if (!selected) {
        showFeedback('ex4-feedback', 'Veuillez sélectionner une réponse.', 'error');
        return;
    }

    const selectedIndex = parseInt(selected.id.replace('ex4-opt', ''));
    const { correct, options } = exerciseStates.ex4.data;
    const selectedFuncIdx = options[selectedIndex];
    const correctOptIdx = options.indexOf(correct);

    // Marquer visuellement les options
    document.querySelectorAll('input[name="ex4"]').forEach((radio, idx) => {
        radio.parentElement.classList.remove('selected');
        if (idx === correctOptIdx) {
            radio.parentElement.classList.add('correct');
        } else if (idx === selectedIndex && selectedFuncIdx !== correct) {
            radio.parentElement.classList.add('incorrect');
        }
    });

    if (selectedFuncIdx === correct) {
        showFeedback('ex4-feedback', '✓ Excellent! Vous avez correctement identifié la fonction!', 'success');
        addPoints('ex4', 20);
    } else {
        showFeedback('ex4-feedback', `✗ Incorrect. La bonne réponse était: ${ex4Functions[correct].label}`, 'error');
    }
}

// ========== EXERCICE 5: Période d'une fonction trigonométrique ==========
function generateExercise5() {
    const a = Math.floor(Math.random() * 5) + 1; // 1 à 5
    const b = (Math.floor(Math.random() * 8) + 1) / 2; // 0.5, 1, 1.5, ..., 4

    exerciseStates.ex5.data = { a, b, period: (2 * Math.PI) / b };

    let functionText = '';
    if (a !== 1) functionText += `${a} `;
    functionText += `sin(${b === 1 ? '' : b}x)`;

    document.getElementById('ex5-function').textContent = functionText;
    document.getElementById('ex5-feedback').className = 'feedback';
    document.getElementById('ex5-period').value = '';
}

function checkExercise5() {
    const userPeriod = parseFloat(document.getElementById('ex5-period').value);
    const { period } = exerciseStates.ex5.data;

    if (isNaN(userPeriod)) {
        showFeedback('ex5-feedback', 'Veuillez entrer une valeur pour la période.', 'error');
        return;
    }

    // Accepter une petite marge d'erreur
    if (Math.abs(userPeriod - period) < 0.05) {
        showFeedback('ex5-feedback', `✓ Parfait! La période est bien ${period.toFixed(2)} radians (${(period / Math.PI).toFixed(2)}π)!`, 'success');
        addPoints('ex5', 20);
    } else {
        showFeedback('ex5-feedback', `✗ Incorrect. La période est ${period.toFixed(2)} radians. Formule: 2π/|b|`, 'error');
    }
}

// ========== EXERCICE 6: Construire une fonction ==========
const ex6Challenges = [
    {
        description: "une fonction quadratique avec sommet en (2, -3) et qui s'ouvre vers le bas",
        check: (a, h, k) => a < 0 && h === 2 && k === -3,
        solution: "a < 0, h = 2, k = -3"
    },
    {
        description: "une fonction quadratique avec sommet en (-1, 4) et qui s'ouvre vers le haut",
        check: (a, h, k) => a > 0 && h === -1 && k === 4,
        solution: "a > 0, h = -1, k = 4"
    },
    {
        description: "une parabole inversée avec sommet à l'origine",
        check: (a, h, k) => a < 0 && h === 0 && k === 0,
        solution: "a < 0, h = 0, k = 0"
    },
    {
        description: "une parabole plus large que x² avec sommet en (3, -2)",
        check: (a, h, k) => a > 0 && a < 1 && h === 3 && k === -2,
        solution: "0 < a < 1, h = 3, k = -2"
    }
];

let currentEx6 = 0;

function generateExercise6() {
    currentEx6 = Math.floor(Math.random() * ex6Challenges.length);
    const challenge = ex6Challenges[currentEx6];

    document.getElementById('ex6-question').textContent = `Écrivez ${challenge.description}.`;
    document.getElementById('ex6-feedback').className = 'feedback';
    document.getElementById('ex6-a').value = '';
    document.getElementById('ex6-h').value = '';
    document.getElementById('ex6-k').value = '';
    document.getElementById('ex6-preview').textContent = 'f(x) = a(x - h)² + k';
}

function checkExercise6() {
    const a = parseFloat(document.getElementById('ex6-a').value);
    const h = parseFloat(document.getElementById('ex6-h').value);
    const k = parseFloat(document.getElementById('ex6-k').value);

    if (isNaN(a) || isNaN(h) || isNaN(k)) {
        showFeedback('ex6-feedback', 'Veuillez entrer des valeurs pour a, h et k.', 'error');
        return;
    }

    const challenge = ex6Challenges[currentEx6];

    if (challenge.check(a, h, k)) {
        showFeedback('ex6-feedback', '✓ Excellent! Votre fonction respecte tous les critères!', 'success');
        addPoints('ex6', 25);
    } else {
        showFeedback('ex6-feedback', `✗ Votre fonction ne respecte pas tous les critères. Solution: ${challenge.solution}`, 'error');
    }

    updateEx6Preview();
}

// Mettre à jour la prévisualisation de la fonction
document.getElementById('ex6-a').addEventListener('input', updateEx6Preview);
document.getElementById('ex6-h').addEventListener('input', updateEx6Preview);
document.getElementById('ex6-k').addEventListener('input', updateEx6Preview);

function updateEx6Preview() {
    const a = document.getElementById('ex6-a').value || 'a';
    const h = document.getElementById('ex6-h').value || 'h';
    const k = document.getElementById('ex6-k').value || 'k';

    let preview = `f(x) = ${a}(x`;
    if (h !== 'h') {
        const hNum = parseFloat(h);
        if (hNum === 0) preview += ')²';
        else if (hNum > 0) preview += ` - ${h})²`;
        else preview += ` + ${Math.abs(hNum)})²`;
    } else {
        preview += ` - h)²`;
    }

    if (k !== 'k') {
        const kNum = parseFloat(k);
        if (kNum > 0) preview += ` + ${k}`;
        else if (kNum < 0) preview += ` - ${Math.abs(kNum)}`;
    } else {
        preview += ` + k`;
    }

    document.getElementById('ex6-preview').textContent = preview;
}

// ========== EXERCICE 7: Transformation interactive ==========
let ex7Graph;
let ex7Target = { a: 1, h: 0, k: 0 };
let ex7Current = { a: 1, h: 0, k: 0 };

function generateExercise7() {
    // Générer des paramètres cibles aléatoires
    ex7Target = {
        a: (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1) * 0.5,
        h: Math.floor(Math.random() * 7) - 3,
        k: Math.floor(Math.random() * 7) - 3
    };

    // Réinitialiser les sliders
    ex7Current = { a: 1, h: 0, k: 0 };
    document.getElementById('ex7-a').value = 1;
    document.getElementById('ex7-h').value = 0;
    document.getElementById('ex7-k').value = 0;
    document.getElementById('ex7-a-value').textContent = 1;
    document.getElementById('ex7-h-value').textContent = 0;
    document.getElementById('ex7-k-value').textContent = 0;

    document.getElementById('ex7-feedback').className = 'feedback';

    if (!ex7Graph) {
        ex7Graph = new GraphRenderer('ex7-graph', 400, 300);
    }

    updateEx7Graph();
}

function updateEx7Graph() {
    const userFunc = (x) => ex7Current.a * Math.pow(x - ex7Current.h, 2) + ex7Current.k;
    const targetFunc = (x) => ex7Target.a * Math.pow(x - ex7Target.h, 2) + ex7Target.k;

    ex7Graph.clear();
    ex7Graph.drawGrid();
    ex7Graph.drawAxes();

    // Dessiner la fonction cible en pointillés rouges
    ex7Graph.ctx.setLineDash([5, 5]);
    ex7Graph.drawFunction(targetFunc, '#ef4444', 2);

    // Dessiner la fonction utilisateur en bleu
    ex7Graph.ctx.setLineDash([]);
    ex7Graph.drawFunction(userFunc, '#3b82f6', 3);

    // Ajouter les sommets
    ex7Graph.drawPoint(ex7Target.h, ex7Target.k, '#ef4444', 6);
    ex7Graph.drawPoint(ex7Current.h, ex7Current.k, '#3b82f6', 6);
}

// Event listeners pour les sliders de l'exercice 7
document.getElementById('ex7-a').addEventListener('input', (e) => {
    ex7Current.a = parseFloat(e.target.value);
    document.getElementById('ex7-a-value').textContent = ex7Current.a.toFixed(1);
    updateEx7Graph();
});

document.getElementById('ex7-h').addEventListener('input', (e) => {
    ex7Current.h = parseFloat(e.target.value);
    document.getElementById('ex7-h-value').textContent = ex7Current.h.toFixed(1);
    updateEx7Graph();
});

document.getElementById('ex7-k').addEventListener('input', (e) => {
    ex7Current.k = parseFloat(e.target.value);
    document.getElementById('ex7-k-value').textContent = ex7Current.k.toFixed(1);
    updateEx7Graph();
});

function checkExercise7() {
    const tolerance = 0.1;

    const aMatch = Math.abs(ex7Current.a - ex7Target.a) < tolerance;
    const hMatch = Math.abs(ex7Current.h - ex7Target.h) < tolerance;
    const kMatch = Math.abs(ex7Current.k - ex7Target.k) < tolerance;

    if (aMatch && hMatch && kMatch) {
        showFeedback('ex7-feedback', '✓ Parfait! Votre courbe correspond exactement à la courbe cible!', 'success');
        addPoints('ex7', 30);
    } else {
        let msg = '✗ Presque! ';
        if (!aMatch) msg += `Ajustez a (cible: ${ex7Target.a}). `;
        if (!hMatch) msg += `Ajustez h (cible: ${ex7Target.h}). `;
        if (!kMatch) msg += `Ajustez k (cible: ${ex7Target.k}).`;
        showFeedback('ex7-feedback', msg, 'partial');
    }
}

// ========== INITIALISATION ==========
window.addEventListener('load', () => {
    loadScore();
    generateExercise1();
    generateExercise2();
    generateExercise3();
    generateExercise4();
    generateExercise5();
    generateExercise6();
    generateExercise7();
});
