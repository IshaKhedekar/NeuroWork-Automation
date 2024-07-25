document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const user = registeredUsers.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById('user').innerText = username;
        document.querySelector('.container').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;
    const department = document.getElementById('department').value;

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    if (registeredUsers.find(user => user.username === regUsername)) {
        alert('Username already exists');
    } else {
        registeredUsers.push({ username: regUsername, password: regPassword, department: department });
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        alert('Registration successful');
        showLogin();
    }
});

function showRegistration() {
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('registration').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registration').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
}

function viewAttendance() {
    alert('Viewing Attendance');
}

function viewMes() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('mes').classList.remove('hidden');

    showCategory('Snacks'); // Show Snacks category by default
}

function showCategory(category) {
    const menuItems = {
        'Snacks': [
            { name: 'Chips', price: 10 },
            { name: 'Cookies', price: 25 },
            { name: 'Fruits', price: 30 },
            { name: 'Peanut Butter', price: 45 },
            { name: 'Muffins', price: 30 },
            { name: 'Hard-Boiled egg', price: 15 }
        ],
        'Breakfast': [
            { name: 'Pancakes', price: 50 },
            { name: 'Omelette', price: 20 },
            { name: 'Idli', price: 25 },
            { name: 'Dosa', price: 30 },
            { name: 'Samosa', price: 18 }
        ],
        'Drinks': [
            { name: 'Coffee', price: 15 },
            { name: 'Tea', price: 10 },
            { name: 'Avocado Smoothie', price: 60 },
            { name: 'Blue-berry Mojito', price: 55}
        ],
        'Lunch': [
            { name: 'Chappati', price: 5 },
            { name: 'Rice', price: 20 },
            { name: 'Dal', price: 25 }
        ]
    };

    const items = menuItems[category];
    const menuItemsList = document.getElementById('menuItems');

    menuItemsList.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
        const button = document.createElement('button');
        button.textContent = '+';
        button.onclick = () => addToCart(item);
        li.appendChild(button);
        menuItemsList.appendChild(li);
    });
}

// Existing code...

let cart = [];
let salaryAmount = parseFloat(localStorage.getItem('salaryAmount')) || 50000; // Retrieve salary amount from local storage or use initial value
let billHistory = JSON.parse(localStorage.getItem('billHistory')) || [];

function addToCart(item) {
    cart.push(item);
    alert(`${item.name} added to cart`);
}

function generateBill() {
    document.getElementById('mes').classList.add('hidden');
    document.getElementById('payment').classList.remove('hidden');

    const cartItemsList = document.getElementById('cartItems');
    const totalAmountElem = document.getElementById('totalAmount');

    cartItemsList.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        totalAmount += item.price;
    });

    totalAmountElem.textContent = totalAmount.toFixed(2);
}

function payWithGPay() {
    alert('Payment with GPay successful');
    addBillToHistory('GPay');
    goBackToDashboard();
}

function payWithCash() {
    alert('Payment with Cash successful');
    addBillToHistory('Cash');
    goBackToDashboard();
}

function deductFromSalary() {
    const totalAmountElem = document.getElementById('totalAmount');
    const totalAmount = parseFloat(totalAmountElem.textContent);

    if (salaryAmount >= totalAmount) {
        salaryAmount -= totalAmount;
        localStorage.setItem('salaryAmount', salaryAmount.toFixed(2));
        alert(`₹${totalAmount.toFixed(2)} has been deducted from your salary`);
        addBillToHistory('Salary Deduction');
        goBackToDashboard();
    } else {
        alert('Insufficient salary balance');
    }
}

function addBillToHistory(paymentMethod) {
    const totalAmountElem = document.getElementById('totalAmount');
    const totalAmount = parseFloat(totalAmountElem.textContent);
    const date = new Date().toLocaleString();
    billHistory.push({ date, totalAmount, paymentMethod });
    localStorage.setItem('billHistory', JSON.stringify(billHistory));
}

function goBackToDashboard() {
    document.getElementById('payment').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    cart = []; // Clear the cart after payment
    updateSalaryDetails();
}

function viewSalary() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('salary').classList.remove('hidden');
    updateSalaryDetails();
}

function updateSalaryDetails() {
    document.getElementById('salaryAmount').textContent = `Your salary is ₹${salaryAmount.toFixed(2)}`;
}

function showBillHistory() {
    const billHistoryList = document.getElementById('billHistoryList');
    billHistoryList.innerHTML = '';

    billHistory.forEach(bill => {
        const li = document.createElement('li');
        li.textContent = `Date: ${bill.date}, Amount: ₹${bill.totalAmount.toFixed(2)}, Payment Method: ${bill.paymentMethod}`;
        billHistoryList.appendChild(li);
    });

    document.getElementById('salary').classList.add('hidden');
    document.getElementById('billHistory').classList.remove('hidden');
}

function viewBillHistory() {
    document.getElementById('salary').classList.add('hidden');
    document.getElementById('billHistory').classList.remove('hidden');
    showBillHistory();
}

function goBackToSalary() {
    document.getElementById('billHistory').classList.add('hidden');
    document.getElementById('salary').classList.remove('hidden');
}

// Project management code
let ongoingProjects = JSON.parse(localStorage.getItem('ongoingProjects')) || [];
let projectHistory = JSON.parse(localStorage.getItem('projectHistory')) || [];

function viewProjects() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('projects').classList.remove('hidden');
    updateProjectsList();
}

function addNewProject() {
    const projectName = prompt('Enter new project name:');
    if (projectName) {
        ongoingProjects.push(projectName);
        localStorage.setItem('ongoingProjects', JSON.stringify(ongoingProjects));
        updateProjectsList();
    }
}

function updateProjectsList() {
    const ongoingProjectsList = document.getElementById('ongoingProjects');
    ongoingProjectsList.innerHTML = '';

    ongoingProjects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = () => {
            if (checkbox.checked) {
                alert('Project completed successfully');
                moveToHistory(project);
                updateProjectsList();
            }
        };
        li.prepend(checkbox);
        ongoingProjectsList.appendChild(li);
    });
}

function moveToHistory(project) {
    projectHistory.push(project);
    localStorage.setItem('projectHistory', JSON.stringify(projectHistory));

    ongoingProjects = ongoingProjects.filter(p => p !== project);
    localStorage.setItem('ongoingProjects', JSON.stringify(ongoingProjects));
}

function showHistory() {
    document.getElementById('projects').classList.add('hidden');
    document.getElementById('history').classList.remove('hidden');

    const projectHistoryList = document.getElementById('projectHistory');
    projectHistoryList.innerHTML = '';
    projectHistory.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project;
        projectHistoryList.appendChild(li);
    });
}

function goBack() {
    document.getElementById('history').classList.add('hidden');
    document.getElementById('projects').classList.remove('hidden');
}


