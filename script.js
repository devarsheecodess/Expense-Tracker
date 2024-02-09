const checkCredit = document.getElementById("checkCredit");
const checkExpense = document.getElementById("checkExpense");
const historyContainer = document.getElementById("history");
let flag;
let nums = 0;
if (nums == 0) {
  document.getElementById("history-empty").innerHTML = "Nothing to show";
}

checkCredit.addEventListener("click", () => {
  if (checkCredit.checked) {
    checkExpense.disabled = true;
    flag = true;
  } else {
    checkExpense.disabled = false;
    flag = false;
  }
});

checkExpense.addEventListener("click", () => {
  if (checkExpense.checked) {
    checkCredit.disabled = true;
    flag = false;
  } else {
    flag = true;
    checkCredit.disabled = false;
  }
});

const addButton = document.getElementById("add");

addButton.addEventListener("click", function () {
  const titleInput = document.getElementById("title");
  const amountInput = document.getElementById("amount");
  const dateInput = document.getElementById("date");

  const title = titleInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  if (title.trim() === "" || isNaN(amount) || date.trim() === "") {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (checkCredit.checked || checkExpense.checked) {
    addExpenseToHistory(flag, title, amount, date);
    clearFields();
    if (flag) {
      updateProfitBalance(amount);
    } else if (!flag) {
      updateLossBalance(amount);
    }
  } else {
    alert("Select the type of entry!");
  }
  nums++;
  document.getElementById("history-empty").innerHTML = "";
});

function addExpenseToHistory(flag, title, amount, date) {
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-boxes");

  historyItem.innerHTML = `
            <div class="line-1">
                <h3>${title}</h3>
                <h3 class="displayAMT">${
    checkCredit.checked ? "+" : "-"
  }${Math.abs(amount)} ₹</h3>
            </div>
            <div class="line-2">
                <h5>${date}</h5>
                <button class="delete-btn"><i class="fa-solid fa-trash-can" style="color: #3c2c0f;"></i></button>
            </div>
        `;

  historyContainer.appendChild(historyItem);

  const price = historyItem.querySelector(".displayAMT");
  if (flag) {
    price.style.color = "rgb(5, 83, 5)";
  } else if (!flag) {
    price.style.color = "rgb(112, 23, 23)";
  }

  const deleteBtn = historyItem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    if (flag) {
      updateProfitBalanceAfterDelete(amount);
    } else if (!flag) {
      updateLossBalanceAfterDelete(amount);
    }
    historyItem.remove();
    alert("Deleted successfully!");
    nums--;
    if (nums == 0) {
      document.getElementById("history-empty").innerHTML = "Nothing to show";
    }
  });
}

function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
  checkCredit.checked = false;
  checkExpense.checked = false;
  checkCredit.disabled = false;
  checkExpense.disabled = false;
}

let currentBalance = 0;
let currentProfit = 0;
let currentLoss = 0;

function updateProfitBalance(amount) {
  const balance = document.getElementById("balance");
  const newBalance = currentBalance + amount;
  balance.innerHTML = `${newBalance} ₹`;

  currentBalance = newBalance;

  const profit = document.getElementById("profit");
  const newProfit = currentProfit + amount;
  profit.innerHTML = `+${newProfit} ₹`;

  currentProfit = newProfit;
}

function updateLossBalance(amount) {
  const balance = document.getElementById("balance");
  const newBalance = currentBalance - amount;
  balance.innerHTML = `${newBalance} ₹`;

  currentBalance = newBalance;

  const loss = document.getElementById("loss");
  const newLoss = amount + currentLoss;
  loss.innerHTML = `-${newLoss} ₹`;

  currentLoss = newLoss;
}

function updateProfitBalanceAfterDelete(amount) {
  const balance = document.getElementById("balance");
  const newBalance = currentBalance - amount;
  balance.innerHTML = `${Math.abs(newBalance)} ₹`;

  currentBalance = newBalance;

  const profit = document.getElementById("profit");
  const newProfit = currentProfit - amount;
  profit.innerHTML = `+${newProfit} ₹`;

  currentProfit = newProfit;
}

function updateLossBalanceAfterDelete(amount) {
  const balance = document.getElementById("balance");
  const newBalance = currentBalance + amount;
  balance.innerHTML = `${Math.abs(newBalance)} ₹`;

  currentBalance = newBalance;

  const loss = document.getElementById("loss");
  const newLoss = currentLoss - amount;
  loss.innerHTML = `-${newLoss} ₹`;

  currentLoss = newLoss;
}
