



const fs = require("fs");
const path = require("path");

// Folder path
const folderPath = path.join(__dirname, "students");

// Create folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log("Students folder created.");
}

// File paths
const filePath = path.join(folderPath, "students.txt");
const renamedFilePath = path.join(folderPath, "student-list.txt");

// Student names
const students = `Bharani
Rahul
Priya
Arun
Divya`;

// Create students.txt
fs.writeFileSync(filePath, students);
console.log("students.txt created.");

// Read and display contents
const data = fs.readFileSync(filePath, "utf8");
console.log("\nStudent List:");
console.log(data);

// Append one new student
fs.appendFileSync(filePath, "\nKarthik");
console.log("\nNew student appended.");

// Display updated contents
const updatedData = fs.readFileSync(filePath, "utf8");
console.log("\nUpdated Student List:");
console.log(updatedData);

// Rename the file
fs.renameSync(filePath, renamedFilePath);
console.log("\nFile renamed to student-list.txt");

// Delete the file
fs.unlinkSync(renamedFilePath);
console.log("student-list.txt deleted.");