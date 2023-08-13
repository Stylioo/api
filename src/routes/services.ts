import express from "express"

const router = express.Router()

router.get('/health', (req, res) => {
    res.status(200).json('service router is alive and healthy');
})


router.get('/',)
router.post('/',)
router.get('/:id',)
router.delete('/:id',)
router.patch('/:id',)


export default router