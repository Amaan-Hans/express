const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001; // Use the environment port if available, otherwise use 3001

// Middleware
app.use(express.json());

// Sample data (replace with your actual data)
const cars = require('./api/doCarThings/cars.json');

// Routes
// Get all cars
app.get('/api/doCarThings/cars', (req, res) => {
    res.json(cars);
});

// Get car by id
app.get('/api/doCarThings/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    if (!car) {
        res.status(404).json({ error: 'Car not found' });
    } else {
        res.json(car);
    }
});

// Update car
app.put('/api/doCarThings/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Car not found' });
    } else {
        cars[index] = updatedCar;
        res.json(updatedCar);
    }
});

// Delete car
app.delete('/api/doCarThings/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Car not found' });
    } else {
        cars.splice(index, 1);
        res.json({ message: `Car with id ${id} deleted` });
    }
});

// Add car
app.post('/api/doCarThings/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
