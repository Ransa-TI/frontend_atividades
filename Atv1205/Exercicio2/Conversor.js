const celsiusInput = document.getElementById("celsius");
const fahrenheitInput = document.getElementById("fahrenheit");

let travando = false;

// Celsius → Fahrenheit
celsiusInput.addEventListener("input", () => {
    if (travando) return;

    const c = parseFloat(celsiusInput.value);

    if (isNaN(c)) {
        fahrenheitInput.value = "";
        return;
    }

    travando = true;

    const f = (c * 9/5) + 32;
    fahrenheitInput.value = f.toFixed(2);

    travando = false;
});

// Fahrenheit → Celsius
fahrenheitInput.addEventListener("input", () => {
    if (travando) return;

    const f = parseFloat(fahrenheitInput.value);

    if (isNaN(f)) {
        celsiusInput.value = "";
        return;
    }

    travando = true;

    const c = (f - 32) * 5/9;
    celsiusInput.value = c.toFixed(2);

    travando = false;
});