
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// Store notes in an array
let notes = [];

// Display notes on the page
function render() {
    notesList.textContent = "";

    notes.forEach(function(note) {
        const listItem = document.createElement("li");
        listItem.classList.add(
            "category-" + note.category.toLowerCase()
        );

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = "Category: " + note.category;

        const dateLabel = document.createElement("small");
        dateLabel.textContent = "Created: " + note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        listItem.appendChild(noteText);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(dateLabel);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = "You have " + notes.length + " notes.";
    }
}

// Add a new note
noteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = noteInput.value.trim();

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    const note = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    errorMessage.textContent = "";
    noteInput.value = "";

    render();
});

// Initial display
render();