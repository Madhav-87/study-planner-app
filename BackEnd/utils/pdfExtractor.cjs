const fs = require("fs-extra");
const path = require("path");
const pdf = require("pdf-parse");

const handlePdf=async (req,res)=>{
    try{
        const filePath=req.file.path;
        const buffer=fs.readFileSync(filePath);
        const data=await pdf(buffer);
        
        let extractedTxt=data.text.trim();
        if(extractedTxt.length<100){
            return "fail to process!"
        }
        return extractedTxt;
    }
    catch(err){
        console.log(err);
    }
}
module.exports={
    handlePdf
}