const fs = require("fs-extra");
const path = require("path");
const pdf = require("pdf-parse");
const Tesseract = require("tesseract.js");
const pdfPoppler = require("pdf-poppler");

const handlePdf=async (req,res)=>{
    try{
        const filePath=req.file.path;
        const buffer=fs.readFileSync(filePath);
        const data=await pdf(buffer);
        
        let extractedTxt=data.text.trim();
        if(extractedTxt.length<100){
            extractedTxt=await runOCR(filePath);
        }
        return extractedTxt;
    }
    catch(err){
        console.log(err);
    }
}
async function runOCR(pdfPath){
   const imageDir="temp-images";
   await fs.ensureDir(imageDir);
    
   const options={
    format:"png",
    out_dir:imageDir,
    out_prefix:"page",
    page:null
   }

   //Convert PDF -> images

   await pdfPoppler.convert(pdfPath,options);
   const images=fs.readdirSync(imageDir);
   let fullText="";

   //OCR each page

   for(const img of images){
    const imgPath=path.join(imageDir,img);
    const result=await Tesseract.recognize(
        imgPath,
        "eng",
        {logger:m=>console.log(m.status)}
    );
    fullText +=result.data.text+"\n";
   }

   //cleanUp
   fs.removeSync(imageDir);

    return fullText;
}
module.exports={
    handlePdf
}