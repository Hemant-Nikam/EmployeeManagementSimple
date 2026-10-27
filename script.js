let id = 1;
let emp = [];
let absent = [];
let leave = [];
let leaveid = 1;


for (let i = 0; i < 30; i++) {
    absent.push(0);
}
document.getElementById("addBtn").addEventListener("click", function () {
    let empName = document.getElementById("name").value;

    if (empName.trim() === "") {
        document.getElementById("message").textContent = "Invalid Employee Name";
        return;
    }

    let empSalary = document.getElementById("salary").value;

    if (!/^\d+$/.test(empSalary)) {
        document.getElementById("message").textContent = "Invalid Employee Salary";
        return;
    }
    else {
        empSalary = Number(empSalary);

        if (empSalary <= 0) {
            document.getElementById("message").textContent = "Invalid Employee Salary";
            return;
        }
    }

    let employee = [];
    employee.push(id++);
    employee.push(empName);
    employee.push(empSalary);
    employee.push([]);

    emp.push(employee);
    document.getElementById("message").textContent = "Employee Added";

    document.getElementById("empList").innerHTML = (id - 1) + "  " + empName + " " + empSalary + "  <br>" + document.getElementById("empList").innerHTML;
    return;
}
)

document.getElementById("leaveBtn").addEventListener("click", function () {
    let empid = Number(document.getElementById("empIdL").value);
    if (!Number.isInteger(empid) || empid < 1 || empid > emp.length) {
        document.getElementById("message").textContent = "Invalid Employee ID";
        return;
    }

    let start = document.getElementById("start").value;

    if (!/^\d+$/.test(start)) {
        document.getElementById("message").textContent = "Invalid Start Date";
        return;
    }
    else {
        start = Number(start);

        if (start < 1 || start > 30) {
            document.getElementById("message").textContent = "Invalid Start Date";
            return;
        }
    }
    let end = document.getElementById("end").value;

    if (!/^\d+$/.test(end)) {
        document.getElementById("message").textContent = "Invalid End Date";
        return;
    }
    else {
        end = Number(end);

        if (end < start || end > 30 || ((start == end) && end % 7 == 0)) {
            document.getElementById("message").textContent = "Invalid End Date";
            return;
        }
    }

    let arr = []
    for (let i = start; i <= end; i++) {
        if (emp[empid - 1][3].includes(i)) {
            document.getElementById("message").textContent = "Overlap Date";
            return;
        }
        let thirtyPer = Math.floor(emp.length * 0.3);
        if (absent[i - 1] >= thirtyPer) {
            document.getElementById("message").textContent = "Team Short";
            return;
        }

    }
    for (let i = start; i <= end; i++) {
        if (i % 7 != 0) {
            arr.push(i);
            absent[i - 1] += 1;
        }
    }
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        emp[empid - 1][3].push(arr[i]);
        temp.push(arr[i]);
    }

    leave[leaveid++] = [empid, temp];

    document.getElementById("leaveIDS").innerHTML = "Leave ID: " + (leaveid - 1) + " Leave Granted for " + arr + " days <br>" + document.getElementById("leaveIDS").innerHTML;
    return;

})

document.getElementById("leaveCBtn").addEventListener("click", function () {

    let idL = Number(document.getElementById("leaveId").value);
    if (!Number.isInteger(idL) || 1 > idL || idL >= leave.length || leave[idL] == null) {
        document.getElementById("message").textContent = "Invalid Leave ID";
        return;
    }

    let id = leave[idL][0];
    let arr = leave[idL][1];

    emp[id - 1][3] = emp[id - 1][3].filter(x => !arr.includes(x));
    

    for (let i = 0; i < arr.length; i++) {
        absent[arr[i] - 1]--;
    }

    leave[idL] = null;
    document.getElementById("message").textContent = "Leave Cancel for " + emp[id - 1][1] + " for days: " + arr;

    document.getElementById("leaveIDS").innerHTML = "Leave cancel for " + emp[id - 1][1] + " for days " + arr + " <br>" + document.getElementById("leaveIDS").innerHTML;
    return;

})