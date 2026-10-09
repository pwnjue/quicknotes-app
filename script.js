
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

function loadNotes() {
    try {
        const savedNotes = localStorage.getItem("quickNotes");

        if (savedNotes) {
            const parsedNotes = JSON.parse(savedNotes);

            if (Array.isArray(parsedNotes)) {
                return parsedNotes;
            }
        }
    } catch (error) {
        console.error("Could not load saved notes:", error);
    }

    return [];
}

let notes = loadNotes();

// Save the notes array to localStorage
function saveNotes() {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
}

// Display notes, applying the search filter
function render() {
    notesList.textContent = "";

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredNotes = notes.filter(function(note) {
        return note.text.toLowerCase().includes(searchTerm);
    });

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = "You have " + notes.length + " notes.";
    }

    if (filteredNotes.length === 0 && searchTerm !== "") {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        notesList.appendChild(message);
        return;
    }

    filteredNotes.forEach(function(note) {
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

        deleteButton.addEventListener("click", function() {
            notes = notes.filter(function(item) {
                return item.id !== note.id;
            });

            saveNotes();
            render();
        });

        listItem.appendChild(noteText);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(dateLabel);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });
}

// Add a note
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

    saveNotes();

    errorMessage.textContent = "";
    noteInput.value = "";

    render();
});

// Search as the user types
searchInput.addEventListener("input", render);

// Show saved notes when the page opens
render();