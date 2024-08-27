import fs from 'fs';
import path from 'path';

const handler = async (req, res) => {
    const { page = 1, limit = 10, filterDifficulty, filterCompanyName, filterTagName, sortField = 'id', sortOrder = 'asc' } = req.query;
    const filePath = path.join(process.cwd(), 'tableData/response.json');
    const fileData = await fs.promises.readFile(filePath, 'utf-8');
    const data = await JSON.parse(fileData);

    let questions = Object.values(data);

    if (filterDifficulty) {
        questions = questions.filter(question => question.difficulty === filterDifficulty);
    }

    if (filterCompanyName) {
        questions = questions.filter(question => question.companyNames.includes(filterCompanyName));
    }

    if (filterTagName) {
        questions = questions.filter(question => question.title.toLowerCase().includes(filterTagName.toLowerCase()))
    }

    // Apply sorting
    questions.sort((a, b) => {
        if (sortField === 'difficulty') {
            const difficulties = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3 };
            return (difficulties[a.difficulty] - difficulties[b.difficulty]) * (sortOrder === 'asc' ? 1 : -1);
        } else if (sortField === 'frequencyCount' || sortField === 'id') {
            return (a[sortField] - b[sortField]) * (sortOrder === 'asc' ? 1 : -1);
        } else if (sortField === 'title') {
            return (a.title.localeCompare(b.title)) * (sortOrder === 'asc' ? 1 : -1);
        }
    });

    const total = questions.length;
    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    const paginatedQuestions = questions.slice(start,end);
    res.status(200).json({ total, questions: paginatedQuestions, page: parseInt(page), limit: parseInt(limit) });
}

export default handler