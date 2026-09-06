import 'dotenv/config';
import app, { connectDB } from './app.js';

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✔ Chem-X API server running at http://localhost:${PORT}`);
  });
}

start();
