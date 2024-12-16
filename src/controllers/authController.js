import bodyParser from 'body-parser';
import router from '../router/index.js';
import { changePassword } from '../repository/authRepo.js';

router.get('/auth', async (req, res) => {
    try {
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

router.post('/auth/change-password', bodyParser.json(), async (req, res) => {
    const { newPassword, userEmail } = req.body;
    try {
        await changePassword(userEmail, newPassword);
        res.send({ message: 'Password changed'});
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal server error: ${error.message}`);
    }

})

export default router;