import { chatbot } from '../chatbot/genSchedule.js';
const {handlePdf}=await import('../utils/pdfExtractor.cjs');
export async function controller(req, res) {
    try {
        const text = await handlePdf(req,res);
        if(text==="fail to process!"){
            res.status(200).json({message:"Fail to process"})
        }
        const result = await chatbot(req.body, text);
        if (result) {
            res.status(200).json({ message: result });
        }
        else {
            res.status(500).json({ message: "Fail" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Fail" });
    }
}
export async function sendMessage(req,res){
    res.status(200).json({data:"Server is listening"})
}