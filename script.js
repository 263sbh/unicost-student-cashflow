const loanAmountInput = document.getElementById("loanAmount");
const weeklyRentInput = document.getElementById("weeklyRent");
const weeklySpendInput = document.getElementById("weeklySpend");
const startingBalanceInput = document.getElementById("startingBalance");
const calculateButton = document.getElementById("calculateButton");
const results = document.getElementById("results");

const TOTAL_WEEKS = 40;
const LOAN_PAYMENT_WEEKS = [1, 15, 29];

calculateButton.addEventListener("click", runSimulation);

function runSimulation() {
  const loanAmount = Number(loanAmountInput.value);
  const weeklyRent = Number(weeklyRentInput.value);
  const weeklySpend = Number(weeklySpendInput.value);
  const startingBalance = Number(startingBalanceInput.value);

  if (loanAmount < 0 || weeklyRent < 0 || weeklySpend < 0 || startingBalance < 0) {
    results.innerHTML = `<h2>Your result</h2><p>Please enter valid, non-negative numbers.</p>`;
    return;
  }

  const instalment = loanAmount / LOAN_PAYMENT_WEEKS.length;
  const weeklyOutgoings = weeklyRent + weeklySpend;

  let balance = startingBalance;
  let firstNegativeWeek = null;
  const weeklyBalances = [];

  for (let week = 1; week <= TOTAL_WEEKS; week++) {
    if (LOAN_PAYMENT_WEEKS.includes(week)) {
      balance += instalment;
    }
    balance -= weeklyOutgoings;
    weeklyBalances.push({ week, balance });

    if (balance < 0 && firstNegativeWeek === null) {
      firstNegativeWeek = week;
    }
  }

  displayResults(weeklyBalances, firstNegativeWeek, weeklyOutgoings);
}

function displayResults(weeklyBalances, firstNegativeWeek, weeklyOutgoings) {
  let summary;

  if (firstNegativeWeek === null) {
    summary = `<p style="color:#15803d; font-weight:bold;">Your balance stays positive for all ${TOTAL_WEEKS} weeks.</p>`;
  } else {
    const shortfallWeek = weeklyBalances.find(w => w.week === firstNegativeWeek);
    summary = `
      <p style="color:#b91c1c; font-weight:bold; font-size:1.3rem;">
        Your balance goes negative in Week ${firstNegativeWeek}
      </p>
      <p>Estimated shortfall at that point: <strong>£${Math.abs(shortfallWeek.balance).toFixed(2)}</strong></p>
      <p>You would need roughly <strong>£${(Math.abs(shortfallWeek.balance) / firstNegativeWeek).toFixed(2)} extra per week</strong> from savings or part-time work to avoid this.</p>
    `;
  }

  let weekList = weeklyBalances
    .map(w => `<div class="week-line ${w.balance < 0 ? "week-negative" : ""}">Week ${w.week}: £${w.balance.toFixed(2)}</div>`)
    .join("");

  results.innerHTML = `
    <h2>Your result</h2>
    ${summary}
    <p>Weekly outgoings: £${weeklyOutgoings.toFixed(2)}</p>
    <details style="margin-top:16px;">
      <summary style="cursor:pointer; font-weight:bold;">See full week-by-week balance</summary>
      ${weekList}
    </details>
  `;
}