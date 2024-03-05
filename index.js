const express = require ('express');
const app = express();

app.use(express.json());

const student = [
    { id: 1, name: 'John', age: 34 }, 
    { id: 2, name: 'July', age: 34 }, 
    { id: 3, name: 'Tara', age: 34 }, 
    { id: 4, name: 'Natasha', age: 34 }, 
    { id: 5, name: 'James', age: 34 }, 
    { id: 6, name: 'Bea', age: 34 }, 
    { id: 7, name: 'Aqua', age: 34 }
];

app.get('/api/students', (req, res) => {
    res.send(student);
});

app.get('/api/students/:id', (req, res) => {
    const stud = student.find(c => c.id === parseInt(req.params.id));
    if(!stud) res.status(404).send('The student with given id is not found');
    res.send(stud);
});

app.post('/api/students', (req, res) => {
    if(!req.body.name || req.body.length < 3){
        res.status(404).send('Name should not be empty or minimum of 3 characters');
        return;
    }
    const stud = {
        id: student.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    student.push(stud);
    res.status(200).send('New Information Added');
});

app.put('/api/students/:id', (req, res) => {
    const stud = student.find(c => c.id === parseInt(req.params.id));
    if(!stud) res.status(404).send('The student with given id is not found');

    stud.name = req.body.name;
    stud.age = req.body.age;
    res.status(200).send('Update Successfully')
});

app.delete('/api/students/:id', (req, res) => {
    const stud = student.find(c => c.id === parseInt(req.params.id));
    if(!stud) res.status(404).send('The student with given id is not found');

    const index = student.indexOf(stud);
    student.splice(index, 1);

    res.status(200).send('Delete Successfully');
});

app.listen(3000, () => console.log('Listening on port 3000...'));