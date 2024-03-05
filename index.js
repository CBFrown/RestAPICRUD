const express = require ('express');
const app = express();

app.use(express.json());

const employee = [
    { id: 1, name: 'John', age: 34 }, 
    { id: 2, name: 'July', age: 34 }, 
    { id: 3, name: 'Tara', age: 34 }, 
    { id: 4, name: 'Natasha', age: 34 }, 
    { id: 5, name: 'James', age: 34 }, 
    { id: 6, name: 'Bea', age: 34 }, 
    { id: 7, name: 'Aqua', age: 34 }
];

app.get('/api/employee', (req, res) => {
    res.send(employee);
});

app.get('/api/employee/:id', (req, res) => {
    const employ = employee.find(c => c.id === parseInt(req.params.id));
    if(!employ) res.status(404).send('The employee with given id is not found');
    res.send(employ);
});

app.post('/api/employee', (req, res) => {
    if(!req.body.name || req.body.length < 3){
        res.status(404).send('Name should not be empty or minimum of 3 characters');
        return;
    }
    const employ = {
        id: employee.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    employee.push(employ);
    res.status(200).send('New Information Added');
});

app.put('/api/employee/:id', (req, res) => {
    const employ = employee.find(c => c.id === parseInt(req.params.id));
    if(!employ) res.status(404).send('The employee with given id is not found');

    employ.name = req.body.name;
    res.status(200).send('Update Successfully')
});

app.delete('/api/employee/:id', (req, res) => {
    const employ = employee.find(c => c.id === parseInt(req.params.id));
    if(!employ) res.status(404).send('The employee with given id is not found');

    const index = employee.indexOf(employ);
    employee.splice(index, 1);

    res.status(200).send('Delete Successfully');
});

app.listen(3000, () => console.log('Listening on port 3000...'));