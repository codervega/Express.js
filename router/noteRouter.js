const {Router}=require("express")
const {createNote,fetchSingleData,deletedata,updatedata}=require('../Controller/noteController')


const router=Router()
router.post('/notes',createNote)
router.get('/notes/:id',fetchSingleData)
router.delete('/notes/:id',deletedata)
router.put('/notes/:id',updatedata)

module.exports=router;

module.exports=router;