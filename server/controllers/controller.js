import { chatbot } from '../services/chatbot/genSchedule.js';
const {handlePdf}=await import('../services/pdfExtractor.cjs');
export async function controller(req, res,next) {
    try {
        const text = await handlePdf(req,res,next);
        if(text==="fail to process!"){
            res.status(200).json({message:"Fail to process"})
        }
        const result = await chatbot(req.body,text,next);
        if (result) {
            res.status(200).json({ message: result });
        }
        else {
            res.status(500).json({ message: "Fail" });
        }
    }
    catch (err) {
        next(err);
    }
}
export async function sendMessage(req,res){
    res.status(200).json({data:"Server is listening"})
}