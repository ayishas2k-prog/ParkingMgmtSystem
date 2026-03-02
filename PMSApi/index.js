const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const userRoutes = require('./src/routes/userRoutes');
const userProfileRoutes = require('./src/routes/userProfileRoutes');
const vehicleInOutRoutes = require('./src/routes/vehicleInOutRoutes');
const vehicleInfoRoutes = require('./src/routes/vehicleInfoRoutes');
const parkingSlotInfoRoutes = require('./src/routes/parkingSlotInfoRoutes');
const parkingSlotRoutes = require('./src/routes/parkingSlotRoutes');
const gateRoutes = require('./src/routes/gateRoutes');
const ruleRoutes = require('./src/routes/ruleRoutes');

app.use(cors());
app.use(express.json({limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api/vehicles/inout', vehicleInOutRoutes);
app.use('/api/vehicles/info', vehicleInfoRoutes);
app.use('/api/parking/slots/info', parkingSlotInfoRoutes);
app.use('/api/parking/slots', parkingSlotRoutes);
app.use('/api/gates', gateRoutes);
app.use('/api/rules', ruleRoutes);


app.get('/', (req, res) => {
  res.send(`NPR API is running!!! ${req.hostname} on port ${process.env.PORT || 3000} ..`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
