const students = [
    { name: "Ali", scores: [90, 85, 92] },
    { name: "Davud", scores: [100, 100, 100] },
    { name: "Mammal", scores: [75, 80, 85] },
    { name: "Camil", scores: [90, 95, 85] },
  ];
  
  const averageScores = students.map(student => {
    const total = student.scores.reduce((acc, score) => acc + score, 0);
    const average = total / student.scores.length;
    return average;
  });
  
  console.log(averageScores);  
  