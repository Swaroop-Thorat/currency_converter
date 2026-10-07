const API = "953a56cbfa01a59de67e88a7";

const button = document.getElementById("but");
const from = document.getElementById("from");
const to = document.getElementById("to");
const val = document.getElementById("val");
const show = document.getElementById("show");
const swapBtn = document.getElementById("swap");
const rateText = document.getElementById("rate-text");
const popularList = document.getElementById("popular-list");

const popularCurrencies = ["EUR", "JPY", "AUD", "HKD", "GBP", "CAD", "USD", "CHF", "INR"];

async function convert() {
    const From = from.value.toUpperCase();
    const To = to.value.toUpperCase();
    const Value = parseFloat(val.value);

    if (isNaN(Value)) {
        show.value = "";
        rateText.textContent = "Please enter a valid amount";
        return;
    }

    try {
        const url = `https://v6.exchangerate-api.com/v6/${API}/latest/${From}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.result === "error") {
            rateText.textContent = data['error-type'] || "API Error";
            return;
        }

        const rates = data.conversion_rates;

        if (!rates) {
            rateText.textContent = "Invalid Currency";
            return;
        }

        const rate = rates[To];
        const display = rate * Value;
        show.value = display.toFixed(2);
        rateText.textContent = `1.00000 ${From} = ${rate.toFixed(5)} ${To}`;
        
        updatePopularConversions(From, rates);
    } catch (error) {
        rateText.textContent = "Network error. Try again.";
    }
}

function updatePopularConversions(base, rates) {
    popularList.innerHTML = "";
    let count = 0;
    for (let curr of popularCurrencies) {
        if (curr !== base && rates[curr] && count < 6) {
            const item = document.createElement("div");
            item.className = "conv-item";
            
            const title = document.createElement("div");
            title.className = "conv-title";
            title.innerHTML = `<span>${base}</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 10v12"></path><path d="M15 14v-12"></path><path d="M3 14l4 4 4-4"></path><path d="M19 10l-4-4-4 4"></path></svg> <span>${curr}</span>`;
            
            const rateVal = document.createElement("div");
            rateVal.className = "conv-rate";
            rateVal.textContent = rates[curr].toFixed(5);
            
            item.appendChild(title);
            item.appendChild(rateVal);
            popularList.appendChild(item);
            count++;
        }
    }
}

button.addEventListener("click", convert);

swapBtn.addEventListener("click", () => {
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    convert();
});

convert();