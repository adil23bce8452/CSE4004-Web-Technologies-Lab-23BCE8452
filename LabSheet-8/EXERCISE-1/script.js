const studentName = "Mohammed Adil";
const subjectMarks = [88, 92, 79, 95, 86];

const calculateTotal = (marksArray) => marksArray.reduce((acc, current) => acc + current, 0);
const calculateAverage = (total, count) => total / count;

let totalMarks = calculateTotal(subjectMarks);
let averageMarks = calculateAverage(totalMarks, subjectMarks.length);

const formattedMessage = `
Student Name  : ${studentName}
Total Marks   : ${totalMarks}
Average Marks : ${averageMarks.toFixed(2)}
`;

console.log(formattedMessage);