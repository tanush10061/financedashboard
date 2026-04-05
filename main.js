const STORAGE_KEY = "pulse-ledger-state-v1";
const currencyConfig = {
  USD: { locale: "en-US", code: "USD", rate: 1 },
  INR: { locale: "en-IN", code: "INR", rate: 83.45 },
  EUR: { locale: "de-DE", code: "EUR", rate: 0.92 },
  GBP: { locale: "en-GB", code: "GBP", rate: 0.79 },
};

const categories = [
  "Housing",
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Salary",
  "Freelance",
  "Savings",
  "Other",
];
const budgetCategories = ["Housing", "Food", "Transport", "Utilities", "Entertainment", "Health", "Savings"];

const initialTransactions = [
  { id: 1, date: "2026-02-03", description: "Monthly salary", amount: 5100, category: "Salary", type: "income" },
  { id: 2, date: "2026-02-04", description: "Apartment rent", amount: 1650, category: "Housing", type: "expense" },
  { id: 3, date: "2026-02-07", description: "Groceries", amount: 172.64, category: "Food", type: "expense" },
  { id: 4, date: "2026-02-10", description: "Electric bill", amount: 106.9, category: "Utilities", type: "expense" },
  { id: 5, date: "2026-02-13", description: "Train pass", amount: 79.99, category: "Transport", type: "expense" },
  { id: 6, date: "2026-02-18", description: "UX consulting", amount: 820, category: "Freelance", type: "income" },
  { id: 7, date: "2026-02-22", description: "Dinner out", amount: 74.3, category: "Entertainment", type: "expense" },
  { id: 8, date: "2026-03-02", description: "Monthly salary", amount: 5200, category: "Salary", type: "income" },
  { id: 9, date: "2026-03-03", description: "Apartment rent", amount: 1650, category: "Housing", type: "expense" },
  { id: 10, date: "2026-03-05", description: "Groceries", amount: 184.42, category: "Food", type: "expense" },
  { id: 11, date: "2026-03-07", description: "Client retainer", amount: 1250, category: "Freelance", type: "income" },
  { id: 12, date: "2026-03-09", description: "Electric bill", amount: 112.2, category: "Utilities", type: "expense" },
  { id: 13, date: "2026-03-11", description: "Train pass", amount: 79.99, category: "Transport", type: "expense" },
  { id: 14, date: "2026-03-14", description: "Dinner with friends", amount: 68.5, category: "Entertainment", type: "expense" },
  { id: 15, date: "2026-03-16", description: "Pharmacy", amount: 42.15, category: "Health", type: "expense" },
  { id: 16, date: "2026-03-18", description: "Emergency fund transfer", amount: 400, category: "Savings", type: "expense" },
  { id: 17, date: "2026-03-21", description: "Coffee shop side project", amount: 320, category: "Freelance", type: "income" },
  { id: 18, date: "2026-03-24", description: "Streaming bundle", amount: 26.99, category: "Entertainment", type: "expense" },
  { id: 19, date: "2026-03-28", description: "Weekend groceries", amount: 96.18, category: "Food", type: "expense" },
];

function cloneTransactions(transactions) {
  return transactions.map((transaction) => ({ ...transaction }));
}

function createDefaultGoals() {
  return {};
}

function createDefaultSettings() {
  return {
    notifications: true,
    weeklyDigest: true,
    spendingAlerts: true,
  };
}

function createDefaultProfile(name = "Demo User", email = "demo@pulseledger.app") {
  return {
    fullName: name,
    email,
    monthlyIncome: 0,
    occupation: "Independent professional",
    city: "Mumbai",
  };
}

function createUserProfile(name, email, transactions = initialTransactions) {
  return {
    id: `user-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    name,
    email,
    transactions: cloneTransactions(transactions),
    profile: createDefaultProfile(name, email),
    goals: createDefaultGoals(),
    settings: createDefaultSettings(),
    budgets: {},
    lastImportedIds: [],
    lastImportedFileName: "",
  };
}

const state = loadState();
state.chartFocus = {
  trendHoverIndex: null,
  trendPinnedIndex: null,
  categoryHoverIndex: null,
  categoryPinnedIndex: null,
};
state.authMode = "login";
state.pendingOtp = null;

const elements = {
  authScreen: document.querySelector("#authScreen"),
  dashboardApp: document.querySelector("#dashboardApp"),
  authCreateForm: document.querySelector("#authCreateForm"),
  authTitle: document.querySelector("#authTitle"),
  authSubtitle: document.querySelector("#authSubtitle"),
  authStatus: document.querySelector("#authStatus"),
  loginModeButton: document.querySelector("#loginModeButton"),
  signupModeButton: document.querySelector("#signupModeButton"),
  userNameInput: document.querySelector("#userNameInput"),
  userEmailInput: document.querySelector("#userEmailInput"),
  otpFieldGroup: document.querySelector("#otpFieldGroup"),
  otpInput: document.querySelector("#otpInput"),
  resendOtpButton: document.querySelector("#resendOtpButton"),
  addUserButton: document.querySelector("#addUserButton"),
  activeUserLabel: document.querySelector("#activeUserLabel"),
  activeUserEmail: document.querySelector("#activeUserEmail"),
  signOutButton: document.querySelector("#signOutButton"),
  appTabButtons: document.querySelectorAll("[data-app-tab]"),
  dashboardView: document.querySelector("#dashboardView"),
  goalsView: document.querySelector("#goalsView"),
  profileView: document.querySelector("#profileView"),
  settingsView: document.querySelector("#settingsView"),
  roleSelect: document.querySelector("#roleSelect"),
  currencySelect: document.querySelector("#currencySelect"),
  resetDataButton: document.querySelector("#resetDataButton"),
  summaryCards: document.querySelector("#summaryCards"),
  keyMetrics: document.querySelector("#keyMetrics"),
  summaryMonthLabel: document.querySelector("#summaryMonthLabel"),
  trendChart: document.querySelector("#trendChart"),
  categoryChart: document.querySelector("#categoryChart"),
  insightsList: document.querySelector("#insightsList"),
  toggleBudgetButton: document.querySelector("#toggleBudgetButton"),
  budgetForm: document.querySelector("#budgetForm"),
  budgetInputs: document.querySelector("#budgetInputs"),
  cancelBudgetButton: document.querySelector("#cancelBudgetButton"),
  budgetStatus: document.querySelector("#budgetStatus"),
  activityFeed: document.querySelector("#activityFeed"),
  activitySnapshot: document.querySelector("#activitySnapshot"),
  importFileInput: document.querySelector("#importFileInput"),
  importStatus: document.querySelector("#importStatus"),
  removeImportButton: document.querySelector("#removeImportButton"),
  toggleFormButton: document.querySelector("#toggleFormButton"),
  transactionForm: document.querySelector("#transactionForm"),
  cancelFormButton: document.querySelector("#cancelFormButton"),
  descriptionInput: document.querySelector("#descriptionInput"),
  dateInput: document.querySelector("#dateInput"),
  amountInput: document.querySelector("#amountInput"),
  categoryInput: document.querySelector("#categoryInput"),
  typeInput: document.querySelector("#typeInput"),
  searchInput: document.querySelector("#searchInput"),
  typeFilter: document.querySelector("#typeFilter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  sortSelect: document.querySelector("#sortSelect"),
  transactionsTable: document.querySelector("#transactionsTable"),
  roleNote: document.querySelector("#roleNote"),
  goalsGrid: document.querySelector("#goalsGrid"),
  goalsSummary: document.querySelector("#goalsSummary"),
  toggleGoalFormButton: document.querySelector("#toggleGoalFormButton"),
  goalForm: document.querySelector("#goalForm"),
  goalNameInput: document.querySelector("#goalNameInput"),
  goalCurrentInput: document.querySelector("#goalCurrentInput"),
  goalTargetInput: document.querySelector("#goalTargetInput"),
  cancelGoalButton: document.querySelector("#cancelGoalButton"),
  profileForm: document.querySelector("#profileForm"),
  profileNameInput: document.querySelector("#profileNameInput"),
  profileEmailInput: document.querySelector("#profileEmailInput"),
  profileIncomeInput: document.querySelector("#profileIncomeInput"),
  profileOccupationInput: document.querySelector("#profileOccupationInput"),
  profileCityInput: document.querySelector("#profileCityInput"),
  profileStatus: document.querySelector("#profileStatus"),
  settingsForm: document.querySelector("#settingsForm"),
  notificationsToggle: document.querySelector("#notificationsToggle"),
  weeklyDigestToggle: document.querySelector("#weeklyDigestToggle"),
  spendingAlertsToggle: document.querySelector("#spendingAlertsToggle"),
  settingsStatus: document.querySelector("#settingsStatus"),
  exportDataButton: document.querySelector("#exportDataButton"),
};

populateCategoryOptions();
attachEvents();
render();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {
      isAuthenticated: false,
      currentUserId: "demo-user",
      users: [
        {
          id: "demo-user",
          name: "Demo User",
          email: "demo@pulseledger.app",
          transactions: cloneTransactions(initialTransactions),
          profile: createDefaultProfile("Demo User", "demo@pulseledger.app"),
          goals: createDefaultGoals(),
          settings: createDefaultSettings(),
          budgets: {},
          lastImportedIds: [],
          lastImportedFileName: "",
        },
      ],
      activeTab: "dashboard",
      selectedRole: "viewer",
      selectedCurrency: "USD",
      formOpen: false,
      goalFormOpen: false,
      budgetFormOpen: false,
      editingId: null,
      filters: { search: "", type: "all", category: "all", sort: "date-desc" },
    };
  }

  try {
    const parsed = JSON.parse(saved);
    const migratedUsers = Array.isArray(parsed.users) && parsed.users.length
      ? parsed.users.map((user, index) => ({
          id: user.id || `user-${index + 1}`,
          name: user.name || `User ${index + 1}`,
          email: user.email || `user${index + 1}@pulseledger.app`,
          transactions: Array.isArray(user.transactions) ? user.transactions : cloneTransactions(initialTransactions),
          profile: sanitizeProfile(user.profile, user.name || `User ${index + 1}`, user.email || `user${index + 1}@pulseledger.app`),
          goals: sanitizeGoals(user.goals),
          settings: sanitizeUserSettings(user.settings),
          budgets: sanitizeBudgets(user.budgets),
          lastImportedIds: Array.isArray(user.lastImportedIds) ? user.lastImportedIds : [],
          lastImportedFileName: user.lastImportedFileName || "",
        }))
      : [
          {
            id: "demo-user",
            name: "Demo User",
            email: "demo@pulseledger.app",
            transactions: Array.isArray(parsed.transactions) && parsed.transactions.length ? parsed.transactions : cloneTransactions(initialTransactions),
            profile: sanitizeProfile(parsed.profile, "Demo User", "demo@pulseledger.app"),
            goals: sanitizeGoals(parsed.goals),
            settings: sanitizeUserSettings(parsed.settings),
            budgets: sanitizeBudgets(parsed.budgets),
            lastImportedIds: Array.isArray(parsed.lastImportedIds) ? parsed.lastImportedIds : [],
            lastImportedFileName: parsed.lastImportedFileName || "",
          },
        ];

    return {
      isAuthenticated: Boolean(parsed.isAuthenticated && migratedUsers.some((user) => user.id === parsed.currentUserId)),
      currentUserId: migratedUsers.some((user) => user.id === parsed.currentUserId) ? parsed.currentUserId : migratedUsers[0].id,
      users: migratedUsers,
      activeTab: ["dashboard", "goals", "profile", "settings"].includes(parsed.activeTab) ? parsed.activeTab : "dashboard",
      selectedRole: parsed.selectedRole || "viewer",
      selectedCurrency: currencyConfig[parsed.selectedCurrency] ? parsed.selectedCurrency : "USD",
      formOpen: false,
      goalFormOpen: false,
      budgetFormOpen: false,
      editingId: null,
      filters: {
        search: parsed.filters?.search || "",
        type: parsed.filters?.type || "all",
        category: parsed.filters?.category || "all",
        sort: parsed.filters?.sort || "date-desc",
      },
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      currentUserId: "demo-user",
      users: [
        {
          id: "demo-user",
          name: "Demo User",
          email: "demo@pulseledger.app",
          transactions: cloneTransactions(initialTransactions),
          profile: createDefaultProfile("Demo User", "demo@pulseledger.app"),
          goals: createDefaultGoals(),
          settings: createDefaultSettings(),
          budgets: {},
          lastImportedIds: [],
          lastImportedFileName: "",
        },
      ],
      activeTab: "dashboard",
      selectedRole: "viewer",
      selectedCurrency: "USD",
      formOpen: false,
      goalFormOpen: false,
      budgetFormOpen: false,
      editingId: null,
      filters: { search: "", type: "all", category: "all", sort: "date-desc" },
    };
  }
}

function persistState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      currentUserId: state.currentUserId,
      isAuthenticated: state.isAuthenticated,
      users: state.users,
      activeTab: state.activeTab,
      selectedRole: state.selectedRole,
      selectedCurrency: state.selectedCurrency,
      filters: state.filters,
    }),
  );
}

function getActiveUser() {
  return state.users.find((user) => user.id === state.currentUserId) || state.users[0];
}

function getActiveTransactions() {
  return getActiveUser().transactions;
}

function setActiveTransactions(transactions) {
  getActiveUser().transactions = transactions;
}

function getActiveBudgets() {
  return getActiveUser().budgets || {};
}

function setActiveBudgets(budgets) {
  getActiveUser().budgets = budgets;
}

function getActiveProfile() {
  return getActiveUser().profile || createDefaultProfile(getActiveUser().name, getActiveUser().email);
}

function getActiveGoals() {
  return getActiveUser().goals || createDefaultGoals();
}

function getActiveSettings() {
  return getActiveUser().settings || createDefaultSettings();
}

function getLastImportedIds() {
  return getActiveUser().lastImportedIds || [];
}

function getLastImportedFileName() {
  return getActiveUser().lastImportedFileName || "";
}

function setLastImportedBatch(ids, fileName) {
  const user = getActiveUser();
  user.lastImportedIds = ids;
  user.lastImportedFileName = fileName;
}

function clearLastImportedBatch() {
  const user = getActiveUser();
  user.lastImportedIds = [];
  user.lastImportedFileName = "";
}

function populateCategoryOptions() {
  const optionsMarkup = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");

  elements.categoryInput.innerHTML = optionsMarkup;
  elements.categoryFilter.innerHTML = [`<option value="all">All</option>`, optionsMarkup].join("");
}

function attachEvents() {
  elements.appTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.appTab;
      persistState();
      render();
    });
  });

  elements.loginModeButton.addEventListener("click", () => {
    state.authMode = "login";
    state.pendingOtp = null;
    elements.otpInput.value = "";
    setAuthStatus("", "");
    render();
  });

  elements.signupModeButton.addEventListener("click", () => {
    state.authMode = "signup";
    state.pendingOtp = null;
    elements.otpInput.value = "";
    setAuthStatus("", "");
    render();
  });

  elements.resendOtpButton.addEventListener("click", () => {
    const name = elements.userNameInput.value.trim();
    const email = elements.userEmailInput.value.trim().toLowerCase();
    if (!validateAuthFields(name, email)) return;

    const user = state.users.find((entry) => entry.email.toLowerCase() === email);
    if (user) {
      setAuthStatus("An account with that email already exists. Use Log in instead.", "error");
      return;
    }

    sendSignupOtp(name, email);
  });

  elements.authCreateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = elements.userNameInput.value.trim();
    const email = elements.userEmailInput.value.trim().toLowerCase();

    if (!validateAuthFields(name, email)) return;

    const user = state.users.find((entry) => entry.email.toLowerCase() === email);

    if (state.authMode === "login") {
      if (!user || user.name.toLowerCase() !== name.toLowerCase()) {
        setAuthStatus("Authentication failed. Check your username and email, or create a new account.", "error");
        return;
      }
    } else {
      if (user) {
        setAuthStatus("An account with that email already exists. Use Log in instead.", "error");
        return;
      }

      const enteredOtp = elements.otpInput.value.trim();
      const otpMatches =
        state.pendingOtp &&
        state.pendingOtp.name.toLowerCase() === name.toLowerCase() &&
        state.pendingOtp.email === email &&
        state.pendingOtp.code === enteredOtp;

      if (!otpMatches) {
        if (!state.pendingOtp || state.pendingOtp.email !== email || state.pendingOtp.name.toLowerCase() !== name.toLowerCase()) {
          sendSignupOtp(name, email);
          return;
        }

        setAuthStatus("Authentication failed. Enter the correct 6-digit OTP to create the account.", "error");
        return;
      }
    }

    const activeUser = state.authMode === "signup" ? createUserProfile(name, email, []) : user;

    if (state.authMode === "signup") {
      state.users.push(activeUser);
      state.pendingOtp = null;
    }

    state.currentUserId = activeUser.id;
    state.isAuthenticated = true;
    state.editingId = null;
    state.formOpen = false;
    state.budgetFormOpen = false;
    elements.userNameInput.value = "";
    elements.userEmailInput.value = "";
    elements.otpInput.value = "";
    persistState();
    render();
    setAuthStatus(
      state.authMode === "signup"
        ? `Account created for ${activeUser.name}.`
        : `Welcome back, ${activeUser.name}.`,
      "success",
    );
  });

  elements.signOutButton.addEventListener("click", () => {
    state.isAuthenticated = false;
    state.editingId = null;
    state.formOpen = false;
    state.budgetFormOpen = false;
    state.pendingOtp = null;
    state.activeTab = "dashboard";
    persistState();
    render();
    setAuthStatus("Signed out. Enter your details to continue.", "success");
  });

  elements.roleSelect.addEventListener("change", (event) => {
    state.selectedRole = event.target.value;

    if (state.selectedRole === "viewer") {
      closeForm();
      closeBudgetForm();
    }

    persistState();
    render();
  });

  elements.currencySelect.addEventListener("change", (event) => {
    state.selectedCurrency = event.target.value;
    persistState();
    render();
  });

  elements.resetDataButton.addEventListener("click", () => {
    setActiveTransactions(cloneTransactions(initialTransactions));
    state.filters = { search: "", type: "all", category: "all", sort: "date-desc" };
    state.selectedRole = "viewer";
    state.selectedCurrency = "USD";
    clearLastImportedBatch();
    closeForm();
    closeBudgetForm();
    persistState();
    render();
  });

  elements.importFileInput.addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;

    await importTransactionsFromFile(file);
    elements.importFileInput.value = "";
  });

  elements.removeImportButton.addEventListener("click", () => {
    removeImportedBatch();
  });

  elements.toggleFormButton.addEventListener("click", () => {
    if (state.selectedRole !== "admin") return;

    if (state.formOpen) {
      closeForm();
    } else {
      openForm();
    }

    render();
  });

  elements.cancelFormButton.addEventListener("click", () => {
    closeForm();
    render();
  });

  elements.toggleBudgetButton.addEventListener("click", () => {
    if (state.selectedRole !== "admin") return;

    if (state.budgetFormOpen) {
      closeBudgetForm();
    } else {
      openBudgetForm();
    }

    render();
  });

  elements.cancelBudgetButton.addEventListener("click", () => {
    closeBudgetForm();
    render();
  });

  elements.budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (state.selectedRole !== "admin") return;

    const nextBudgets = {};
    budgetCategories.forEach((category) => {
      const input = elements.budgetInputs.querySelector(`[data-budget-category="${category}"]`);
      const rawValue = input?.value.trim() || "";
      if (!rawValue) return;

      const amount = Number(rawValue);
      if (Number.isFinite(amount) && amount > 0) {
        nextBudgets[category] = convertToBaseCurrency(amount, state.selectedCurrency);
      }
    });

    setActiveBudgets(nextBudgets);
    closeBudgetForm();
    persistState();
    render();
    setImportStatus(
      Object.keys(nextBudgets).length
        ? "Budgets saved for the active user."
        : "All budgets were cleared for the active user.",
      "success",
    );
  });

  elements.transactionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (state.selectedRole !== "admin") return;

    const enteredAmount = Number(elements.amountInput.value);

    const payload = {
      id: state.editingId ?? Date.now(),
      description: elements.descriptionInput.value.trim(),
      date: elements.dateInput.value,
      amount: convertToBaseCurrency(enteredAmount, state.selectedCurrency),
      category: elements.categoryInput.value,
      type: elements.typeInput.value,
    };

    if (!payload.description || !payload.date || !Number.isFinite(payload.amount) || payload.amount <= 0) return;

    const transactions = getActiveTransactions();
    const index = transactions.findIndex((transaction) => transaction.id === state.editingId);

    if (index >= 0) {
      transactions[index] = payload;
    } else {
      setActiveTransactions([payload, ...transactions]);
    }

    closeForm();
    persistState();
    render();
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.filters.search = event.target.value;
    persistState();
    render();
  });

  elements.typeFilter.addEventListener("change", (event) => {
    state.filters.type = event.target.value;
    persistState();
    render();
  });

  elements.categoryFilter.addEventListener("change", (event) => {
    state.filters.category = event.target.value;
    persistState();
    render();
  });

  elements.sortSelect.addEventListener("change", (event) => {
    state.filters.sort = event.target.value;
    persistState();
    render();
  });

  elements.toggleGoalFormButton.addEventListener("click", () => {
    if (state.selectedRole !== "admin") return;
    state.goalFormOpen = !state.goalFormOpen;
    if (!state.goalFormOpen) {
      elements.goalForm.reset();
    }
    render();
  });

  elements.cancelGoalButton.addEventListener("click", () => {
    state.goalFormOpen = false;
    elements.goalForm.reset();
    render();
  });

  elements.goalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (state.selectedRole !== "admin") return;

    const label = elements.goalNameInput.value.trim();
    const current = Number(elements.goalCurrentInput.value || 0);
    const target = Number(elements.goalTargetInput.value || 0);

    if (!label || !Number.isFinite(current) || !Number.isFinite(target) || current < 0 || target <= 0) {
      return;
    }

    const goals = getActiveGoals();
    const goalId = `goal-${Date.now()}`;
    goals[goalId] = {
      label,
      current: convertToBaseCurrency(current, state.selectedCurrency),
      target: convertToBaseCurrency(target, state.selectedCurrency),
    };
    getActiveUser().goals = goals;
    state.goalFormOpen = false;
    elements.goalForm.reset();
    persistState();
    render();
  });

  elements.profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = getActiveProfile();
    profile.fullName = elements.profileNameInput.value.trim() || profile.fullName;
    profile.email = elements.profileEmailInput.value.trim().toLowerCase() || profile.email;
    profile.monthlyIncome = convertToBaseCurrency(Number(elements.profileIncomeInput.value || 0), state.selectedCurrency);
    profile.occupation = elements.profileOccupationInput.value.trim();
    profile.city = elements.profileCityInput.value.trim();

    const user = getActiveUser();
    user.name = profile.fullName;
    user.email = profile.email;
    user.profile = profile;

    persistState();
    render();
    setPanelStatus(elements.profileStatus, "Profile updated successfully.", "success");
  });

  elements.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const settings = getActiveSettings();
    settings.notifications = elements.notificationsToggle.checked;
    settings.weeklyDigest = elements.weeklyDigestToggle.checked;
    settings.spendingAlerts = elements.spendingAlertsToggle.checked;
    getActiveUser().settings = settings;

    persistState();
    render();
    setPanelStatus(elements.settingsStatus, "Settings saved.", "success");
  });

  elements.exportDataButton.addEventListener("click", () => {
    exportPdfReport();
  });
}

function render() {
  const activeUser = getActiveUser();
  const transactions = getActiveTransactions();

  elements.activeUserLabel.textContent = activeUser.name;
  elements.activeUserEmail.textContent = activeUser.email;
  renderAuthMode();
  renderAppShell();
  elements.authScreen.classList.toggle("hidden", state.isAuthenticated);
  elements.dashboardApp.classList.toggle("hidden", !state.isAuthenticated);
  elements.roleSelect.value = state.selectedRole;
  elements.currencySelect.value = state.selectedCurrency;
  elements.searchInput.value = state.filters.search;
  elements.typeFilter.value = state.filters.type;
  elements.categoryFilter.value = state.filters.category;
  elements.sortSelect.value = state.filters.sort;

  const filteredTransactions = getFilteredTransactions();
  const summary = getSummary(transactions);
  const monthlyLabel = getMonthlyLabel(transactions);

  elements.summaryMonthLabel.textContent = monthlyLabel;
  renderSummary(summary);
  renderMetrics(getKeyMetrics(transactions));
  renderTrendChart(getTrendData(transactions));
  renderCategoryChart(getCategoryTotals(transactions));
  renderInsights(getInsights(transactions));
  renderBudgetStatus(getBudgetStatus(transactions, getActiveBudgets()));
  renderActivityFeed(getRecentActivity(transactions));
  renderActivitySnapshot(transactions);
  renderGoals();
  renderProfile();
  renderSettings();
  renderRoleUI();
  renderTransactions(filteredTransactions);
}

function renderAuthMode() {
  const loginMode = state.authMode === "login";
  elements.loginModeButton.classList.toggle("is-active", loginMode);
  elements.signupModeButton.classList.toggle("is-active", !loginMode);
  elements.authTitle.textContent = loginMode ? "Log in to PulseLedger" : "Create your PulseLedger account";
  elements.authSubtitle.textContent = loginMode
    ? "Enter your username and email to open your personal finance workspace."
    : "New here? Create an account with your username and email, then verify the OTP to start your workspace.";
  elements.otpFieldGroup.classList.toggle("hidden", loginMode || !state.pendingOtp);
  elements.otpInput.required = !loginMode && Boolean(state.pendingOtp);
  elements.addUserButton.textContent = loginMode ? "Log in" : state.pendingOtp ? "Verify OTP" : "Send OTP";
}

function renderAppShell() {
  elements.appTabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.appTab === state.activeTab);
  });

  elements.dashboardView.classList.toggle("hidden", state.activeTab !== "dashboard");
  elements.goalsView.classList.toggle("hidden", state.activeTab !== "goals");
  elements.profileView.classList.toggle("hidden", state.activeTab !== "profile");
  elements.settingsView.classList.toggle("hidden", state.activeTab !== "settings");
}

function renderGoals() {
  const goals = Object.values(getActiveGoals());
  const adminMode = state.selectedRole === "admin";
  elements.goalForm.classList.toggle("hidden", !adminMode || !state.goalFormOpen);
  elements.toggleGoalFormButton.disabled = !adminMode;
  elements.toggleGoalFormButton.textContent = state.goalFormOpen ? "Hide form" : "Add goal";

  if (!goals.length) {
    elements.goalsSummary.innerHTML = renderEmptyState(
      "No goals set yet",
      adminMode
        ? "Add real financial goals before tracking progress here."
        : "Switch to admin mode when you want to create financial goals.",
    );
    elements.goalsGrid.innerHTML = renderEmptyState(
      "Goal tracker is empty",
      "This section will show real user-defined goals instead of demo values.",
    );
    return;
  }

  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);

  elements.goalsSummary.innerHTML = `
    <article class="metric-tile">
      <p>Total saved</p>
      <strong>${formatCurrency(totalCurrent)}</strong>
      <span>Across active savings goals.</span>
    </article>
    <article class="metric-tile">
      <p>Total target</p>
      <strong>${formatCurrency(totalTarget)}</strong>
      <span>Combined milestones you are tracking.</span>
    </article>
    <article class="metric-tile">
      <p>Progress</p>
      <strong>${totalTarget ? Math.round((totalCurrent / totalTarget) * 100) : 0}%</strong>
      <span>Portfolio completion across your goals.</span>
    </article>
  `;

  elements.goalsGrid.innerHTML = goals
    .map((goal, index) => {
      const progress = goal.target ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0;
      return `
        <article class="goal-card">
          <p>${goal.label}</p>
          <strong>${formatCurrency(goal.current)}</strong>
          <span>${formatCurrency(goal.target)} target</span>
          <div class="budget-track">
            <div class="budget-fill ${progress > 80 ? "healthy" : "watch"}" style="width:${progress}%"></div>
          </div>
          <small>${progress}% funded</small>
          <div class="row-actions">
            <button
              type="button"
              class="table-action danger-action"
              data-goal-index="${index}"
              ${adminMode ? "" : "disabled"}
            >
              Delete
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  elements.goalsGrid.querySelectorAll("[data-goal-index]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!adminMode) return;
      removeGoal(Number(button.dataset.goalIndex));
    });
  });
}

function renderProfile() {
  const profile = getActiveProfile();
  elements.profileNameInput.value = profile.fullName || "";
  elements.profileEmailInput.value = profile.email || "";
  elements.profileIncomeInput.value = profile.monthlyIncome ? formatBudgetInputValue(profile.monthlyIncome) : "";
  elements.profileOccupationInput.value = profile.occupation || "";
  elements.profileCityInput.value = profile.city || "";
}

function renderSettings() {
  const settings = getActiveSettings();
  elements.notificationsToggle.checked = Boolean(settings.notifications);
  elements.weeklyDigestToggle.checked = Boolean(settings.weeklyDigest);
  elements.spendingAlertsToggle.checked = Boolean(settings.spendingAlerts);
}

function exportPdfReport() {
  const user = getActiveUser();
  const transactions = getActiveTransactions();
  const summary = getSummary(transactions);
  const insights = getInsights(transactions);
  const budgets = getBudgetStatus(transactions, getActiveBudgets());
  const goals = Object.values(getActiveGoals());
  const recentTransactions = getFilteredTransactions().slice(0, 12);
  const profile = getActiveProfile();

  const reportWindow = window.open("", "_blank", "width=960,height=900");
  if (!reportWindow) {
    setPanelStatus(elements.settingsStatus, "Pop-up blocked. Allow pop-ups to export the PDF report.", "error");
    return;
  }

  const reportHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PulseLedger Report</title>
        <style>
          body {
            margin: 0;
            padding: 32px;
            font-family: "Helvetica Neue", Arial, sans-serif;
            color: #1e2523;
            background: #f7f1e7;
          }
          .report-shell {
            max-width: 980px;
            margin: 0 auto;
          }
          .report-hero {
            padding: 28px;
            border-radius: 24px;
            background: linear-gradient(135deg, #12302b, #1e5f52);
            color: #fffaf3;
            margin-bottom: 22px;
          }
          .report-hero h1 {
            margin: 0 0 10px;
            font-size: 36px;
          }
          .report-hero p {
            margin: 4px 0;
            color: rgba(255, 250, 243, 0.82);
          }
          .report-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin-bottom: 22px;
          }
          .card, .section {
            background: rgba(255, 255, 255, 0.88);
            border-radius: 20px;
            padding: 18px;
            box-shadow: 0 10px 24px rgba(79, 60, 41, 0.08);
          }
          .card p, .section p {
            margin: 0 0 8px;
            color: #61706b;
            font-size: 14px;
          }
          .card strong {
            font-size: 28px;
          }
          .section {
            margin-bottom: 18px;
          }
          .section h2 {
            margin: 0 0 14px;
            font-size: 22px;
          }
          .list, .table {
            width: 100%;
            border-collapse: collapse;
          }
          .list li {
            margin-bottom: 8px;
          }
          .table th, .table td {
            text-align: left;
            padding: 10px 0;
            border-bottom: 1px solid #e8e1d6;
            font-size: 14px;
          }
          .two-col {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }
          .muted {
            color: #61706b;
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .report-shell {
              max-width: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="report-shell">
          <section class="report-hero">
            <h1>PulseLedger Financial Report</h1>
            <p>${escapeHtml(user.name)} • ${escapeHtml(user.email)}</p>
            <p>Exported on ${escapeHtml(new Date().toLocaleString("en-IN"))}</p>
            <p>${escapeHtml(profile.occupation || "Profile")} • ${escapeHtml(profile.city || "No city added")}</p>
          </section>

          <section class="report-grid">
            <article class="card">
              <p>Total balance</p>
              <strong>${escapeHtml(formatCurrency(summary.balance))}</strong>
            </article>
            <article class="card">
              <p>Total income</p>
              <strong>${escapeHtml(formatCurrency(summary.income))}</strong>
            </article>
            <article class="card">
              <p>Total expenses</p>
              <strong>${escapeHtml(formatCurrency(summary.expenses))}</strong>
            </article>
          </section>

          <div class="two-col">
            <section class="section">
              <h2>Key insights</h2>
              <ul class="list">
                ${insights.map((item) => `<li><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.value)} <span class="muted">(${escapeHtml(item.detail)})</span></li>`).join("")}
              </ul>
            </section>
            <section class="section">
              <h2>Goals</h2>
              ${goals.length
                ? `<ul class="list">
                    ${goals.map((goal) => `<li><strong>${escapeHtml(goal.label)}:</strong> ${escapeHtml(formatCurrency(goal.current))} of ${escapeHtml(formatCurrency(goal.target))}</li>`).join("")}
                  </ul>`
                : `<p class="muted">No financial goals have been created yet.</p>`}
            </section>
          </div>

          <div class="two-col">
            <section class="section">
              <h2>Budget status</h2>
              ${budgets.length ? `
                <table class="table">
                  <thead>
                    <tr><th>Category</th><th>Spent</th><th>Budget</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    ${budgets.map((item) => `
                      <tr>
                        <td>${escapeHtml(item.category)}</td>
                        <td>${escapeHtml(formatCurrency(item.spent))}</td>
                        <td>${escapeHtml(formatCurrency(item.budget))}</td>
                        <td>${escapeHtml(item.status)}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              ` : `<p class="muted">No budgets set.</p>`}
            </section>
            <section class="section">
              <h2>Profile snapshot</h2>
              <table class="table">
                <tbody>
                  <tr><th>Full name</th><td>${escapeHtml(profile.fullName || user.name)}</td></tr>
                  <tr><th>Email</th><td>${escapeHtml(profile.email || user.email)}</td></tr>
                  <tr><th>Monthly income</th><td>${escapeHtml(formatCurrency(profile.monthlyIncome || 0))}</td></tr>
                  <tr><th>Occupation</th><td>${escapeHtml(profile.occupation || "-")}</td></tr>
                  <tr><th>City</th><td>${escapeHtml(profile.city || "-")}</td></tr>
                </tbody>
              </table>
            </section>
          </div>

          <section class="section">
            <h2>Recent transactions</h2>
            ${recentTransactions.length ? `
              <table class="table">
                <thead>
                  <tr><th>Description</th><th>Date</th><th>Category</th><th>Type</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  ${recentTransactions.map((item) => `
                    <tr>
                      <td>${escapeHtml(item.description)}</td>
                      <td>${escapeHtml(formatDate(item.date))}</td>
                      <td>${escapeHtml(item.category)}</td>
                      <td>${escapeHtml(capitalize(item.type))}</td>
                      <td>${escapeHtml(formatCurrency(item.amount))}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            ` : `<p class="muted">No transactions available.</p>`}
          </section>
        </div>
      </body>
    </html>
  `;

  reportWindow.document.open();
  reportWindow.document.write(reportHtml);
  reportWindow.document.close();
  reportWindow.focus();
  reportWindow.print();
  setPanelStatus(elements.settingsStatus, "PDF report opened. Save it as PDF from the print dialog.", "success");
}

function validateAuthFields(name, email) {
  if (!name || !email) {
    setAuthStatus("Enter both a username and email to continue.", "error");
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    setAuthStatus("Enter a valid email address to continue.", "error");
    return false;
  }

  return true;
}

function sendSignupOtp(name, email) {
  const code = generateOtp();
  state.pendingOtp = {
    name,
    email,
    code,
    createdAt: Date.now(),
  };
  elements.otpInput.value = "";
  render();
  setAuthStatus(`Demo OTP sent to ${email}. Use ${code} to verify this account.`, "success");
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function renderSummary(summary) {
  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(summary.balance),
      tone: "balance",
      helper: `${summary.transactionCount} transactions tracked`,
    },
    {
      label: "Income",
      value: formatCurrency(summary.income),
      tone: "income",
      helper: "Across salary, freelance, and other inflows",
    },
    {
      label: "Expenses",
      value: formatCurrency(summary.expenses),
      tone: "expense",
      helper: `${summary.expenseRatio}% of inflows used`,
    },
  ];

  elements.summaryCards.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card ${card.tone}">
          <p>${card.label}</p>
          <strong>${card.value}</strong>
          <span>${card.helper}</span>
        </article>
      `,
    )
    .join("");
}

function renderTrendChart(points) {
  if (!points.length) {
    elements.trendChart.innerHTML = renderEmptyState("No balance history yet", "Add a transaction to see the cash flow trend.");
    return;
  }

  const width = 680;
  const height = 260;
  const padding = 28;
  const values = points.map((point) => point.balance);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const coordinates = points.map((point, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(points.length - 1, 1);
    const y = height - padding - ((point.balance - min) / range) * (height - padding * 2);
    return { ...point, x, y };
  });
  const activeIndex = getActiveTrendIndex(points.length);
  const activePoint = coordinates[activeIndex];

  const linePath = coordinates.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${coordinates[coordinates.length - 1].x} ${height - padding} L ${coordinates[0].x} ${height - padding} Z`;

  elements.trendChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="svg-chart" role="img" aria-label="Balance trend chart">
      <defs>
        <linearGradient id="trendFill" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#11745f" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#11745f" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      ${[0, 1, 2, 3].map((step) => {
        const y = padding + ((height - padding * 2) / 3) * step;
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" class="grid-line" />`;
      }).join("")}
      <path d="${areaPath}" fill="url(#trendFill)"></path>
      <path d="${linePath}" class="trend-line"></path>
      <line x1="${activePoint.x}" y1="${padding}" x2="${activePoint.x}" y2="${height - padding}" class="trend-guide"></line>
      ${coordinates.map((point) => `
        <g>
          <circle
            cx="${point.x}"
            cy="${point.y}"
            r="${point.index === activeIndex ? 7 : 4}"
            class="trend-dot ${point.index === activeIndex ? "is-active" : ""}"
            data-trend-index="${point.index}"
          ></circle>
          <text
            x="${point.x}"
            y="${height - 10}"
            text-anchor="middle"
            class="axis-label ${point.index === activeIndex ? "is-active" : ""}"
          >${point.index === activeIndex || points.length <= 12 || point.index % Math.ceil(points.length / 6) === 0 ? point.label : ""}</text>
        </g>
      `).join("")}
    </svg>
    <div class="chart-caption">
      <strong>${formatCurrency(activePoint.balance)}</strong>
      <span>${activePoint.label} balance in ${state.selectedCurrency}. Click to lock this point.</span>
    </div>
  `;

  attachTrendChartInteractions(coordinates);
}

function renderMetrics(metrics) {
  elements.keyMetrics.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-tile">
          <p>${metric.label}</p>
          <strong>${metric.value}</strong>
          <span>${metric.detail}</span>
        </article>
      `,
    )
    .join("");
}

function renderCategoryChart(categoryTotals) {
  if (!categoryTotals.length) {
    elements.categoryChart.innerHTML = renderEmptyState("No expense categories yet", "Expense activity will appear here once transactions are added.");
    return;
  }

  const palette = ["#11745f", "#f08c4a", "#0f4c81", "#d65d45", "#ceb36c", "#3d6b52"];
  const total = categoryTotals.reduce((sum, item) => sum + item.amount, 0);
  const activeIndex = getActiveCategoryIndex(categoryTotals.length);
  const activeCategory = categoryTotals[activeIndex];
  const labelFontSize = getDonutLabelFontSize(activeCategory.category);
  let offset = 0;

  const segments = categoryTotals
    .map((item, index) => {
      const value = (item.amount / total) * 100;
      const segment = `
        <circle
          r="52"
          cx="80"
          cy="80"
          fill="transparent"
          stroke="${palette[index % palette.length]}"
          stroke-width="${index === activeIndex ? 24 : 20}"
          stroke-dasharray="${value} ${100 - value}"
          stroke-dashoffset="${-offset}"
          pathLength="100"
          class="donut-segment ${index === activeIndex ? "is-active" : ""}"
          data-category-index="${index}"
        />
      `;
      offset += value;
      return segment;
    })
    .join("");

  elements.categoryChart.innerHTML = `
    <div class="donut-layout">
      <svg viewBox="0 0 160 160" class="donut-chart" role="img" aria-label="Spending breakdown by category">
        <circle r="52" cx="80" cy="80" fill="transparent" stroke="rgba(255,255,255,0.08)" stroke-width="20" />
        <g transform="rotate(-90 80 80)">
          ${segments}
        </g>
        <text
          x="80"
          y="66"
          text-anchor="middle"
          textLength="66"
          lengthAdjust="spacingAndGlyphs"
          class="donut-total-label"
          style="font-size:${labelFontSize}px"
        >${activeCategory.category}</text>
        <text x="80" y="91" text-anchor="middle" class="donut-total-value">${formatCompactCurrency(activeCategory.amount)}</text>
        <text
          x="80"
          y="109"
          text-anchor="middle"
          textLength="58"
          lengthAdjust="spacingAndGlyphs"
          class="donut-share-label"
        >${Math.round((activeCategory.amount / total) * 100)}% of spending</text>
      </svg>
      <div class="legend-list">
        ${categoryTotals
          .map(
            (item, index) => `
              <div class="legend-row ${index === activeIndex ? "is-active" : ""}" data-category-index="${index}">
                <span class="legend-key">
                  <i style="background:${palette[index % palette.length]}"></i>${item.category}
                </span>
                <strong>${formatCurrency(item.amount)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;

  attachCategoryChartInteractions(categoryTotals.length);
}

function renderInsights(insights) {
  elements.insightsList.innerHTML = insights
    .map(
      (insight) => `
        <article class="insight-card">
          <p>${insight.title}</p>
          <strong>${insight.value}</strong>
          <span>${insight.detail}</span>
        </article>
      `,
    )
    .join("");
}

function renderBudgetStatus(items) {
  if (!items.length) {
    elements.budgetStatus.innerHTML = renderEmptyState(
      "No budgets set yet",
      state.selectedRole === "admin"
        ? "Use Set budgets to create category targets for this user."
        : "Switch to admin mode to create category budgets for this user.",
    );
    return;
  }

  elements.budgetStatus.innerHTML = items
    .map(
      (item) => `
        <article class="budget-item">
          <div class="budget-head">
            <div>
              <strong>${item.category}</strong>
              <span>${formatCurrency(item.spent)} of ${formatCurrency(item.budget)}</span>
            </div>
            <div class="budget-status ${item.statusTone}">${item.status}</div>
          </div>
          <div class="budget-track">
            <div class="budget-fill ${item.statusTone}" style="width:${Math.min(item.progress, 100)}%"></div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderActivityFeed(items) {
  if (!items.length) {
    elements.activityFeed.innerHTML = renderEmptyState("No recent activity", "Transactions will appear here as they are added.");
    elements.activitySnapshot.innerHTML = "";
    return;
  }

  elements.activityFeed.innerHTML = items
    .map(
      (item) => `
        <article class="activity-item">
          <div>
            <strong>${item.description}</strong>
            <span>${item.meta}</span>
          </div>
          <div class="${item.type === "income" ? "amount-positive" : "amount-negative"}">
            ${item.type === "income" ? "+" : "-"}${formatCurrency(item.amount)}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderActivitySnapshot(transactions) {
  if (!transactions.length) {
    elements.activitySnapshot.innerHTML = "";
    return;
  }

  const recent = [...transactions].sort((left, right) => new Date(right.date) - new Date(left.date)).slice(0, 10);
  const incomeCount = recent.filter((item) => item.type === "income").length;
  const expenseCount = recent.filter((item) => item.type === "expense").length;
  const totalFlow = recent.reduce((sum, item) => sum + item.amount, 0);
  const largest = [...recent].sort((left, right) => right.amount - left.amount)[0];
  const categoryCounts = recent.reduce((accumulator, item) => {
    accumulator[item.category] = (accumulator[item.category] || 0) + 1;
    return accumulator;
  }, {});
  const topCategory = Object.entries(categoryCounts).sort((left, right) => right[1] - left[1])[0];

  elements.activitySnapshot.innerHTML = `
    <div class="snapshot-card">
      <p class="snapshot-kicker">Live pulse</p>
      <strong>${recent.length}</strong>
      <span>Most recent transactions in focus</span>
    </div>
    <div class="snapshot-metrics">
      <article class="snapshot-tile">
        <p>Income entries</p>
        <strong>${incomeCount}</strong>
        <span>Credits in the latest batch</span>
      </article>
      <article class="snapshot-tile">
        <p>Expense entries</p>
        <strong>${expenseCount}</strong>
        <span>Debits in the latest batch</span>
      </article>
      <article class="snapshot-tile">
        <p>Flow volume</p>
        <strong>${formatCompactCurrency(totalFlow)}</strong>
        <span>Combined movement across recent activity</span>
      </article>
      <article class="snapshot-tile">
        <p>Largest movement</p>
        <strong>${largest ? formatCurrency(largest.amount) : "No data"}</strong>
        <span>${largest ? `${largest.description} on ${formatDate(largest.date)}` : "Waiting for new activity"}</span>
      </article>
    </div>
    <div class="snapshot-note">
      <strong>${topCategory ? topCategory[0] : "No category yet"}</strong>
      <span>${topCategory ? `Most frequent category in recent activity with ${topCategory[1]} entries.` : "Recent categories will appear here."}</span>
    </div>
  `;
}

function attachTrendChartInteractions(points) {
  const svg = elements.trendChart.querySelector(".svg-chart");
  if (!svg || !points.length) return;

  const updateHoverFromClientX = (clientX) => {
    const rect = svg.getBoundingClientRect();
    const viewBoxWidth = svg.viewBox.baseVal.width || rect.width || 1;
    const scaledX = ((clientX - rect.left) / Math.max(rect.width, 1)) * viewBoxWidth;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    points.forEach((point, index) => {
      const distance = Math.abs(point.x - scaledX);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (state.chartFocus.trendHoverIndex !== nearestIndex) {
      state.chartFocus.trendHoverIndex = nearestIndex;
      renderTrendChart(points);
    }
  };

  svg.addEventListener("mousemove", (event) => {
    updateHoverFromClientX(event.clientX);
  });

  svg.addEventListener("click", (event) => {
    updateHoverFromClientX(event.clientX);
    state.chartFocus.trendPinnedIndex = state.chartFocus.trendHoverIndex;
    renderTrendChart(points);
  });

  svg.addEventListener("mouseleave", () => {
    state.chartFocus.trendHoverIndex = null;
    renderTrendChart(points);
  });
}

function attachCategoryChartInteractions() {
  const interactiveNodes = elements.categoryChart.querySelectorAll("[data-category-index]");

  interactiveNodes.forEach((node) => {
    const index = Number(node.dataset.categoryIndex);

    node.addEventListener("mouseenter", () => {
      state.chartFocus.categoryHoverIndex = index;
      renderCategoryChart(getCategoryTotals(getActiveTransactions()));
    });

    node.addEventListener("mouseleave", () => {
      state.chartFocus.categoryHoverIndex = null;
      renderCategoryChart(getCategoryTotals(getActiveTransactions()));
    });

    node.addEventListener("click", () => {
      state.chartFocus.categoryPinnedIndex = index;
      renderCategoryChart(getCategoryTotals(getActiveTransactions()));
    });
  });
}

function renderRoleUI() {
  const activeUser = getActiveUser();
  const adminMode = state.selectedRole === "admin";
  elements.toggleFormButton.disabled = !adminMode;
  elements.toggleBudgetButton.disabled = !adminMode;
  elements.importFileInput.disabled = !adminMode;
  elements.removeImportButton.disabled = !adminMode || !getLastImportedIds().length;
  elements.toggleFormButton.textContent = state.editingId ? "Edit transaction" : "Add transaction";
  elements.toggleBudgetButton.textContent = state.budgetFormOpen ? "Hide budgets" : "Set budgets";
  elements.roleNote.textContent = adminMode
    ? `Admin mode is active for ${activeUser.name}. You can import, add, edit, or remove transactions. Display currency: ${state.selectedCurrency}.${getLastImportedFileName() ? ` Last imported file: ${getLastImportedFileName()}.` : ""}`
    : `Viewer mode is active for ${activeUser.name}. Data remains visible, but editing is disabled. Display currency: ${state.selectedCurrency}.`;

  elements.transactionForm.classList.toggle("hidden", !adminMode || !state.formOpen);
  elements.budgetForm.classList.toggle("hidden", !adminMode || !state.budgetFormOpen);
  elements.budgetInputs.innerHTML = budgetCategories
    .map((category) => `
      <label>
        <span>${category}</span>
        <input
          type="number"
          min="0"
          step="0.01"
          inputmode="decimal"
          data-budget-category="${category}"
          placeholder="No budget"
          value="${formatBudgetInputValue(getActiveBudgets()[category])}"
        />
      </label>
    `)
    .join("");

  elements.profileForm.querySelectorAll("input, button[type='submit']").forEach((element) => {
    element.disabled = !adminMode;
    if (element.tagName === "INPUT") {
      element.readOnly = !adminMode;
    }
  });

  elements.settingsForm.querySelectorAll("input, button[type='submit']").forEach((element) => {
    element.disabled = !adminMode;
  });

  elements.exportDataButton.disabled = false;
}

function renderTransactions(transactions) {
  if (!transactions.length) {
    elements.transactionsTable.innerHTML = renderEmptyState(
      "No matching transactions",
      "Try clearing filters or add a new record in admin mode.",
    );
    return;
  }

  elements.transactionsTable.innerHTML = `
    <div class="table-head">
      <span>Description</span>
      <span>Date</span>
      <span>Category</span>
      <span>Type</span>
      <span>Amount</span>
      <span>Action</span>
    </div>
    ${transactions
      .map(
        (transaction) => `
          <article class="table-row">
            <div>
              <strong>${transaction.description}</strong>
              <span>${transaction.type === "income" ? "Incoming cash" : "Outgoing payment"}</span>
            </div>
            <div>${formatDate(transaction.date)}</div>
            <div><span class="pill">${transaction.category}</span></div>
            <div class="${transaction.type}">${capitalize(transaction.type)}</div>
            <div class="${transaction.type === "income" ? "amount-positive" : "amount-negative"}">
              ${transaction.type === "income" ? "+" : "-"}${formatCurrency(transaction.amount)}
            </div>
            <div class="row-actions">
              <button
                type="button"
                class="table-action"
                data-action="edit"
                data-id="${transaction.id}"
                ${state.selectedRole !== "admin" ? "disabled" : ""}
              >
                Edit
              </button>
              <button
                type="button"
                class="table-action danger-action"
                data-action="delete"
                data-id="${transaction.id}"
                ${state.selectedRole !== "admin" ? "disabled" : ""}
              >
                Delete
              </button>
            </div>
          </article>
        `,
      )
      .join("")}
  `;

  elements.transactionsTable.querySelectorAll(".table-action").forEach((button) => {
    button.addEventListener("click", () => {
      const transactionId = Number(button.dataset.id);
      if (button.dataset.action === "delete") {
        removeTransaction(transactionId);
        return;
      }

      startEdit(transactionId);
    });
  });
}

function startEdit(transactionId) {
  if (state.selectedRole !== "admin") return;

  const transaction = getActiveTransactions().find((item) => item.id === transactionId);
  if (!transaction) return;

  state.editingId = transaction.id;
  state.formOpen = true;
  elements.descriptionInput.value = transaction.description;
  elements.dateInput.value = transaction.date;
  elements.amountInput.value = formatBudgetInputValue(transaction.amount);
  elements.categoryInput.value = transaction.category;
  elements.typeInput.value = transaction.type;
  render();
}

function openForm() {
  state.formOpen = true;
  state.editingId = null;
  elements.transactionForm.reset();
  elements.dateInput.value = new Date().toISOString().slice(0, 10);
  elements.categoryInput.value = "Food";
  elements.typeInput.value = "expense";
}

function closeForm() {
  state.formOpen = false;
  state.editingId = null;
  elements.transactionForm.reset();
}

function openBudgetForm() {
  state.budgetFormOpen = true;
}

function closeBudgetForm() {
  state.budgetFormOpen = false;
}

function removeGoal(goalIndex) {
  if (state.selectedRole !== "admin") return;

  const goalEntries = Object.entries(getActiveGoals());
  const goalEntry = goalEntries[goalIndex];
  if (!goalEntry) return;

  const [goalId, goal] = goalEntry;
  const confirmed = window.confirm(`Delete "${goal.label}"?`);
  if (!confirmed) return;

  const goals = { ...getActiveGoals() };
  delete goals[goalId];
  getActiveUser().goals = goals;
  persistState();
  render();
}

async function importTransactionsFromFile(file) {
  if (state.selectedRole !== "admin") {
    setImportStatus("Switch to admin mode to import transactions.", "error");
    return;
  }

  try {
    const text = await file.text();
    const rows = file.name.toLowerCase().endsWith(".json") ? parseJsonTransactions(text) : parseCsvTransactions(text);
    const normalized = rows.map(normalizeImportedTransaction).filter(Boolean);

    if (!normalized.length) {
      setImportStatus("No valid transactions were found in that file.", "error");
      return;
    }

    setLastImportedBatch(normalized.map((transaction) => transaction.id), file.name);
    setActiveTransactions([...normalized, ...getActiveTransactions()]);
    persistState();
    render();
    setImportStatus(`Imported ${normalized.length} transaction${normalized.length === 1 ? "" : "s"} from ${file.name}.`, "success");
  } catch (error) {
    setImportStatus(`Import failed: ${error.message}`, "error");
  }
}

function parseJsonTransactions(text) {
  const parsed = JSON.parse(text);
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed.transactions)) return parsed.transactions;
  throw new Error("JSON must be an array or contain a transactions array.");
}

function parseCsvTransactions(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) {
    throw new Error("CSV needs a header row and at least one transaction.");
  }

  const headers = splitCsvLine(lines[0]).map((header) => header.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    return headers.reduce((row, header, index) => {
      row[header] = values[index]?.trim() || "";
      return row;
    }, {});
  });
}

function splitCsvLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

function normalizeImportedTransaction(row) {
  const description = String(
    row.description || row.title || row.merchant || row.name || row.note || row.details || row.party || "",
  ).trim();
  const dateValue = String(row.date || row.transaction_date || row.created_at || row.time || "").trim();
  const rawAmountValue = Number.parseFloat(
    String(row.amount || row.amount_inr || row.value || row.total || row.money || row.debit || row.credit || "0").replace(/[^0-9.-]/g, ""),
  );
  const typeValue = String(row.type || row.transaction_type || row.kind || "").trim().toLowerCase();
  const categoryValue = String(row.category || row.group || row.label || inferCategory(description, typeValue)).trim();
  const normalizedDate = normalizeDate(dateValue);
  const sourceCurrency = inferSourceCurrency(row);
  const amountValue = convertToBaseCurrency(rawAmountValue, sourceCurrency);

  if (!description || !normalizedDate || Number.isNaN(amountValue) || amountValue === 0) {
    return null;
  }

  const normalizedType = typeValue === "income" || amountValue > 0 && /income|credit|received/.test(typeValue)
    ? "income"
    : typeValue === "expense" || /debit|spent|payment/.test(typeValue)
      ? "expense"
      : amountValue >= 0
        ? "expense"
        : "income";

  return {
    id: Date.now() + Math.floor(Math.random() * 100000),
    description,
    date: normalizedDate,
    amount: Math.abs(amountValue),
    category: categories.includes(categoryValue) ? categoryValue : "Other",
    type: normalizedType,
  };
}

function normalizeDate(value) {
  if (!value) return "";

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  const parts = value.split(/[/-]/).map((part) => part.trim());
  if (parts.length !== 3) return "";

  const [first, second, third] = parts;
  const yyyy = third.length === 4 ? third : first.length === 4 ? first : "";
  const mm = first.length === 4 ? second : second;
  const dd = first.length === 4 ? third : first;

  if (!yyyy) return "";
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

function inferSourceCurrency(row) {
  const explicitCurrency = String(row.currency || row.currency_code || "").trim().toUpperCase();
  if (currencyConfig[explicitCurrency]) return explicitCurrency;
  if (row.amount_inr) return "INR";
  return "USD";
}

function convertToBaseCurrency(value, sourceCurrency) {
  const config = currencyConfig[sourceCurrency] || currencyConfig.USD;
  return value / config.rate;
}

function inferCategory(description, typeValue) {
  const text = `${description} ${typeValue}`.toLowerCase();

  if (/salary|payroll|stipend/.test(text)) return "Salary";
  if (/freelance|client|retainer|consulting/.test(text)) return "Freelance";
  if (/zomato|swiggy|restaurant|cafe|coffee|canteen|food|grocery/.test(text)) return "Food";
  if (/uber|ola|metro|train|bus|transport|fuel|petrol/.test(text)) return "Transport";
  if (/rent|housing|apartment|landlord/.test(text)) return "Housing";
  if (/electric|water|utility|wifi|internet|recharge/.test(text)) return "Utilities";
  if (/pharmacy|hospital|clinic|health|medical/.test(text)) return "Health";
  if (/movie|netflix|spotify|entertainment|bookmyshow|game/.test(text)) return "Entertainment";
  if (/saving|investment|mutual|fund/.test(text)) return "Savings";

  return "Other";
}

function setImportStatus(message, tone) {
  if (!message) {
    elements.importStatus.textContent = "";
    elements.importStatus.className = "import-status hidden";
    return;
  }

  elements.importStatus.textContent = message;
  elements.importStatus.className = `import-status ${tone}`;
}

function setAuthStatus(message, tone) {
  if (!message) {
    elements.authStatus.textContent = "";
    elements.authStatus.className = "import-status hidden";
    return;
  }

  elements.authStatus.textContent = message;
  elements.authStatus.className = `import-status ${tone}`;
}

function setPanelStatus(element, message, tone) {
  if (!message) {
    element.textContent = "";
    element.className = "import-status hidden";
    return;
  }

  element.textContent = message;
  element.className = `import-status ${tone}`;
}

function removeImportedBatch() {
  if (state.selectedRole !== "admin" || !getLastImportedIds().length) {
    setImportStatus("There is no imported file batch to remove.", "error");
    return;
  }

  const fileName = getLastImportedFileName() || "the last imported file";
  const confirmed = window.confirm(`Remove all transactions imported from ${fileName}?`);
  if (!confirmed) return;

  const importedIdSet = new Set(getLastImportedIds());
  setActiveTransactions(getActiveTransactions().filter((transaction) => !importedIdSet.has(transaction.id)));

  if (state.editingId && importedIdSet.has(state.editingId)) {
    closeForm();
  }

  const removedCount = getLastImportedIds().length;
  clearLastImportedBatch();
  persistState();
  render();
  setImportStatus(`Removed ${removedCount} imported transaction${removedCount === 1 ? "" : "s"} from ${fileName}.`, "success");
}

function removeTransaction(transactionId) {
  if (state.selectedRole !== "admin") return;

  const transaction = getActiveTransactions().find((item) => item.id === transactionId);
  if (!transaction) return;

  const confirmed = window.confirm(`Delete "${transaction.description}" from ${formatDate(transaction.date)}?`);
  if (!confirmed) return;

  setActiveTransactions(getActiveTransactions().filter((item) => item.id !== transactionId));

  if (state.editingId === transactionId) {
    closeForm();
  }

  persistState();
  render();
}

function getFilteredTransactions() {
  const query = state.filters.search.trim().toLowerCase();

  return [...getActiveTransactions()]
    .filter((transaction) => {
      const matchesSearch =
        !query ||
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query);
      const matchesType = state.filters.type === "all" || transaction.type === state.filters.type;
      const matchesCategory = state.filters.category === "all" || transaction.category === state.filters.category;
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((left, right) => {
      switch (state.filters.sort) {
        case "date-asc":
          return new Date(left.date) - new Date(right.date);
        case "amount-desc":
          return right.amount - left.amount;
        case "amount-asc":
          return left.amount - right.amount;
        case "date-desc":
        default:
          return new Date(right.date) - new Date(left.date);
      }
    });
}

function getSummary(transactions) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
    transactionCount: transactions.length,
    expenseRatio: income ? Math.round((expenses / income) * 100) : 0,
  };
}

function getKeyMetrics(transactions) {
  const expenses = transactions.filter((transaction) => transaction.type === "expense");
  const incomes = transactions.filter((transaction) => transaction.type === "income");
  const summary = getSummary(transactions);
  const largestExpense = [...expenses].sort((left, right) => right.amount - left.amount)[0];
  const latestIncome = [...incomes].sort((left, right) => new Date(right.date) - new Date(left.date))[0];
  const avgExpense = expenses.length
    ? expenses.reduce((sum, transaction) => sum + transaction.amount, 0) / expenses.length
    : 0;
  const activeCategories = new Set(expenses.map((transaction) => transaction.category)).size;
  const savingsRate = summary.income ? Math.max(0, Math.round(((summary.income - summary.expenses) / summary.income) * 100)) : 0;

  return [
    {
      label: "Savings rate",
      value: `${savingsRate}%`,
      detail: "Share of income left after recorded expenses.",
    },
    {
      label: "Average expense",
      value: formatCurrency(avgExpense),
      detail: `${expenses.length} outgoing transactions in the current dataset.`,
    },
    {
      label: "Largest expense",
      value: largestExpense ? formatCurrency(largestExpense.amount) : "No data",
      detail: largestExpense ? `${largestExpense.category} is the biggest outflow.` : "Add more expense activity.",
    },
    {
      label: "Latest income",
      value: latestIncome ? formatCurrency(latestIncome.amount) : "No data",
      detail: latestIncome ? `${latestIncome.description} on ${formatDate(latestIncome.date)}.` : "Income activity will surface here.",
    },
    {
      label: "Active categories",
      value: String(activeCategories),
      detail: "Distinct expense categories currently in use.",
    },
  ];
}

function getTrendData(transactions) {
  const sorted = [...transactions].sort((left, right) => new Date(left.date) - new Date(right.date));
  let runningBalance = 0;

  return sorted.map((transaction, index) => {
    runningBalance += transaction.type === "income" ? transaction.amount : -transaction.amount;
    return {
      index,
      label: new Date(transaction.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      balance: runningBalance,
    };
  });
}

function getCategoryTotals(transactions) {
  const totals = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((accumulator, transaction) => {
      accumulator[transaction.category] = (accumulator[transaction.category] || 0) + transaction.amount;
      return accumulator;
    }, {});

  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((left, right) => right.amount - left.amount)
    .slice(0, 6);
}

function getInsights(transactions) {
  const summary = getSummary(transactions);
  const categoriesData = getCategoryTotals(transactions);
  const topCategory = categoriesData[0];
  const monthlyComparison = getMonthlyComparison(transactions);

  return [
    {
      title: "Highest spending category",
      value: topCategory ? topCategory.category : "No data",
      detail: topCategory ? `${formatCurrency(topCategory.amount)} spent here this period.` : "Add expenses to surface a top category.",
    },
    {
      title: "Monthly comparison",
      value: monthlyComparison.label,
      detail: monthlyComparison.detail,
    },
    {
      title: "Savings signal",
      value: `${Math.max(0, 100 - summary.expenseRatio)}% left after expenses`,
      detail: "A quick read on how much income remains once outflows are covered.",
    },
  ];
}

function getBudgetStatus(transactions, budgets) {
  const configuredBudgets = Object.entries(budgets || {}).filter(([, budget]) => Number.isFinite(budget) && budget > 0);
  if (!configuredBudgets.length) {
    return [];
  }

  const totals = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((accumulator, transaction) => {
      accumulator[transaction.category] = (accumulator[transaction.category] || 0) + transaction.amount;
      return accumulator;
    }, {});

  return configuredBudgets.map(([category, budget]) => {
    const spent = totals[category] || 0;
    const progress = budget ? Math.round((spent / budget) * 100) : 0;
    const remaining = budget - spent;
    const status = remaining >= 0 ? `${formatCurrency(remaining)} left` : `${formatCurrency(Math.abs(remaining))} over`;
    const statusTone = progress > 100 ? "over" : progress > 80 ? "watch" : "healthy";

    return {
      category,
      spent,
      budget,
      progress,
      status,
      statusTone,
    };
  });
}

function getRecentActivity(transactions) {
  return [...transactions]
    .sort((left, right) => new Date(right.date) - new Date(left.date))
    .slice(0, 6)
    .map((transaction) => ({
      ...transaction,
      meta: `${formatDate(transaction.date)} • ${transaction.category} • ${capitalize(transaction.type)}`,
    }));
}

function getMonthlyComparison(transactions) {
  const monthTotals = transactions.reduce((accumulator, transaction) => {
    const monthKey = transaction.date.slice(0, 7);
    if (!accumulator[monthKey]) {
      accumulator[monthKey] = { income: 0, expenses: 0 };
    }

    if (transaction.type === "income") {
      accumulator[monthKey].income += transaction.amount;
    } else {
      accumulator[monthKey].expenses += transaction.amount;
    }

    return accumulator;
  }, {});

  const months = Object.keys(monthTotals).sort();
  if (months.length < 2) {
    return {
      label: "Need more months",
      detail: "Add transactions across at least two months to compare spending trends.",
    };
  }

  const latestMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];
  const change = monthTotals[latestMonth].expenses - monthTotals[previousMonth].expenses;
  const direction = change <= 0 ? "lower" : "higher";

  return {
    label: `${formatCurrency(Math.abs(change))} ${direction}`,
    detail: `${formatMonthKey(latestMonth)} expenses versus ${formatMonthKey(previousMonth)}.`,
  };
}

function getMonthlyLabel(transactions) {
  if (!transactions.length) return "No data";

  const latest = [...transactions].sort((left, right) => new Date(right.date) - new Date(left.date))[0];
  return new Date(latest.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatCurrency(value) {
  const config = currencyConfig[state.selectedCurrency] || currencyConfig.USD;
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    maximumFractionDigits: 2,
  }).format(convertAmount(value));
}

function formatCompactCurrency(value) {
  const config = currencyConfig[state.selectedCurrency] || currencyConfig.USD;
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(convertAmount(value));
}

function convertAmount(value) {
  const config = currencyConfig[state.selectedCurrency] || currencyConfig.USD;
  return value * config.rate;
}

function getActiveTrendIndex(totalPoints) {
  if (!totalPoints) return 0;
  if (state.chartFocus.trendHoverIndex !== null && state.chartFocus.trendHoverIndex < totalPoints) {
    return state.chartFocus.trendHoverIndex;
  }
  if (state.chartFocus.trendPinnedIndex !== null && state.chartFocus.trendPinnedIndex < totalPoints) {
    return state.chartFocus.trendPinnedIndex;
  }
  return totalPoints - 1;
}

function getActiveCategoryIndex(totalCategories) {
  if (!totalCategories) return 0;
  if (state.chartFocus.categoryHoverIndex !== null && state.chartFocus.categoryHoverIndex < totalCategories) {
    return state.chartFocus.categoryHoverIndex;
  }
  if (state.chartFocus.categoryPinnedIndex !== null && state.chartFocus.categoryPinnedIndex < totalCategories) {
    return state.chartFocus.categoryPinnedIndex;
  }
  return 0;
}

function getDonutLabelFontSize(label) {
  const length = String(label || "").length;
  if (length >= 12) return 7;
  if (length >= 9) return 8.5;
  if (length >= 7) return 9.5;
  return 11;
}

function formatBudgetInputValue(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "";
  }

  return Number(convertAmount(value).toFixed(2)).toString();
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMonthKey(value) {
  return new Date(`${value}-01`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderEmptyState(title, detail) {
  return `
    <div class="empty-state">
      <strong>${title}</strong>
      <span>${detail}</span>
    </div>
  `;
}

function sanitizeBudgets(budgets) {
  if (!budgets || typeof budgets !== "object") {
    return {};
  }

  return budgetCategories.reduce((accumulator, category) => {
    const value = Number(budgets[category]);
    if (Number.isFinite(value) && value > 0) {
      accumulator[category] = value;
    }
    return accumulator;
  }, {});
}

function sanitizeProfile(profile, fallbackName, fallbackEmail) {
  const safeProfile = profile && typeof profile === "object" ? profile : {};
  return {
    fullName: safeProfile.fullName || fallbackName,
    email: safeProfile.email || fallbackEmail,
    monthlyIncome: Number.isFinite(Number(safeProfile.monthlyIncome)) ? Number(safeProfile.monthlyIncome) : 0,
    occupation: safeProfile.occupation || "Independent professional",
    city: safeProfile.city || "Mumbai",
  };
}

function sanitizeGoals(goals) {
  const safeGoals = goals && typeof goals === "object" ? goals : {};
  if (isLegacyDemoGoals(safeGoals) || isLegacyGoalLabelsOnly(safeGoals)) {
    return {};
  }

  return Object.entries(safeGoals).reduce((accumulator, [key, goal]) => {
    if (!goal || typeof goal !== "object") {
      return accumulator;
    }

    const current = Number(goal.current);
    const target = Number(goal.target);
    if (!goal.label || !Number.isFinite(current) || !Number.isFinite(target) || current < 0 || target <= 0) {
      return accumulator;
    }

    accumulator[key] = {
      label: goal.label,
      current,
      target,
    };
    return accumulator;
  }, {});
}

function isLegacyDemoGoals(goals) {
  const keys = Object.keys(goals || {}).sort();
  if (keys.length !== 3) {
    return false;
  }

  const legacy = {
    emergencyFund: { label: "Emergency fund", current: 1800, target: 5000 },
    gadgetUpgrade: { label: "Gadget upgrade", current: 1200, target: 1800 },
    travelFund: { label: "Travel fund", current: 650, target: 2200 },
  };

  return keys.every((key) => {
    const goal = goals[key];
    const oldGoal = legacy[key];
    return oldGoal
      && goal?.label === oldGoal.label
      && Number(goal?.current) === oldGoal.current
      && Number(goal?.target) === oldGoal.target;
  });
}

function isLegacyGoalLabelsOnly(goals) {
  const labels = Object.values(goals || {})
    .map((goal) => String(goal?.label || "").toLowerCase())
    .sort();

  return labels.length === 3
    && labels[0] === "emergency fund"
    && labels[1] === "gadget upgrade"
    && labels[2] === "travel fund";
}

function sanitizeUserSettings(settings) {
  const safeSettings = settings && typeof settings === "object" ? settings : {};
  const defaults = createDefaultSettings();

  return {
    notifications: typeof safeSettings.notifications === "boolean" ? safeSettings.notifications : defaults.notifications,
    weeklyDigest: typeof safeSettings.weeklyDigest === "boolean" ? safeSettings.weeklyDigest : defaults.weeklyDigest,
    spendingAlerts: typeof safeSettings.spendingAlerts === "boolean" ? safeSettings.spendingAlerts : defaults.spendingAlerts,
  };
}
