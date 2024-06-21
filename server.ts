import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs-extra';
import path from 'path';

// Initialize the Express application
const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Helper function to read submissions from the database
const readSubmissions = async () => {
    try {
        const data = await fs.readFile(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper function to write submissions to the database
const writeSubmissions = async (submissions: any) => {
    try {
        await fs.writeFile(DB_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing to database', error);
    }
};

// Endpoint to check if the server is running
app.get('/ping', (req: Request, res: Response) => {
    res.send('true');
});

// Endpoint to submit a new form
app.post('/submit', async (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };

    const submissions = await readSubmissions();
    submissions.push(newSubmission);
    await writeSubmissions(submissions);

    res.status(201).send({ message: 'Submission successful!' });
});

// Endpoint to read a specific submission
app.get('/read', async (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);
    const submissions = await readSubmissions();

    if (index >= 0 && index < submissions.length) {
        res.send(submissions[index]);
    } else {
        res.status(404).send({ message: 'Submission not found' });
    }
});

// Root route to handle root URL
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running. Use /ping, /submit, or /read endpoints.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
