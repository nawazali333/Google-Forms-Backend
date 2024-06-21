"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
const dbPath = path_1.default.join(__dirname, 'db.json');
// Middleware
app.use(body_parser_1.default.json());
// Helper function to read the JSON file
const readDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_extra_1.default.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading the database file:', error);
        return [];
    }
});
// Helper function to write to the JSON file
const writeDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_extra_1.default.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    }
    catch (error) {
        console.error('Error writing to the database file:', error);
    }
});
// Ping endpoint
app.get('/ping', (req, res) => {
    res.send(true);
});
// Submit endpoint
app.post('/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('All fields are required.');
    }
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    const submissions = yield readDB();
    submissions.push(newSubmission);
    yield writeDB(submissions);
    res.send('Submission successful');
}));
// Read endpoint
app.get('/read', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const index = parseInt(req.query.index);
    if (isNaN(index) || index < 0) {
        return res.status(400).send('Invalid index.');
    }
    const submissions = yield readDB();
    if (index >= submissions.length) {
        return res.status(404).send('Submission not found.');
    }
    res.json(submissions[index]);
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
