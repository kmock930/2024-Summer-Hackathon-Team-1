"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});
app.get('/users', (req, res) => {
    res.status(200).json({ user: 'abc' });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
app.use('/api', apiRoutes_1.default);
