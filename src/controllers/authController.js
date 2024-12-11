
import router from '../router/index.js';

router.get('/auth', async (req, res) => {
    try {
        console.log('auth');
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});