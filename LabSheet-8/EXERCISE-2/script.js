const student = {
  id: "CSE4004",
  name: "Mohammed Adil",
  department: "Artificial Intelligence ",
  marks: 88
};

const { id, name, department, marks } = student;

console.log("ORIGINAL STUDENT DETAILS: ");
console.log(`ID         : ${id}`);
console.log(`Name       : ${name}`);
console.log(`Department : ${department}`);
console.log(`Marks      : ${marks}`);
console.log("\n");

const getGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const updatedStudent = {
  ...student,
  grade: getGrade(marks)
};

console.log("UPDATED STUDENT OBJECT: ");
console.log(updatedStudent);