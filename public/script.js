// Estado da aplicação
let currentTransactionType = '';
let editingTransactionId = null;
let categories = [];
let transactions = [];
let investments = [];
let investmentTypes = [];
let userProfile = {};
let editingInvestmentId = null;

// Elementos DOM
const addIncomeBtn = document.getElementById('add-income-btn');
const addExpenseBtn = document.getElementById('add-expense-btn');
const manageBudgetsBtn = document.getElementById('manage-budgets-btn');
const investmentsBtn = document.getElementById('investments-btn');
const transactionModal = document.getElementById('transaction-modal');
const budgetModal = document.getElementById('budget-modal');
const investmentModal = document.getElementById('investment-modal');
const profileModal = document.getElementById('profile-modal');
const recommendationsModal = document.getElementById('recommendations-modal');
const customTypeModal = document.getElementById('custom-type-modal');
const transactionForm = document.getElementById('transaction-form');
const investmentForm = document.getElementById('investment-form');
const profileForm = document.getElementById('profile-form');
const customTypeForm = document.getElementById('custom-type-form');
const modalTitle = document.getElementById('modal-title');
const investmentModalTitle = document.getElementById('investment-modal-title');
const closeButtons = document.querySelectorAll('.close');
const cancelTransactionBtn = document.getElementById('cancel-transaction');
const cancelInvestmentBtn = document.getElementById('cancel-investment');
const cancelProfileBtn = document.getElementById('cancel-profile');
const cancelCustomTypeBtn = document.getElementById('cancel-custom-type');
const addCustomTypeBtn = document.getElementById('add-custom-type-btn');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadTransactions();
    loadSummary();
    loadInvestments();
    loadInvestmentTypes();
    loadUserProfile();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    addIncomeBtn.addEventListener('click', () => openTransactionModal('income'));
    addExpenseBtn.addEventListener('click', () => openTransactionModal('expense'));
    manageBudgetsBtn.addEventListener('click', openBudgetModal);
    investmentsBtn.addEventListener('click', toggleInvestmentsSection);
    
    // Botões de investimentos
    document.getElementById('add-investment-btn').addEventListener('click', openInvestmentModal);
    document.getElementById('profile-btn').addEventListener('click', openProfileModal);
    document.getElementById('recommendations-btn').addEventListener('click', openRecommendationsModal);
    addCustomTypeBtn.addEventListener('click', openCustomTypeModal);
    
    // Formulários
    transactionForm.addEventListener('submit', handleTransactionSubmit);
    investmentForm.addEventListener('submit', handleInvestmentSubmit);
    profileForm.addEventListener('submit', handleProfileSubmit);
    customTypeForm.addEventListener('submit', handleCustomTypeSubmit);
    
    // Botões de cancelar
    cancelTransactionBtn.addEventListener('click', closeTransactionModal);
    cancelInvestmentBtn.addEventListener('click', closeInvestmentModal);
    cancelProfileBtn.addEventListener('click', closeProfileModal);
    cancelCustomTypeBtn.addEventListener('click', closeCustomTypeModal);
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.closest('#transaction-modal')) {
                closeTransactionModal();
            } else if (this.closest('#budget-modal')) {
                closeBudgetModal();
            } else if (this.closest('#investment-modal')) {
                closeInvestmentModal();
            } else if (this.closest('#profile-modal')) {
                closeProfileModal();
            } else if (this.closest('#recommendations-modal')) {
                closeRecommendationsModal();
            } else if (this.closest('#custom-type-modal')) {
                closeCustomTypeModal();
            }
        });
    });
    
    // Fechar modal clicando fora dele
    window.addEventListener('click', function(event) {
        if (event.target === transactionModal) {
            closeTransactionModal();
        } else if (event.target === budgetModal) {
            closeBudgetModal();
        } else if (event.target === investmentModal) {
            closeInvestmentModal();
        } else if (event.target === profileModal) {
            closeProfileModal();
        } else if (event.target === recommendationsModal) {
            closeRecommendationsModal();
        } else if (event.target === customTypeModal) {
            closeCustomTypeModal();
        }
    });
    
    // Filtros de transações
    document.getElementById('filter-type').addEventListener('change', filterTransactions);
    document.getElementById('filter-category').addEventListener('change', filterTransactions);
    
    // Auto-calcular quantidade de cotas
    document.getElementById('investment-current-price').addEventListener('input', calculateQuantity);
    document.getElementById('investment-amount').addEventListener('input', calculateQuantity);
}

// Carregar dados da API
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        categories = await response.json();
        populateCategorySelects();
        loadBudgets();
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }
}

async function loadTransactions() {
    try {
        const response = await fetch('/api/transactions');
        transactions = await response.json();
        displayTransactions();
    } catch (error) {
        console.error('Erro ao carregar transações:', error);
    }
}

async function loadSummary() {
    try {
        const response = await fetch('/api/summary');
        const summary = await response.json();
        displaySummary(summary);
    } catch (error) {
        console.error('Erro ao carregar resumo:', error);
    }
}

async function loadBudgets() {
    try {
        const response = await fetch('/api/summary');
        const summary = await response.json();
        displayBudgets(summary.expensesByCategory);
    } catch (error) {
        console.error('Erro ao carregar orçamentos:', error);
    }
}

async function loadInvestments() {
    try {
        const response = await fetch('/api/investments');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        
        investments = await response.json();
        displayInvestments();
        loadInvestmentSummary();
    } catch (error) {
        console.error('Erro ao carregar investimentos:', error);
        alert('Erro ao carregar investimentos. Tente recarregar a página.');
    }
}

async function loadInvestmentTypes() {
    try {
        const response = await fetch('/api/investments/types');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        
        investmentTypes = await response.json();
        populateInvestmentTypeSelect();
    } catch (error) {
        console.error('Erro ao carregar tipos de investimento:', error);
        // Mostrar mensagem de erro para o usuário
        alert('Erro ao carregar tipos de investimento. Tente recarregar a página.');
    }
}

async function loadUserProfile() {
    try {
        const response = await fetch('/api/user-profile');
        userProfile = await response.json();
    } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error);
    }
}

async function loadInvestmentSummary() {
    try {
        const response = await fetch('/api/investments/summary');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        
        const summary = await response.json();
        displayInvestmentSummary(summary);
        displayInvestmentTypesAnalysis(summary.investmentsByType);
    } catch (error) {
        console.error('Erro ao carregar resumo de investimentos:', error);
        alert('Erro ao carregar resumo de investimentos. Tente recarregar a página.');
    }
}

// Exibir dados na interface
function displaySummary(summary) {
    document.getElementById('total-income').textContent = formatCurrency(summary.totalIncome);
    document.getElementById('total-expense').textContent = formatCurrency(summary.totalExpenses);
    document.getElementById('balance').textContent = formatCurrency(summary.balance);
}

function displayBudgets(budgets) {
    const container = document.getElementById('budgets-container');
    container.innerHTML = '';
    
    budgets.forEach(budget => {
        const budgetElement = createBudgetElement(budget);
        container.appendChild(budgetElement);
    });
}

function createBudgetElement(budget) {
    const div = document.createElement('div');
    div.className = 'budget-item';
    div.style.borderLeftColor = budget.color;
    
    const spentPercentage = budget.budget > 0 ? (budget.spent / budget.budget) * 100 : 0;
    const progressBarColor = spentPercentage > 100 ? '#f44336' : 
                           spentPercentage > 80 ? '#ff9800' : '#4CAF50';
    
    div.innerHTML = `
        <div class="budget-header">
            <div class="budget-category">${budget.name}</div>
            <div class="budget-amount">${formatCurrency(budget.budget)}</div>
        </div>
        <div class="budget-progress">
            <div class="budget-progress-bar" style="width: ${Math.min(spentPercentage, 100)}%; background-color: ${progressBarColor}"></div>
        </div>
        <div class="budget-details">
            <span>Gasto: ${formatCurrency(budget.spent)}</span>
            <span>Restante: ${formatCurrency(budget.remaining)}</span>
        </div>
    `;
    
    return div;
}

function displayTransactions(transactionsToShow = transactions) {
    const container = document.getElementById('transactions-list');
    container.innerHTML = '';
    
    if (transactionsToShow.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Nenhuma transação encontrada</p>';
        return;
    }
    
    transactionsToShow.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        container.appendChild(transactionElement);
    });
}

function createTransactionElement(transaction) {
    const category = categories.find(c => c.id === transaction.categoryId);
    const div = document.createElement('div');
    div.className = 'transaction-item';
    
    div.innerHTML = `
        <div class="transaction-info">
            <div class="transaction-category" style="background-color: ${category?.color || '#ccc'}"></div>
            <div class="transaction-details">
                <h4>${transaction.description}</h4>
                <p>${category?.name || 'Sem categoria'} • ${formatDate(transaction.date)}</p>
            </div>
        </div>
        <div class="transaction-amount ${transaction.type}">
            ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
        </div>
        <div class="transaction-actions">
            <button class="btn-small btn-edit" onclick="editTransaction('${transaction.id}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-small btn-delete" onclick="deleteTransaction('${transaction.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return div;
}

// Modais
function openTransactionModal(type) {
    currentTransactionType = type;
    editingTransactionId = null;
    
    modalTitle.textContent = type === 'income' ? 'Adicionar Receita' : 'Adicionar Despesa';
    transactionForm.reset();
    document.getElementById('transaction-date').value = new Date().toISOString().split('T')[0];
    
    transactionModal.style.display = 'block';
}

function closeTransactionModal() {
    transactionModal.style.display = 'none';
    currentTransactionType = '';
    editingTransactionId = null;
    transactionForm.reset();
}

function openBudgetModal() {
    budgetModal.style.display = 'block';
    displayBudgetForms();
}

function closeBudgetModal() {
    budgetModal.style.display = 'none';
}

function displayBudgetForms() {
    const container = document.getElementById('budget-form-container');
    container.innerHTML = '';
    
    categories.forEach(category => {
        const form = document.createElement('div');
        form.className = 'budget-form';
        form.innerHTML = `
            <div class="form-group">
                <label for="budget-${category.id}">${category.name}:</label>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <input type="number" id="budget-${category.id}" value="${category.budget}" step="0.01" min="0">
                    <button class="btn btn-primary" onclick="updateBudget('${category.id}')">Atualizar</button>
                </div>
            </div>
        `;
        container.appendChild(form);
    });
}

// Manipulação de transações
async function handleTransactionSubmit(e) {
    e.preventDefault();
    
    const formData = {
        description: document.getElementById('transaction-description').value,
        amount: document.getElementById('transaction-amount').value,
        type: currentTransactionType,
        categoryId: document.getElementById('transaction-category').value,
        date: document.getElementById('transaction-date').value
    };
    
    try {
        let response;
        if (editingTransactionId) {
            response = await fetch(`/api/transactions/${editingTransactionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        } else {
            response = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        }
        
        if (response.ok) {
            closeTransactionModal();
            loadTransactions();
            loadSummary();
            loadBudgets();
        } else {
            alert('Erro ao salvar transação');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao salvar transação');
    }
}

async function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    editingTransactionId = id;
    currentTransactionType = transaction.type;
    
    modalTitle.textContent = 'Editar Transação';
    document.getElementById('transaction-description').value = transaction.description;
    document.getElementById('transaction-amount').value = transaction.amount;
    document.getElementById('transaction-category').value = transaction.categoryId;
    document.getElementById('transaction-date').value = transaction.date;
    
    transactionModal.style.display = 'block';
}

async function deleteTransaction(id) {
    if (!confirm('Tem certeza que deseja deletar esta transação?')) return;
    
    try {
        const response = await fetch(`/api/transactions/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadTransactions();
            loadSummary();
            loadBudgets();
        } else {
            alert('Erro ao deletar transação');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar transação');
    }
}

async function updateBudget(categoryId) {
    const budgetInput = document.getElementById(`budget-${categoryId}`);
    const budget = parseFloat(budgetInput.value) || 0;
    
    try {
        const response = await fetch(`/api/categories/${categoryId}/budget`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ budget })
        });
        
        if (response.ok) {
            loadBudgets();
            loadSummary();
        } else {
            alert('Erro ao atualizar orçamento');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar orçamento');
    }
}

// Filtros
function filterTransactions() {
    const typeFilter = document.getElementById('filter-type').value;
    const categoryFilter = document.getElementById('filter-category').value;
    
    let filteredTransactions = transactions;
    
    if (typeFilter) {
        filteredTransactions = filteredTransactions.filter(t => t.type === typeFilter);
    }
    
    if (categoryFilter) {
        filteredTransactions = filteredTransactions.filter(t => t.categoryId === categoryFilter);
    }
    
    displayTransactions(filteredTransactions);
}

// Utilitários
function populateCategorySelects() {
    const selects = document.querySelectorAll('#transaction-category, #filter-category');
    
    selects.forEach(select => {
        // Limpar opções existentes (exceto a primeira)
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// ========== FUNÇÕES DE INVESTIMENTOS ==========

// Alternar seção de investimentos
function toggleInvestmentsSection() {
    const section = document.getElementById('investments-section');
    const isVisible = section.style.display !== 'none';
    
    if (isVisible) {
        section.style.display = 'none';
        investmentsBtn.innerHTML = '<i class="fas fa-chart-line"></i> Investimentos';
    } else {
        section.style.display = 'block';
        investmentsBtn.innerHTML = '<i class="fas fa-times"></i> Fechar Investimentos';
        loadInvestments();
    }
}

// Exibir resumo de investimentos
function displayInvestmentSummary(summary) {
    document.getElementById('total-invested').textContent = formatCurrency(summary.totalInvested);
    document.getElementById('current-value').textContent = formatCurrency(summary.totalCurrentValue);
    
    const profitLossElement = document.getElementById('profit-loss');
    const profitLoss = summary.totalProfitLoss;
    profitLossElement.textContent = formatCurrency(Math.abs(profitLoss));
    profitLossElement.className = profitLoss >= 0 ? 'positive' : 'negative';
}

// Exibir lista de investimentos
function displayInvestments() {
    const container = document.getElementById('investments-container');
    container.innerHTML = '';
    
    if (investments.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Nenhum investimento cadastrado</p>';
        return;
    }
    
    investments.forEach(investment => {
        const investmentElement = createInvestmentElement(investment);
        container.appendChild(investmentElement);
    });
}

// Criar elemento de investimento
function createInvestmentElement(investment) {
    const type = investmentTypes.find(t => t._id === investment.typeId);
    const div = document.createElement('div');
    div.className = 'investment-card';
    div.setAttribute('data-type', investment.typeId);
    
    const profitLossClass = investment.profitLoss >= 0 ? 'positive' : 'negative';
    
    div.innerHTML = `
        <div class="investment-header">
            <div class="investment-name">${investment.name}</div>
            <div class="investment-type">${type?.name || 'Tipo não encontrado'}</div>
        </div>
        <div class="investment-details">
            <div class="investment-detail">
                <div class="investment-detail-label">Valor Investido</div>
                <div class="investment-detail-value">${formatCurrency(investment.investedAmount)}</div>
            </div>
            <div class="investment-detail">
                <div class="investment-detail-label">Valor Atual</div>
                <div class="investment-detail-value">${formatCurrency(investment.currentValue)}</div>
            </div>
            <div class="investment-detail">
                <div class="investment-detail-label">Quantidade</div>
                <div class="investment-detail-value">${investment.quantity.toFixed(6)}</div>
            </div>
            <div class="investment-detail">
                <div class="investment-detail-label">Preço Atual</div>
                <div class="investment-detail-value">${formatCurrency(investment.currentPrice)}</div>
            </div>
            <div class="investment-detail">
                <div class="investment-detail-label">Lucro/Prejuízo</div>
                <div class="investment-detail-value ${profitLossClass}">${formatCurrency(investment.profitLoss)}</div>
            </div>
            <div class="investment-detail">
                <div class="investment-detail-label">% Variação</div>
                <div class="investment-detail-value ${profitLossClass}">${investment.profitLossPercentage.toFixed(2)}%</div>
            </div>
        </div>
        <div class="investment-actions">
            <button class="btn-small btn-edit" onclick="editInvestment('${investment._id}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-small btn-delete" onclick="deleteInvestment('${investment._id}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return div;
}

// Exibir análise por tipo
function displayInvestmentTypesAnalysis(typesAnalysis) {
    const container = document.getElementById('investment-types-container');
    container.innerHTML = '';
    
    typesAnalysis.forEach(type => {
        if (type.count > 0) {
            const typeElement = createInvestmentTypeAnalysisElement(type);
            container.appendChild(typeElement);
        }
    });
}

// Criar elemento de análise por tipo
function createInvestmentTypeAnalysisElement(type) {
    const div = document.createElement('div');
    div.className = 'investment-type-analysis';
    div.setAttribute('data-type', type._id);
    
    const profitLossClass = type.profitLoss >= 0 ? 'positive' : 'negative';
    
    div.innerHTML = `
        <div class="type-header">
            <div class="type-name">${type.name}</div>
            <div class="type-count">${type.count} investimento(s)</div>
        </div>
        <div class="type-metrics">
            <div class="type-metric">
                <div class="type-metric-label">Total Investido</div>
                <div class="type-metric-value">${formatCurrency(type.totalInvested)}</div>
            </div>
            <div class="type-metric">
                <div class="type-metric-label">Valor Atual</div>
                <div class="type-metric-value">${formatCurrency(type.currentValue)}</div>
            </div>
            <div class="type-metric">
                <div class="type-metric-label">Lucro/Prejuízo</div>
                <div class="type-metric-value ${profitLossClass}">${formatCurrency(type.profitLoss)}</div>
            </div>
            <div class="type-metric">
                <div class="type-metric-label">% Variação</div>
                <div class="type-metric-value ${profitLossClass}">${type.profitLossPercentage.toFixed(2)}%</div>
            </div>
        </div>
    `;
    
    return div;
}

// Preencher select de tipos de investimento
function populateInvestmentTypeSelect() {
    const select = document.getElementById('investment-type');
    select.innerHTML = '<option value="">Selecione o tipo</option>';
    
    investmentTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type._id;
        option.textContent = `${type.name} - ${type.description}`;
        select.appendChild(option);
    });
}

// Calcular quantidade automaticamente
function calculateQuantity() {
    const price = parseFloat(document.getElementById('investment-current-price').value) || 0;
    const amount = parseFloat(document.getElementById('investment-amount').value) || 0;
    
    if (price > 0 && amount > 0) {
        const quantity = amount / price;
        document.getElementById('investment-quantity').value = quantity.toFixed(6);
    }
}

// ========== MODAIS DE INVESTIMENTOS ==========

// Abrir modal de investimento
function openInvestmentModal() {
    editingInvestmentId = null;
    investmentModalTitle.textContent = 'Adicionar Investimento';
    investmentForm.reset();
    document.getElementById('investment-date').value = new Date().toISOString().split('T')[0];
    investmentModal.style.display = 'block';
}

// Fechar modal de investimento
function closeInvestmentModal() {
    investmentModal.style.display = 'none';
    editingInvestmentId = null;
    investmentForm.reset();
}

// Abrir modal de perfil
function openProfileModal() {
    profileModal.style.display = 'block';
    
    // Preencher formulário com dados atuais
    document.getElementById('profile-income').value = userProfile.monthlyIncome || '';
    document.getElementById('profile-risk').value = userProfile.riskTolerance || 'moderate';
    document.getElementById('profile-goal').value = userProfile.investmentGoal || 'growth';
    document.getElementById('profile-horizon').value = userProfile.timeHorizon || 'medium';
}

// Fechar modal de perfil
function closeProfileModal() {
    profileModal.style.display = 'none';
}

// Abrir modal de recomendações
async function openRecommendationsModal() {
    recommendationsModal.style.display = 'block';
    await loadRecommendations();
}

// Fechar modal de recomendações
function closeRecommendationsModal() {
    recommendationsModal.style.display = 'none';
}

// Abrir modal de tipo personalizado
function openCustomTypeModal() {
    customTypeModal.style.display = 'block';
    customTypeForm.reset();
}

// Fechar modal de tipo personalizado
function closeCustomTypeModal() {
    customTypeModal.style.display = 'none';
    customTypeForm.reset();
}

// ========== OPERAÇÕES DE INVESTIMENTOS ==========

// Manipular envio do formulário de investimento
async function handleInvestmentSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('investment-name').value,
        typeId: document.getElementById('investment-type').value,
        currentPrice: document.getElementById('investment-current-price').value,
        investedAmount: document.getElementById('investment-amount').value,
        quantity: document.getElementById('investment-quantity').value,
        purchaseDate: document.getElementById('investment-date').value
    };
    
    console.log('Dados do formulário:', formData);
    
    // Validação básica
    if (!formData.name || !formData.typeId || !formData.currentPrice || !formData.investedAmount) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    if (formData.typeId === '' || formData.typeId === 'undefined') {
        alert('Por favor, selecione um tipo de investimento.');
        return;
    }
    
    try {
        let response;
        if (editingInvestmentId) {
            response = await fetch(`/api/investments/${editingInvestmentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        } else {
            response = await fetch('/api/investments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        }
        
        if (response.ok) {
            closeInvestmentModal();
            loadInvestments();
        } else {
            const errorData = await response.json();
            console.error('Erro do servidor:', errorData);
            alert(`Erro ao salvar investimento: ${errorData.error || 'Erro desconhecido'}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert(`Erro ao salvar investimento: ${error.message}`);
    }
}

// Editar investimento
async function editInvestment(id) {
    const investment = investments.find(i => i._id === id);
    if (!investment) return;
    
    editingInvestmentId = id;
    investmentModalTitle.textContent = 'Editar Investimento';
    
    document.getElementById('investment-name').value = investment.name;
    document.getElementById('investment-type').value = investment.typeId;
    document.getElementById('investment-current-price').value = investment.currentPrice;
    document.getElementById('investment-amount').value = investment.investedAmount;
    document.getElementById('investment-quantity').value = investment.quantity;
    document.getElementById('investment-date').value = investment.purchaseDate;
    
    investmentModal.style.display = 'block';
}

// Deletar investimento
async function deleteInvestment(id) {
    if (!confirm('Tem certeza que deseja deletar este investimento?')) return;
    
    try {
        const response = await fetch(`/api/investments/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadInvestments();
        } else {
            alert('Erro ao deletar investimento');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar investimento');
    }
}

// Manipular envio do formulário de perfil
async function handleProfileSubmit(e) {
    e.preventDefault();
    
    const formData = {
        monthlyIncome: document.getElementById('profile-income').value,
        riskTolerance: document.getElementById('profile-risk').value,
        investmentGoal: document.getElementById('profile-goal').value,
        timeHorizon: document.getElementById('profile-horizon').value
    };
    
    try {
        const response = await fetch('/api/user-profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            userProfile = await response.json();
            closeProfileModal();
            alert('Perfil atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar perfil');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar perfil');
    }
}

// Carregar recomendações
async function loadRecommendations() {
    try {
        const response = await fetch('/api/investments/recommendations');
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const recommendations = await response.json();
        console.log('Recomendações recebidas:', recommendations);
        
        if (!Array.isArray(recommendations)) {
            throw new Error('Resposta não é um array de recomendações');
        }
        
        displayRecommendations(recommendations);
    } catch (error) {
        console.error('Erro ao carregar recomendações:', error);
        alert(`Erro ao carregar recomendações: ${error.message}`);
    }
}

// Exibir recomendações
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = '';
    
    if (recommendations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Nenhuma recomendação disponível</p>';
        return;
    }
    
    recommendations.forEach(recommendation => {
        const recommendationElement = createRecommendationElement(recommendation);
        container.appendChild(recommendationElement);
    });
}

// Criar elemento de recomendação
function createRecommendationElement(recommendation) {
    const div = document.createElement('div');
    div.className = 'recommendation-card';
    div.setAttribute('data-type', recommendation.typeId);
    
    div.innerHTML = `
        <div class="recommendation-header">
            <div class="recommendation-name">${recommendation.typeName}</div>
            <div class="recommendation-percentage">${recommendation.recommendedPercentage}%</div>
        </div>
        <div class="recommendation-description">${recommendation.description}</div>
        <div class="recommendation-details">
            <div class="recommendation-detail">
                <div class="recommendation-detail-label">Risco</div>
                <div class="recommendation-detail-value">${recommendation.risk}</div>
            </div>
            <div class="recommendation-detail">
                <div class="recommendation-detail-label">Retorno Esperado</div>
                <div class="recommendation-detail-value">${recommendation.expectedReturn}</div>
            </div>
        </div>
        <div class="recommendation-reasoning">
            <strong>Por que esta recomendação?</strong><br>
            ${recommendation.reasoning}
        </div>
    `;
    
    return div;
}

// Manipular envio do formulário de tipo personalizado
async function handleCustomTypeSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('custom-type-name').value,
        description: document.getElementById('custom-type-description').value,
        risk: document.getElementById('custom-type-risk').value,
        return: document.getElementById('custom-type-return').value
    };
    
    try {
        const response = await fetch('/api/investments/types', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const newType = await response.json();
            investmentTypes.push(newType);
            populateInvestmentTypeSelect();
            closeCustomTypeModal();
            alert('Tipo de investimento criado com sucesso!');
        } else {
            alert('Erro ao criar tipo de investimento');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar tipo de investimento');
    }
}
