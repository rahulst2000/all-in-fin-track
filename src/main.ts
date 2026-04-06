import './style.css'

interface Transaction {
  id: number
  date: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
}

interface Filters {
  category: string
  type: string
  searchTerm: string
}

interface DashboardState {
  role: 'Viewer' | 'Admin'
  transactions: Transaction[]
  filters: Filters
  trendView: 'monthly' | 'quarterly' | 'yearly'
  authModalOpen: boolean
  addModalOpen: boolean
  loginError: string
}

const transactions: Transaction[] = [
  { id: 1, date: '2024-01-15', description: 'Salary', amount: 5000, category: 'Income', type: 'income' },
  { id: 2, date: '2024-01-16', description: 'Groceries', amount: 120, category: 'Food', type: 'expense' },
  { id: 3, date: '2024-01-18', description: 'Netflix Subscription', amount: 15, category: 'Entertainment', type: 'expense' },
  { id: 4, date: '2024-01-21', description: 'Electricity Bill', amount: 95, category: 'Utilities', type: 'expense' },
  { id: 5, date: '2024-01-23', description: 'Bonus', amount: 1000, category: 'Income', type: 'income' },
  { id: 6, date: '2024-02-03', description: 'Clothing', amount: 1200, category: 'Shopping', type: 'expense' },
  { id: 7, date: '2024-02-05', description: 'Consulting Project', amount: 3500, category: 'Income', type: 'income' },
  { id: 8, date: '2024-02-18', description: 'Fuel', amount: 75, category: 'Transportation', type: 'expense' },
  { id: 9, date: '2024-03-08', description: 'Insurance Premium', amount: 2000, category: 'Utilities', type: 'expense' },
  { id: 10, date: '2024-03-15', description: 'Project Completion', amount: 2800, category: 'Income', type: 'income' },
  { id: 11, date: '2024-03-22', description: 'Medical Checkup', amount: 1200, category: 'Health', type: 'expense' },
  { id: 12, date: '2024-04-02', description: 'Freelance Project', amount: 2000, category: 'Income', type: 'income' },
  { id: 13, date: '2024-04-02', description: 'Computer Equipment', amount: 5000, category: 'Shopping', type: 'expense' },
  { id: 14, date: '2024-04-04', description: 'Quarterly Bonus', amount: 3000, category: 'Income', type: 'income' },
  { id: 15, date: '2024-04-05', description: 'Healthcare Subscription', amount: 500, category: 'Health', type: 'expense' },
  { id: 16, date: '2024-04-08', description: 'Side Project Payment', amount: 2200, category: 'Income', type: 'income' },
  { id: 17, date: '2024-04-09', description: 'Car Maintenance', amount: 2500, category: 'Transportation', type: 'expense' },
  { id: 18, date: '2024-04-10', description: 'Investment Returns', amount: 1250, category: 'Income', type: 'income' },
  { id: 19, date: '2024-04-11', description: 'Gaming Subscription', amount: 199, category: 'Entertainment', type: 'expense' },
  { id: 20, date: '2024-04-11', description: 'Project Delivery Income', amount: 3400, category: 'Income', type: 'income' },
]

let state: DashboardState = {
  role: 'Viewer',
  transactions: [...transactions],
  filters: {
    category: '',
    type: '',
    searchTerm: '',
  },
  trendView: 'monthly',
  authModalOpen: false,
  addModalOpen: false,
  loginError: '',
}

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function totalIncome(): number {
  return state.transactions
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0)
}

function totalExpenses(): number {
  return state.transactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0)
}

function balance(): number {
  return totalIncome() - totalExpenses()
}

function savingsRate(): number {
  const income = totalIncome()
  if (!income) return 0
  return Math.round((balance() / income) * 100)
}

function filteredTransactions(): Transaction[] {
  return [...state.transactions]
    .filter((item) => {
      if (state.filters.category && item.category !== state.filters.category) return false
      if (state.filters.type && item.type !== state.filters.type) return false
      if (state.filters.searchTerm) {
        const search = state.filters.searchTerm.toLowerCase()
        const matches =
          item.description.toLowerCase().includes(search) ||
          item.category.toLowerCase().includes(search)
        if (!matches) return false
      }
      return true
    })
    .sort((first, second) => {
      return new Date(second.date).getTime() - new Date(first.date).getTime()
    })
}

function categorySummary(): { category: string; amount: number; share: number }[] {
  const expenses = state.transactions.filter((item) => item.type === 'expense')
  const total = totalExpenses()
  const map = new Map<string, number>()

  expenses.forEach((item) => {
    map.set(item.category, (map.get(item.category) || 0) + item.amount)
  })

  return [...map.entries()]
    .map(([category, amount]) => ({
      category,
      amount,
      share: total ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((first, second) => second.amount - first.amount)
}

function topCategory(): { category: string; amount: number } {
  const item = categorySummary()[0]
  return item || { category: 'No data yet', amount: 0 }
}

function averageExpense(): number {
  const expenses = state.transactions.filter((item) => item.type === 'expense')
  if (!expenses.length) return 0
  return Math.round(totalExpenses() / expenses.length)
}

function healthMessage(): { title: string; detail: string; tone: string } {
  const rate = savingsRate()

  if (rate >= 40) {
    return {
      title: 'Healthy cash position',
      detail: 'Income is comfortably covering expenses. This is a good time to save more or invest.',
      tone: 'good',
    }
  }

  if (rate >= 15) {
    return {
      title: 'Stable but needs watching',
      detail: 'The budget is positive, but spending is getting closer to income than ideal.',
      tone: 'warn',
    }
  }

  return {
    title: 'Needs attention',
    detail: 'Expenses are taking most of the income. Start by reviewing the biggest spending category.',
    tone: 'danger',
  }
}

function categories(): string[] {
  return [...new Set(state.transactions.map((item) => item.category))].sort()
}

function trendData(): { label: string; income: number; expense: number }[] {
  if (state.trendView === 'yearly') {
    const byYear = new Map<string, { income: number; expense: number }>()

    state.transactions.forEach((item) => {
      const year = new Date(item.date).getFullYear().toString()
      const current = byYear.get(year) || { income: 0, expense: 0 }
      current[item.type] += item.amount
      byYear.set(year, current)
    })

    return [...byYear.entries()].map(([label, values]) => ({
      label,
      income: values.income,
      expense: values.expense,
    }))
  }

  const today = new Date()
  const count = state.trendView === 'monthly' ? 6 : 4
  const items: { label: string; income: number; expense: number }[] = []

  for (let index = count - 1; index >= 0; index -= 1) {
    let start: Date
    let end: Date
    let label: string

    if (state.trendView === 'monthly') {
      start = new Date(today.getFullYear(), today.getMonth() - index, 1)
      end = new Date(start.getFullYear(), start.getMonth() + 1, 1)
      label = start.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })
    } else {
      const quarterIndex = Math.floor(today.getMonth() / 3) - index
      const year = today.getFullYear() + Math.floor(quarterIndex / 4)
      const quarter = ((quarterIndex % 4) + 4) % 4
      start = new Date(year, quarter * 3, 1)
      end = new Date(year, quarter * 3 + 3, 1)
      label = `Q${quarter + 1} ${String(year).slice(-2)}`
    }

    const totals = state.transactions.reduce(
      (summary, item) => {
        const date = new Date(item.date)
        if (date >= start && date < end) {
          summary[item.type] += item.amount
        }
        return summary
      },
      { income: 0, expense: 0 },
    )

    items.push({
      label,
      income: totals.income,
      expense: totals.expense,
    })
  }

  return items
}

function heroSection(): string {
  const health = healthMessage()

  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Smart finance overview</p>
        <h1>See your money clearly and manage it with less confusion.</h1>
        <p class="hero-text">
          Check your balance, track spending, review payments, and move into admin mode only after secure sign in.
        </p>
        <div class="hero-actions">
          <label class="select-card">
            <span>Access mode</span>
            <select id="roleSelect">
              <option value="Viewer" ${state.role === 'Viewer' ? 'selected' : ''}>View only</option>
              <option value="Admin" ${state.role === 'Admin' ? 'selected' : ''}>Admin access</option>
            </select>
          </label>
          ${
            state.role === 'Admin'
              ? '<button id="addTransactionBtn" class="btn btn-primary" type="button">Add payment record</button>'
              : '<button class="btn btn-secondary" type="button" disabled>Admin sign in required</button>'
          }
        </div>
      </div>
      <div class="hero-panel">
        <span class="status-pill status-pill--${health.tone}">${health.title}</span>
        <strong>${formatCurrency(balance())}</strong>
        <p>${health.detail}</p>
        <div class="hero-mini-stats">
          <div>
            <span>Saving rate</span>
            <strong>${savingsRate()}%</strong>
          </div>
          <div>
            <span>Highest spend</span>
            <strong>${topCategory().category}</strong>
          </div>
        </div>
      </div>
    </section>
  `
}

function overviewSection(): string {
  const cards = [
    {
      title: 'Net balance',
      value: formatCurrency(balance()),
      note: balance() >= 0 ? 'Money in is higher than money out.' : 'Money out is higher than money in.',
    },
    {
      title: 'Money received',
      value: formatCurrency(totalIncome()),
      note: `${state.transactions.filter((item) => item.type === 'income').length} payments received`,
    },
    {
      title: 'Money spent',
      value: formatCurrency(totalExpenses()),
      note: `${state.transactions.filter((item) => item.type === 'expense').length} outgoing payments`,
    },
    {
      title: 'Average spending',
      value: formatCurrency(averageExpense()),
      note: 'Shows the normal size of your spending.',
    },
  ]

  return `
    <section class="overview-grid">
      ${cards
        .map(
          (card) => `
            <article class="stat-card">
              <span>${card.title}</span>
              <strong>${card.value}</strong>
              <p>${card.note}</p>
            </article>
          `,
        )
        .join('')}
    </section>
  `
}

function trendSection(): string {
  const data = trendData()
  const max = Math.max(...data.map((item) => Math.max(item.income, item.expense)), 1)

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="section-tag">Money trend</p>
          <h2>Money in and money out</h2>
        </div>
        <div class="segmented">
          <button class="segment ${state.trendView === 'monthly' ? 'active' : ''}" data-trend="monthly">6 months</button>
          <button class="segment ${state.trendView === 'quarterly' ? 'active' : ''}" data-trend="quarterly">Quarters</button>
          <button class="segment ${state.trendView === 'yearly' ? 'active' : ''}" data-trend="yearly">Years</button>
        </div>
      </div>
      <div class="trend-list">
        ${data
          .map(
            (item) => `
              <div class="trend-row">
                <div class="trend-copy">
                  <strong>${item.label}</strong>
                  <span>${formatCurrency(item.income - item.expense)} left after spending</span>
                </div>
                <div class="trend-bars">
                  <div class="bar-track"><div class="bar-fill bar-fill--income" style="width:${(item.income / max) * 100}%"></div></div>
                  <div class="bar-track"><div class="bar-fill bar-fill--expense" style="width:${(item.expense / max) * 100}%"></div></div>
                </div>
                <div class="trend-values">
                  <span>Received ${formatCurrency(item.income)}</span>
                  <span>Spent ${formatCurrency(item.expense)}</span>
                </div>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  `
}

function categorySection(): string {
  const items = categorySummary().slice(0, 5)
  const max = Math.max(...items.map((item) => item.amount), 1)

  return `
    <section class="panel">
      <div class="panel-head compact">
        <div>
          <p class="section-tag">Spending groups</p>
          <h2>Where your money goes</h2>
        </div>
      </div>
      <div class="category-list">
        ${items
          .map(
            (item) => `
              <div class="category-row">
                <div class="category-copy">
                  <strong>${item.category}</strong>
                  <span>${item.share}% of total spending</span>
                </div>
                <div class="category-bar">
                  <div class="category-bar-fill" style="width:${(item.amount / max) * 100}%"></div>
                </div>
                <strong>${formatCurrency(item.amount)}</strong>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  `
}

function serviceSection(): string {
  return `
    <section class="panel service-panel">
      <div class="panel-head compact">
        <div>
          <p class="section-tag">Quick summary</p>
          <h2>Important things to notice</h2>
        </div>
      </div>
      <div class="service-list">
        <article>
          <strong>Clear first view</strong>
          <p>The main numbers are now larger and easier to read.</p>
        </article>
        <article>
          <strong>Better control</strong>
          <p>You can quickly see the biggest spending area and overall balance.</p>
        </article>
        <article>
          <strong>Safer admin access</strong>
          <p>Admin tools open only after username and password are entered correctly.</p>
        </article>
      </div>
    </section>
  `
}

function transactionsSection(): string {
  const items = filteredTransactions()

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="section-tag">Payment history</p>
          <h2>Recent transactions</h2>
        </div>
        <button id="resetFiltersBtn" class="btn btn-ghost" type="button">Reset filters</button>
      </div>
      <div class="filters">
        <label class="field">
          <span>Search</span>
          <input id="searchInput" type="text" placeholder="Search name or category" value="${state.filters.searchTerm}" />
        </label>
        <label class="field">
          <span>Group</span>
          <select id="categoryFilter">
            <option value="">All groups</option>
            ${categories()
              .map((item) => `<option value="${item}" ${state.filters.category === item ? 'selected' : ''}>${item}</option>`)
              .join('')}
          </select>
        </label>
        <label class="field">
          <span>Payment type</span>
          <select id="typeFilter">
            <option value="">All payments</option>
            <option value="income" ${state.filters.type === 'income' ? 'selected' : ''}>Money received</option>
            <option value="expense" ${state.filters.type === 'expense' ? 'selected' : ''}>Money spent</option>
          </select>
        </label>
      </div>
      <div class="transaction-list">
        ${
          items.length
            ? items
                .map(
                  (item) => `
                    <article class="transaction-card">
                      <div class="transaction-main">
                        <div class="transaction-mark transaction-mark--${item.type}">${item.type === 'income' ? 'IN' : 'OUT'}</div>
                        <div>
                          <h3>${item.description}</h3>
                          <p>${item.category} • ${formatDate(item.date)}</p>
                        </div>
                      </div>
                      <div class="transaction-side">
                        <strong class="amount amount--${item.type}">${item.type === 'income' ? '+' : '-'}${formatCurrency(Math.abs(item.amount))}</strong>
                        <span class="chip chip--${item.type}">${item.type === 'income' ? 'Money received' : 'Money spent'}</span>
                        ${
                          state.role === 'Admin'
                            ? `<button class="btn btn-inline btn-delete" type="button" data-id="${item.id}">Delete</button>`
                            : ''
                        }
                      </div>
                    </article>
                  `,
                )
                .join('')
            : '<div class="empty-state">No matching transactions found.</div>'
        }
      </div>
    </section>
  `
}

function modalSection(): string {
  return `
    <div id="addTransactionModal" class="modal ${state.addModalOpen ? 'active' : ''}" aria-hidden="${state.addModalOpen ? 'false' : 'true'}">
      <div class="modal-card">
        <div class="panel-head">
          <div>
            <p class="section-tag">Admin action</p>
            <h2>Add a new payment</h2>
          </div>
          <button id="closeModalBtn" class="btn btn-inline" type="button">Close</button>
        </div>
        <form id="transactionForm" class="modal-form">
          <label class="field">
            <span>Date</span>
            <input id="date" type="date" required />
          </label>
          <label class="field">
            <span>Description</span>
            <input id="description" type="text" placeholder="Example: Salary credit" required />
          </label>
          <label class="field">
            <span>Category</span>
            <select id="category" required>
              <option value="">Select category</option>
              ${categories().map((item) => `<option value="${item}">${item}</option>`).join('')}
            </select>
          </label>
          <label class="field">
            <span>Type</span>
            <select id="type" required>
              <option value="income">Money received</option>
              <option value="expense">Money spent</option>
            </select>
          </label>
          <label class="field">
            <span>Amount</span>
            <input id="amount" type="number" min="0" step="0.01" placeholder="0.00" required />
          </label>
          <div class="modal-actions">
            <button id="cancelBtn" class="btn btn-secondary" type="button">Cancel</button>
            <button class="btn btn-primary" type="submit">Save payment</button>
          </div>
        </form>
      </div>
    </div>
  `
}

function authModalSection(): string {
  return `
    <div id="adminAuthModal" class="modal auth-modal ${state.authModalOpen ? 'active' : ''}" aria-hidden="${state.authModalOpen ? 'false' : 'true'}">
      <div class="modal-card auth-card">
        <div class="panel-head">
          <div>
            <p class="section-tag">Admin sign in</p>
            <h2>Enter username and password</h2>
          </div>
          <button id="closeAuthModalBtn" class="btn btn-inline" type="button">Cancel</button>
        </div>
        <p class="auth-text">Use username <strong>admin</strong> and password <strong>admin123</strong> to open admin access.</p>
        ${state.loginError ? `<div class="auth-error">${state.loginError}</div>` : ''}
        <form id="authForm" class="modal-form">
          <label class="field">
            <span>User name</span>
            <input id="adminUsername" type="text" placeholder="Enter user name" required />
          </label>
          <label class="field">
            <span>Password</span>
            <input id="adminPassword" type="password" placeholder="Enter password" required />
          </label>
          <div class="modal-actions">
            <button id="authCancelBtn" class="btn btn-secondary" type="button">Back</button>
            <button class="btn btn-primary" type="submit">Sign in as admin</button>
          </div>
        </form>
      </div>
    </div>
  `
}

function appTemplate(): string {
  return `
    <div class="page">
      <div class="glow glow-left"></div>
      <div class="glow glow-right"></div>
      ${heroSection()}
      ${overviewSection()}
      <div class="layout">
      <div class="main-column">
          ${trendSection()}
          ${transactionsSection()}
        </div>
        <div class="side-column">
          ${categorySection()}
          ${serviceSection()}
        </div>
      </div>
      ${state.role === 'Admin' ? modalSection() : ''}
      ${authModalSection()}
    </div>
  `
}

function setupEvents(): void {
  const roleSelect = document.getElementById('roleSelect') as HTMLSelectElement | null
  roleSelect?.addEventListener('change', (event) => {
    const selectedRole = (event.target as HTMLSelectElement).value as DashboardState['role']
    if (selectedRole === 'Admin' && state.role !== 'Admin') {
      state.authModalOpen = true
      state.loginError = ''
      render()
      return
    }

    state.role = selectedRole
    if (selectedRole === 'Viewer') {
      state.addModalOpen = false
    }
    render()
  })

  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null
  searchInput?.addEventListener('input', (event) => {
    state.filters.searchTerm = (event.target as HTMLInputElement).value
    render()
  })

  const categoryFilter = document.getElementById('categoryFilter') as HTMLSelectElement | null
  categoryFilter?.addEventListener('change', (event) => {
    state.filters.category = (event.target as HTMLSelectElement).value
    render()
  })

  const typeFilter = document.getElementById('typeFilter') as HTMLSelectElement | null
  typeFilter?.addEventListener('change', (event) => {
    state.filters.type = (event.target as HTMLSelectElement).value
    render()
  })

  const clearFilters = document.getElementById('resetFiltersBtn')
  clearFilters?.addEventListener('click', () => {
    state.filters = { category: '', type: '', searchTerm: '' }
    render()
  })

  document.querySelectorAll<HTMLElement>('[data-trend]').forEach((button) => {
    button.addEventListener('click', () => {
      state.trendView = button.dataset.trend as DashboardState['trendView']
      render()
    })
  })

  document.querySelectorAll<HTMLElement>('.btn-delete').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id)
      state.transactions = state.transactions.filter((item) => item.id !== id)
      render()
    })
  })

  const authModal = document.getElementById('adminAuthModal') as HTMLDivElement | null
  const authForm = document.getElementById('authForm') as HTMLFormElement | null
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn')
  const authCancelBtn = document.getElementById('authCancelBtn')

  const closeAuthModal = () => {
    state.authModalOpen = false
    state.loginError = ''
    state.role = 'Viewer'
    render()
  }

  closeAuthModalBtn?.addEventListener('click', closeAuthModal)
  authCancelBtn?.addEventListener('click', closeAuthModal)
  authModal?.addEventListener('click', (event) => {
    if (event.target === authModal) closeAuthModal()
  })

  authForm?.addEventListener('submit', (event) => {
    event.preventDefault()

    const username = (document.getElementById('adminUsername') as HTMLInputElement).value.trim()
    const password = (document.getElementById('adminPassword') as HTMLInputElement).value

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      state.role = 'Admin'
      state.authModalOpen = false
      state.loginError = ''
      render()
      return
    }

    state.loginError = 'Wrong user name or password.'
    render()
  })

  if (state.role !== 'Admin') return

  const modal = document.getElementById('addTransactionModal') as HTMLDivElement | null
  const openButton = document.getElementById('addTransactionBtn')
  const closeButton = document.getElementById('closeModalBtn')
  const cancelButton = document.getElementById('cancelBtn')
  const form = document.getElementById('transactionForm') as HTMLFormElement | null

  const closeModal = () => {
    state.addModalOpen = false
    modal?.classList.remove('active')
    modal?.setAttribute('aria-hidden', 'true')
  }

  openButton?.addEventListener('click', () => {
    state.addModalOpen = true
    modal?.classList.add('active')
    modal?.setAttribute('aria-hidden', 'false')
    const dateInput = document.getElementById('date') as HTMLInputElement | null
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0]
    }
  })

  closeButton?.addEventListener('click', closeModal)
  cancelButton?.addEventListener('click', closeModal)
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal()
  })

  form?.addEventListener('submit', (event) => {
    event.preventDefault()

    const date = (document.getElementById('date') as HTMLInputElement).value
    const description = (document.getElementById('description') as HTMLInputElement).value.trim()
    const category = (document.getElementById('category') as HTMLSelectElement).value
    const type = (document.getElementById('type') as HTMLSelectElement).value as Transaction['type']
    const amount = Number((document.getElementById('amount') as HTMLInputElement).value)

    if (!date || !description || !category || !amount) return

    state.transactions = [
      {
        id: Math.max(0, ...state.transactions.map((item) => item.id)) + 1,
        date,
        description,
        amount,
        category,
        type,
      },
      ...state.transactions,
    ]

    closeModal()
    form.reset()
    render()
  })
}

function render(): void {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  app.innerHTML = appTemplate()
  setupEvents()
}

render()
