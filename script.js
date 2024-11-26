class Animal {
    constructor(name, image, location, size) {
      this.name = name;
      this.image = image;
      this.location = location;
      this.size = size;
    }
  }
  
  class Table {
    constructor(tableId, sortFields, nameStyle) {
      this.tableId = tableId;
      this.animals = [];
      this.sortFields = sortFields;
      this.nameStyle = nameStyle;
      this.defaultImage = "https://via.placeholder.com/100"; // Default placeholder image
    }
  
    addAnimal(animal) {
      // Prevent duplicates by checking the name
      if (this.animals.some((a) => a.name.toLowerCase() === animal.name.toLowerCase())) {
        alert("Animal with this name already exists!");
        return;
      }
  
      // Validate that size is a positive number
      if (isNaN(animal.size) || animal.size <= 0) {
        alert("Size must be a valid positive number!");
        return;
      }
  
      // Add the new animal and re-render the table
      this.animals.push(animal);
      this.renderTable();
    }
  
    deleteAnimal(index) {
      this.animals.splice(index, 1); // Remove animal at the specified index
      this.renderTable(); // Re-render the table
    }
  
    editAnimal(index) {
      const animal = this.animals[index];
      const newName = prompt("Enter new name:", animal.name);
      const newLocation = prompt("Enter new location:", animal.location);
      const newSize = prompt("Enter new size:", animal.size);
  
      if (!newName || isNaN(newSize) || newSize <= 0) {
        alert("Invalid input!");
        return;
      }
  
      animal.name = newName;
      animal.location = newLocation;
      animal.size = parseInt(newSize, 10);
      this.renderTable();
    }
  
    sortTable(field) {
      this.animals.sort((a, b) => (a[field] > b[field] ? 1 : -1));
      this.renderTable();
    }
  
    renderTable() {
      const table = document.getElementById(this.tableId);
      table.innerHTML = `
        <thead>
          <tr>
            <th>Image</th>
            ${
              this.sortFields.includes("name")
                ? `<th onclick="tables['${this.tableId}'].sortTable('name')">Name</th>`
                : `<th>Name</th>`
            }
            ${
              this.sortFields.includes("location")
                ? `<th onclick="tables['${this.tableId}'].sortTable('location')">Location</th>`
                : `<th>Location</th>`
            }
            ${
              this.sortFields.includes("size")
                ? `<th onclick="tables['${this.tableId}'].sortTable('size')">Size</th>`
                : `<th>Size</th>`
            }
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.animals
            .map(
              (animal, index) => `
            <tr>
              <td>
                <img src="${animal.image}" class="bordered-image" alt="${animal.name}">
              </td>
              <td class="${this.nameStyle}">${animal.name}</td>
              <td>${animal.location}</td>
              <td>${animal.size}</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="tables['${this.tableId}'].editAnimal(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="tables['${this.tableId}'].deleteAnimal(${index})">Delete</button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      `;
    }
  }
  
  const tables = {
    bigCatsTable: new Table("bigCatsTable", ["name", "location", "size"], ""),
    dogsTable: new Table("dogsTable", ["name", "location"], "bold-text"),
    bigFishTable: new Table("bigFishTable", ["size"], "blue-italic-text"),
  };
  
  // Initialize tables with example data
  tables.bigCatsTable.addAnimal(new Animal("Tiger", "images/Big Cats/Tiger.png", "Asia", 10));
  tables.bigCatsTable.addAnimal(new Animal("Lion", "images/Big Cats/Lion.png", "Africa", 8));
  tables.bigCatsTable.addAnimal(new Animal("Leopard", "images/Big Cats/Leopard.png", "Africa and Asia", 5));
  tables.bigCatsTable.addAnimal(new Animal("Cheetah", "images/Big Cats/Cheetah.png", "Africa", 5));
  tables.bigCatsTable.addAnimal(new Animal("Caracal", "images/Big Cats/Caracal.png", "Africa", 3));
  tables.bigCatsTable.addAnimal(new Animal("Jaguar", "images/Big Cats/Jaguar.png", "Amazon", 5));

  tables.dogsTable.addAnimal(new Animal("Rotwailer", "images/Dogs/Rotwailer.png", "Germany", 2));
  tables.dogsTable.addAnimal(new Animal("German Shepherd", "images/Dogs/German Shepherd.png", "Germany", 2));
  tables.dogsTable.addAnimal(new Animal("Labrodar", "images/Dogs/Labrodar.png", "UK", 2));
  tables.dogsTable.addAnimal(new Animal("Alabai", "images/Dogs/Alabai.png", "Turkey", 4));

  tables.bigFishTable.addAnimal(new Animal("Humpback Whale", "images/Big Fish/Humpback Whale.png", "Atlantic Ocean", 15));
  tables.bigFishTable.addAnimal(new Animal("Killer Whale", "images/Big Fish/Killer Whale.png", "Atlantic Ocean", 12));
  tables.bigFishTable.addAnimal(new Animal("Tiger Shark", "images/Big Fish/Tiger Shark.png", "Ocean", 8));
  tables.bigFishTable.addAnimal(new Animal("Hammerhead Shark", "images/Big Fish/Hammerhead Shark.png", "Ocean", 8));
  
  // Function to add animals via prompt
  function addAnimalPrompt(tableKey) {
    const name = prompt("Enter name:");
    if (!name) {
      alert("Name is required!");
      return;
    }
  
    const image = prompt("Enter image URL (or leave blank for default):") || tables[tableKey].defaultImage;
    const location = prompt("Enter location:");
    const size = prompt("Enter size:");
  
    if (!location || isNaN(size) || size <= 0) {
      alert("Valid location and size are required!");
      return;
    }
  
    tables[tableKey].addAnimal(new Animal(name, image, location, parseInt(size, 10)));
  }
  