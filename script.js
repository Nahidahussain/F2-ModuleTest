// Students array
const students = [
  { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
  { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
  { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
];

// Global variables
let isEditMode = false;
let currentStudentId = null;

// DOM elements
const studentsTableBody = document.getElementById('students-table-body');
const studentForm = document.getElementById('student-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const gradeInput = document.getElementById('grade');
const degreeInput = document.getElementById('degree');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-button');
const searchInput = document.getElementById('search-input');

// Display students in the table
function displayStudents() {
  studentsTableBody.innerHTML = '';

  for (const student of students) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.ID}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.degree}</td>
      <td>${student.email}</td>
      <td class="actions">
        <button class="edit-button" data-id="${student.ID}">Edit</button>
        <button class="delete-button" data-id="${student.ID}">Delete</button>
      </td>
    `;
    studentsTableBody.appendChild(row);
  }
}

// Clear form inputs
function clearFormInputs() {
  nameInput.value = '';
  ageInput.value = '';
  gradeInput.value = '';
  degreeInput.value = '';
  emailInput.value = '';
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const name = nameInput.value;
  const age = parseInt(ageInput.value);
  const grade = gradeInput.value;
  const degree = degreeInput.value;
  const email = emailInput.value;

  if (isEditMode) {
    // Update existing student
    const student = students.find((s) => s.ID === currentStudentId);
    if (student) {
      student.name = name;
      student.age = age;
      student.grade = grade;
      student.degree = degree;
      student.email = email;
    }
  } else {
    // Add new student
    const newStudent = {
      ID: students.length + 1,
      name,
      age,
      grade,
      degree,
      email
    };
    students.push(newStudent);
  }

  // Clear form inputs and switch back to add mode
  clearFormInputs();
  submitButton.innerText = 'Add Student';
  cancelButton.style.display = 'none';
  isEditMode = false;
  currentStudentId = null;

  // Re-display students and reattach event listeners
  displayStudents();
  attachEventListeners();
}

// Handle edit button click
function handleEditButtonClick(event) {
  const studentId = parseInt(event.target.dataset.id);
  const student = students.find((s) => s.ID === studentId);
  if (student) {
    // Fill form inputs with student data
    nameInput.value = student.name;
    ageInput.value = student.age;
    gradeInput.value = student.grade;
    degreeInput.value = student.degree;
    emailInput.value = student.email;

    // Switch to edit mode
    submitButton.innerText = 'Edit Student';
    cancelButton.style.display = 'inline';
    isEditMode = true;
    currentStudentId = studentId;
  }
}

// Handle delete button click
function handleDeleteButtonClick(event) {
  const studentId = parseInt(event.target.dataset.id);
  const studentIndex = students.findIndex((s) => s.ID === studentId);
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    displayStudents();
    attachEventListeners();
  }
}

// Attach event listeners
function attachEventListeners() {
  const editButtons = document.getElementsByClassName('edit-button');
  for (const button of editButtons) {
    button.addEventListener('click', handleEditButtonClick);
  }

  const deleteButtons = document.getElementsByClassName('delete-button');
  for (const button of deleteButtons) {
    button.addEventListener('click', handleDeleteButtonClick);
  }
}

// Handle search input
function handleSearchInput() {
  const searchText = searchInput.value.toLowerCase();
  const filteredStudents = students.filter((student) => {
    const nameMatch = student.name.toLowerCase().includes(searchText);
    const emailMatch = student.email.toLowerCase().includes(searchText);
    const degreeMatch = student.degree.toLowerCase().includes(searchText);
    return nameMatch || emailMatch || degreeMatch;
  });
  studentsTableBody.innerHTML = '';
  for (const student of filteredStudents) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.ID}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.degree}</td>
      <td>${student.email}</td>
      <td class="actions">
        <button class="edit-button" data-id="${student.ID}">Edit</button>
        <button class="delete-button" data-id="${student.ID}">Delete</button>
      </td>
    `;
    studentsTableBody.appendChild(row);
  }
  attachEventListeners();
}

// Attach form submission event listener
studentForm.addEventListener('submit', handleFormSubmit);

// Attach search input event listener
searchInput.addEventListener('input', handleSearchInput);

// Display initial students
displayStudents();

// Attach initial event listeners
attachEventListeners();
