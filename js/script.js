/* ================= LOGIN ================= */

const loginForm = document.querySelector("form");
const loginMessage = document.getElementById("loginMessage");
const rememberCheckbox = document.getElementById("remember");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const loginButtonText = document.getElementById("loginButtonText");

if (emailInput && rememberCheckbox) {
    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
}

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        emailInput.classList.remove("input-error", "input-success");
        passwordInput.classList.remove("input-error", "input-success");

        if (email === "" || !email.includes("@")) {

            emailInput.classList.add("input-error");

            loginMessage.textContent =
                "Please enter a valid email address.";

            loginMessage.className =
                "alert alert-danger";

            return;
        }

        if (password === "" || password.length < 6) {

            passwordInput.classList.add("input-error");

            loginMessage.textContent =
                "Password must contain at least 6 characters.";

            loginMessage.className =
                "alert alert-danger";

            return;
        }

        const correctEmail = "student@gmail.com";
        const correctPassword = "student123";

        if (
            email === correctEmail &&
            password === correctPassword
        ) {

            emailInput.classList.add("input-success");
            passwordInput.classList.add("input-success");

            sessionStorage.setItem(
                "studentLoggedIn",
                "true"
            );

            sessionStorage.setItem(
                "studentEmail",
                email
            );

            if (rememberCheckbox && rememberCheckbox.checked) {

                localStorage.setItem(
                    "rememberedEmail",
                    email
                );

            } else {

                localStorage.removeItem(
                    "rememberedEmail"
                );

            }

            if (loginButton) {
                loginButton.disabled = true;
            }

            if (loginButtonText) {
                loginButtonText.textContent = "Logging in...";
            }

            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 500);

        } else {

            loginMessage.textContent =
                "Invalid email or password. Please try again.";

            loginMessage.className =
                "alert alert-danger";
        }

    });
}


/* ================= SHOW / HIDE PASSWORD ================= */

const togglePassword =
    document.getElementById("togglePassword");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", function() {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.textContent = "??";

        } else {

            passwordInput.type = "password";
            togglePassword.textContent = "???";

        }

    });

}


/* ================= FORGOT PASSWORD ================= */

const forgotPassword =
    document.getElementById("forgotPassword");

if (forgotPassword) {

    forgotPassword.addEventListener("click", function(event) {

        event.preventDefault();

        if (loginMessage) {

            loginMessage.textContent =
                "Password reset is not available in this demo portal.";

            loginMessage.className =
                "alert alert-info";
        }

    });

}


/* ================= DASHBOARD PROTECTION ================= */

const isDashboardPage =
    window.location.pathname.includes("dashboard.html");

const isLoggedIn =
    sessionStorage.getItem("studentLoggedIn");

if (isDashboardPage && isLoggedIn !== "true") {

    window.location.href = "index.html";

}


/* ================= LOGOUT ================= */

function logout() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        sessionStorage.removeItem("studentLoggedIn");
        sessionStorage.removeItem("studentEmail");

        localStorage.removeItem("activeSection");

        window.location.href = "index.html";
    }

}


/* ================= MOBILE MENU ================= */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const sidebar =
    document.querySelector(".sidebar");

if (mobileMenuBtn && sidebar) {

    mobileMenuBtn.addEventListener("click", function() {

        sidebar.classList.toggle("mobile-open");

    });

}


/* ================= STUDENT DATA ================= */

const studentData = {
    name: "Manoranjitham M",
    department: "Electrical and Electronics Engineering",
    semester: "7th Semester",
    email: "student@gmail.com"
};

const studentName =
    document.getElementById("studentName");

if (studentName) {
    studentName.textContent = studentData.name;
}

const studentDepartment =
    document.getElementById("studentDepartment");

if (studentDepartment) {
    studentDepartment.textContent =
        studentData.department;
}

const studentSemester =
    document.getElementById("studentSemester");

if (studentSemester) {
    studentSemester.textContent =
        studentData.semester;
}

const studentEmail =
    document.getElementById("studentEmail");

if (studentEmail) {
    studentEmail.textContent =
        studentData.email;
}

const profileInitials =
    document.getElementById("profileInitials");

if (profileInitials) {
    profileInitials.textContent = "MR";
}


/* ================= DASHBOARD NAVIGATION ================= */

const navigationLinks =
    document.querySelectorAll(".nav-link[data-section]");

const pageSections =
    document.querySelectorAll(".page-section");

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const sectionName =
            link.getAttribute("data-section");

        pageSections.forEach(function(section) {
            section.classList.add("d-none");
        });

        const selectedSection =
            document.getElementById(sectionName);

        if (selectedSection) {
            selectedSection.classList.remove("d-none");
        }

        navigationLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

        localStorage.setItem(
            "activeSection",
            sectionName
        );

    });

});


/* ================= RESTORE ACTIVE SECTION ================= */

const savedSection =
    localStorage.getItem("activeSection");

if (savedSection && isDashboardPage) {

    pageSections.forEach(function(section) {
        section.classList.add("d-none");
    });

    const savedPage =
        document.getElementById(savedSection);

    if (savedPage) {
        savedPage.classList.remove("d-none");
    }

    navigationLinks.forEach(function(link) {

        link.classList.remove("active");

        if (
            link.getAttribute("data-section") ===
            savedSection
        ) {
            link.classList.add("active");
        }

    });

}


/* ================= MARKS ================= */

const marksData = [
    { subject: "Database Management Systems", marks: 86 },
    { subject: "Web Development", marks: 91 },
    { subject: "Python Programming", marks: 78 },
    { subject: "Software Engineering", marks: 84 },
    { subject: "Computer Networks", marks: 88 }
];

function getGrade(marks) {

    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";

    return "D";
}

const marksTableBody =
    document.getElementById("marksTableBody");

if (marksTableBody) {

    let totalMarks = 0;

    marksData.forEach(function(subject) {

        totalMarks += subject.marks;

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${subject.subject}</td>
            <td>${subject.marks}%</td>
            <td>${getGrade(subject.marks)}</td>
        `;

        marksTableBody.appendChild(row);

    });

    const average =
        totalMarks / marksData.length;

    const marksAverage =
        document.getElementById("marksAverage");

    if (marksAverage) {

        marksAverage.textContent =
            `Average: ${average.toFixed(1)}%`;
    }

}


/* ================= ATTENDANCE ================= */

const attendanceData = [
    { subject: "Database Management Systems", total: 40, present: 36 },
    { subject: "Web Development", total: 35, present: 32 },
    { subject: "Python Programming", total: 38, present: 31 },
    { subject: "Software Engineering", total: 42, present: 37 },
    { subject: "Computer Networks", total: 40, present: 34 }
];

let totalClasses = 0;
let totalPresent = 0;

attendanceData.forEach(function(subject) {

    totalClasses += subject.total;
    totalPresent += subject.present;

});

const totalAbsent =
    totalClasses - totalPresent;

const overallPercentage =
    (totalPresent / totalClasses) * 100;

const overallPercentageElement =
    document.getElementById("overallPercentage");

if (overallPercentageElement) {

    overallPercentageElement.textContent =
        `${overallPercentage.toFixed(1)}%`;

}

const totalClassesElement =
    document.getElementById("totalClasses");

if (totalClassesElement) {
    totalClassesElement.textContent =
        totalClasses;
}

const presentClassesElement =
    document.getElementById("presentClasses");

if (presentClassesElement) {
    presentClassesElement.textContent =
        totalPresent;
}

const absentClassesElement =
    document.getElementById("absentClasses");

if (absentClassesElement) {
    absentClassesElement.textContent =
        totalAbsent;
}

const attendanceList =
    document.getElementById("attendanceList");

if (attendanceList) {

    attendanceData.forEach(function(subject) {

        const percentage =
            (subject.present / subject.total) * 100;

        const attendanceItem =
            document.createElement("div");

        attendanceItem.className =
            "mb-4";

        attendanceItem.innerHTML = `
            <div class="d-flex justify-content-between mb-2">
                <strong>${subject.subject}</strong>
                <span>${percentage.toFixed(1)}%</span>
            </div>

            <div class="progress" style="height: 10px;">
                <div
                    class="progress-bar"
                    role="progressbar"
                    style="width: ${percentage}%"
                    aria-valuenow="${percentage}"
                    aria-valuemin="0"
                    aria-valuemax="100">
                </div>
            </div>
        `;

        attendanceList.appendChild(
            attendanceItem
        );

    });

}


/* ================= COURSES ================= */

const coursesData = [
    { code: "CS101", name: "Database Management Systems", instructor: "Dr. Kumar", progress: 80 },
    { code: "CS102", name: "Web Development", instructor: "Ms. Priya", progress: 90 },
    { code: "CS103", name: "Python Programming", instructor: "Mr. Arun", progress: 65 },
    { code: "CS104", name: "Software Engineering", instructor: "Dr. Ravi", progress: 75 },
    { code: "CS105", name: "Computer Networks", instructor: "Ms. Divya", progress: 70 },
    { code: "CS106", name: "Data Analytics", instructor: "Mr. Suresh", progress: 60 }
];

const coursesContainer =
    document.getElementById("coursesContainer");

if (coursesContainer) {

    coursesData.forEach(function(course) {

        const courseCard =
            document.createElement("div");

        courseCard.className =
            "col-md-6 col-lg-4";

        courseCard.innerHTML = `
            <div class="dashboard-card">

                <span class="text-primary">
                    ${course.code}
                </span>

                <h5 class="mt-2">
                    ${course.name}
                </h5>

                <p class="text-muted">
                    Instructor: ${course.instructor}
                </p>

                <div class="d-flex justify-content-between mb-2">
                    <span>Course Progress</span>
                    <strong>${course.progress}%</strong>
                </div>

                <div class="progress" style="height: 8px;">
                    <div
                        class="progress-bar"
                        style="width: ${course.progress}%">
                    </div>
                </div>

            </div>
        `;

        coursesContainer.appendChild(courseCard);

    });

}


/* ================= ASSIGNMENTS ================= */

const assignmentsData = [
    {
        title: "SQL Queries Practice",
        subject: "Database Management Systems",
        dueDate: "05 October 2026",
        status: "Pending"
    },
    {
        title: "Responsive Webpage",
        subject: "Web Development",
        dueDate: "07 October 2026",
        status: "Due Soon"
    },
    {
        title: "Python Basics",
        subject: "Python Programming",
        dueDate: "10 October 2026",
        status: "Pending"
    },
    {
        title: "Software Engineering Report",
        subject: "Software Engineering",
        dueDate: "01 October 2026",
        status: "Completed"
    }
];

const assignmentsContainer =
    document.getElementById("assignmentsContainer");

if (assignmentsContainer) {

    assignmentsData.forEach(function(assignment) {

        const assignmentItem =
            document.createElement("div");

        assignmentItem.className =
            "assignment";

        assignmentItem.setAttribute(
            "data-status",
            assignment.status
        );

        let badgeClass =
            "bg-secondary";

        if (assignment.status === "Completed") {
            badgeClass = "bg-success";
        } else if (assignment.status === "Pending") {
            badgeClass = "bg-warning text-dark";
        } else if (assignment.status === "Due Soon") {
            badgeClass = "bg-danger";
        }

        assignmentItem.innerHTML = `
            <div>
                <h6>${assignment.title}</h6>

                <p>
                    ${assignment.subject}
                    • Due: ${assignment.dueDate}
                </p>
            </div>

            <span class="badge ${badgeClass}">
                ${assignment.status}
            </span>
        `;

        assignmentsContainer.appendChild(
            assignmentItem
        );

    });

    const assignmentCount =
        document.getElementById("assignmentCount");

    if (assignmentCount) {

        assignmentCount.textContent =
            `${assignmentsData.length} Assignments`;
    }

}


/* ================= ASSIGNMENT SEARCH ================= */

const assignmentSearch =
    document.getElementById("assignmentSearch");

if (assignmentSearch) {

    assignmentSearch.addEventListener("input", function() {

        const searchText =
            assignmentSearch.value.toLowerCase();

        const assignmentItems =
            document.querySelectorAll(
                "#assignmentsContainer .assignment"
            );

        assignmentItems.forEach(function(item) {

            const assignmentText =
                item.textContent.toLowerCase();

            const selectedStatus =
                document.querySelector(
                    ".assignment-filter.active"
                )?.getAttribute("data-status") || "All";

            const itemStatus =
                item.getAttribute("data-status");

            const matchesSearch =
                assignmentText.includes(searchText);

            const matchesStatus =
                selectedStatus === "All" ||
                itemStatus === selectedStatus;

            item.style.display =
                matchesSearch && matchesStatus
                    ? "flex"
                    : "none";

        });

    });

}


/* ================= ASSIGNMENT STATUS FILTER ================= */

const assignmentFilters =
    document.querySelectorAll(".assignment-filter");

assignmentFilters.forEach(function(filter) {

    filter.addEventListener("click", function() {

        const selectedStatus =
            filter.getAttribute("data-status");

        assignmentFilters.forEach(function(button) {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const searchText =
            assignmentSearch
                ? assignmentSearch.value.toLowerCase()
                : "";

        const assignmentItems =
            document.querySelectorAll(
                "#assignmentsContainer .assignment"
            );

        assignmentItems.forEach(function(item) {

            const itemStatus =
                item.getAttribute("data-status");

            const assignmentText =
                item.textContent.toLowerCase();

            const matchesSearch =
                assignmentText.includes(searchText);

            const matchesStatus =
                selectedStatus === "All" ||
                itemStatus === selectedStatus;

            item.style.display =
                matchesSearch && matchesStatus
                    ? "flex"
                    : "none";

        });

    });

});


/* ================= DASHBOARD DATA ================= */

const welcomeName =
    document.getElementById("welcomeName");

if (welcomeName) {
    welcomeName.textContent =
        studentData.name;
}

const currentDate =
    document.getElementById("currentDate");

if (currentDate) {

    const today = new Date();

    currentDate.textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

}

const dashboardAttendance =
    document.getElementById("dashboardAttendance");

if (dashboardAttendance) {

    dashboardAttendance.textContent =
        `${overallPercentage.toFixed(1)}%`;

}

const dashboardAssignments =
    document.getElementById("dashboardAssignments");

if (dashboardAssignments) {

    dashboardAssignments.textContent =
        assignmentsData.length;

}

const dashboardCourses =
    document.getElementById("dashboardCourses");

if (dashboardCourses) {

    dashboardCourses.textContent =
        coursesData.length;

}


/* ================= RECENT ACTIVITY ================= */

const activityData = [
    {
        title: "SQL Assignment Submitted",
        description: "Database Management Systems",
        time: "Today"
    },
    {
        title: "Web Development Course Completed",
        description: "Responsive Web Design",
        time: "Yesterday"
    },
    {
        title: "Python Practice Updated",
        description: "Completed basic programming exercises",
        time: "2 days ago"
    },
    {
        title: "Attendance Updated",
        description: "Current overall attendance recorded",
        time: "3 days ago"
    }
];

const activityContainer =
    document.getElementById("activityContainer");

if (activityContainer) {

    activityData.forEach(function(activity) {

        const activityItem =
            document.createElement("div");

        activityItem.className =
            "assignment";

        activityItem.innerHTML = `
            <div>
                <h6>${activity.title}</h6>
                <p>${activity.description}</p>
            </div>

            <span class="text-muted">
                ${activity.time}
            </span>
        `;

        activityContainer.appendChild(
            activityItem
        );

    });

}


/* ================= THEME TOGGLE ================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {

    if (!themeToggle) {
        return;
    }

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.textContent =
            "?? Light Mode";

    } else {

        themeToggle.textContent =
            "?? Dark Mode";

    }

}

updateThemeButton();

if (themeToggle) {

    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");

        if (
            document.body.classList.contains("dark-mode")
        ) {

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            localStorage.setItem(
                "theme",
                "light"
            );

        }

        updateThemeButton();

    });

}
