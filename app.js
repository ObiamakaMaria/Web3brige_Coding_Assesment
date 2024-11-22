const tiers = {
    1: { amount: 10000, interestRate: 0.05 },
    2: { amount: 20000, interestRate: 0.10 },
    3: { amount: 30000, interestRate: 0.20 },
};

const students = [];

document.getElementById("studentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const tier = parseInt(document.getElementById("tier").value);
    const image = document.getElementById("image").files[0];

    if (!name || !tier || !tiers[tier] || !image) {
        alert("Please fill in all fields and upload an image.");
        return;
    }

    const { amount, interestRate } = tiers[tier];
    const weeklyInterest = amount * interestRate;
    const totalWithdrawal = amount + weeklyInterest;

    const reader = new FileReader();
    reader.onload = () => {
        const student = { name, tier, amount, weeklyInterest, totalWithdrawal, image: reader.result };
        students.push(student);
        updateDashboard();
        e.target.reset();
    };
    reader.readAsDataURL(image);
});

function updateDashboard() {
    const totalSavings = students.reduce((sum, student) => sum + student.amount, 0);
    document.getElementById("totalSavings").textContent = totalSavings;

    const studentsList = document.getElementById("studentsList");
    studentsList.innerHTML = "";

    students.forEach((student, index) => {
        const studentDiv = document.createElement("div");
        studentDiv.classList.add("student");

        studentDiv.innerHTML = `
            <img src="${student.image}" alt="Student Image">
            <div class="student-info">
                <p><strong>${student.name}</strong> - Tier ${student.tier}</p>
                <p>Weekly Interest: ${student.weeklyInterest} Naira</p>
                <p>Total Withdrawal: ${student.totalWithdrawal} Naira</p>
            </div>
            <button onclick="withdrawStudent(${index})">Withdraw</button>
        `;

        studentsList.appendChild(studentDiv);
    });
}

function withdrawStudent(index) {
    students.splice(index, 1);
    updateDashboard();
}
