const express = require('express');
const mongoose = require('mongoose');
const Sale = require('./models/Sale');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://wkblzmn:wkblzmn@cluster0.ef1psze.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/sales/total-revenue', async (req, res) => {
    try {
        const totalRevenue = await Sale.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: { $multiply: ['$quantity', '$price'] },
                    },
                },
            },
        ]);

        if (totalRevenue.length === 0) {
            return res.status(404).json({ message: 'No sales data found' });
        }

        res.json({ totalRevenue: totalRevenue[0].total });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


