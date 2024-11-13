// Select all elements
const main = document.querySelector("main");
const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector("button");
const section = document.querySelector("section");

// Create error message element
const errorMessage = document.createElement("p");
errorMessage.textContent = "Please enter your text 🗒";
errorMessage.style.cssText = `
  color: red;
  display: none;
  font-style: italic;
`;
main.appendChild(errorMessage);

// Add Todo Item Functionality
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputText = input.value.trim();
  
  if (inputText === "") {
    showErrorMessage(); // Show error message if input is empty
    return;
  }

  hideErrorMessage(); // Hide error message when input is valid

  // Create new todo item elements
  const todoItem = createTodoItem(inputText);
  section.appendChild(todoItem);

  // Clear input field and focus back to it
  input.value = "";
  input.focus();
});

// Function to show error message
function showErrorMessage() {
  errorMessage.style.display = "block";
  input.value = "";  // Clear input field
  input.focus();     // Focus back to input for better UX
}

// Function to hide error message
function hideErrorMessage() {
  errorMessage.style.display = "none";
}

// Function to create and return a new todo item element
function createTodoItem(text) {
  // Create elements for the todo item
  const paragraph = document.createElement("p");
  const spanText = document.createElement("span");
  const iconSpan = document.createElement("span");
  const deleteIcon = document.createElement("span"); // New delete icon

  // Set content for the todo item
  spanText.innerText = text;
  iconSpan.innerHTML = "<i class='fa fa-check'></i>";
  deleteIcon.innerHTML = "<i class='fa fa-trash'></i>"; // FontAwesome delete icon

  // Add delete icon styling (optional)
  deleteIcon.style.cssText = `
    color: red;
    margin-left: 15px;
    cursor: pointer;
  `;

  // Append elements
  paragraph.appendChild(spanText);
  paragraph.appendChild(iconSpan);
  paragraph.appendChild(deleteIcon); // Add delete icon to the todo item

  // Add event listener to toggle completed class
  paragraph.addEventListener("click", () => {
    paragraph.classList.toggle("completed");
  });

  // Prevent event propagation when clicking the icon
  iconSpan.addEventListener("click", (e) => {
    e.stopPropagation();
    paragraph.classList.toggle("completed");
  });

  // Add event listener to enable editing when double-clicked
  spanText.addEventListener("dblclick", () => {
    enableEditing(spanText, paragraph);
  });

  // Add delete functionality
  deleteIcon.addEventListener("click", (e) => {
    e.stopPropagation();  // Prevent click from triggering paragraph toggle
    paragraph.remove();   // Remove the todo item from the list
  });

  return paragraph;
}

// Function to enable editing of a todo item
function enableEditing(spanText, paragraph) {
  const currentText = spanText.innerText;

  // Create an input field for editing
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentText;
  paragraph.replaceChild(editInput, spanText); // Replace span with input

  // Focus on the edit input field
  editInput.focus();

  // Update the todo item when the user finishes editing (blur or enter)
  editInput.addEventListener("blur", () => {
    saveEditedText(editInput, spanText, currentText, paragraph);
  });

  // Save on pressing 'Enter'
  editInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEditedText(editInput, spanText, currentText, paragraph);
    }
  });
}

// Function to save the edited text
function saveEditedText(editInput, spanText, currentText, paragraph) {
  const newText = editInput.value.trim();
  if (newText !== "") {
    spanText.innerText = newText; // Update text with new value
  } else {
    spanText.innerText = currentText; // Revert to old value if input is empty
  }
  paragraph.replaceChild(spanText, editInput); // Replace input with updated span
}

// Enable/Disable button based on input field state
input.addEventListener("input", () => {
  button.disabled = input.value.trim() === "";
});
