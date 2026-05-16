const showError = (msg) => {
  document.getElementById("error-msg").textContent = msg;
};

const clearError = () => {
  document.getElementById("error-msg").textContent = "";
};

const showConfirm = (msg) => {
  const box = document.getElementById("confirm-box");
  document.getElementById("confirm-text").textContent = msg;
  box.classList.remove("hidden");
};

const hideConfirm = () => {
  document.getElementById("confirm-box").classList.add("hidden");
};

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("plans-container").innerHTML = "";
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
};

let pricingData = null;
let currentPeriod = "monthly";

const loadPricingData = async () => {
  try {
    showLoader();

    const response = await fetch("pricing.json");

    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }

    const data = await response.json();
    pricingData = data;

    setTimeout(() => {
      hideLoader();
      renderPlans(currentPeriod);
    }, 1000);

  } catch (err) {
    hideLoader();
    showError(`Помилка завантаження даних: ${err.message}`);
    console.error("Fetch error:", err);
  }
};

const handleSelectPlan = (btn, planName, price, period) => {
  hideConfirm();
  clearError();

  btn.textContent = "Обробка...";
  btn.classList.add("loading");

  setTimeout(() => {
    btn.textContent = "Обрати план";
    btn.classList.remove("loading");
    const periodLabel = period === "monthly" ? "місяць" : "рік";
    showConfirm(`✓ Ви обрали тариф "${planName}" — ${price} ₴ / ${periodLabel}`);
  }, 1500);
};

const renderPlans = (period) => {
  const container = document.getElementById("plans-container");
  clearError();
  hideConfirm();

  if (!pricingData) {
    showError("Дані тарифів не завантажено");
    return;
  }

  const plans = pricingData[period];

  if (!plans || plans.length === 0) {
    showError("Список тарифів порожній");
    return;
  }

  container.innerHTML = plans.map(plan => `
    <div class="plan-card${plan.popular ? " popular" : ""}"
         data-plan-id="${plan.id}"
         data-plan-name="${plan.plan}"
         data-plan-price="${plan.price}">
      <div class="plan-name">${plan.plan}</div>
      <div class="plan-price">
        ${plan.price} ₴<span> / міс</span>
      </div>
      <ul class="plan-features">
        ${plan.features.map(f => `<li>${f}</li>`).join("")}
      </ul>
      <button class="plan-btn">Обрати план</button>
    </div>
  `).join("");
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("plans-container");

  container.addEventListener("click", (event) => {
    const btn = event.target.closest(".plan-btn");
    const card = event.target.closest(".plan-card");

    if (!card) return;

    document.querySelectorAll(".plan-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");

    if (btn && !btn.classList.contains("loading")) {
      const planName = card.dataset.planName;
      const planPrice = card.dataset.planPrice;
      handleSelectPlan(btn, planName, planPrice, currentPeriod);
    }
  });

  loadPricingData();
});

const switchPlan = (period) => {
  currentPeriod = period;
  document.querySelectorAll(".toggle-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`btn-${period}`).classList.add("active");

  showLoader();
  setTimeout(() => {
    hideLoader();
    renderPlans(period);
  }, 800);
};