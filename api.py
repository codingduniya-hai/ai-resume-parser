from fastapi import FastAPI,UploadFile ,File , Form

from  fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil

from day5.resume_pdf import read_resume, parse_resume,final_score,job


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173","http://127.0.0.1:5173","https://ai-resume-parser-gold.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_resume(
    resume:UploadFile = 
File(...),
    job_description:str = 
    Form(...)
):
  
  upload_folder = Path("temp_resumes")

  upload_folder.mkdir(exist_ok=True
                      )
  file_path = upload_folder / resume.filename

  file_content = await resume.read()
  print("UPLOAD FILE SIZE:",len (file_content))
  print("Filenmae:",resume.filename)

  with open(file_path, "wb") as buffer:

    buffer.write(file_content)
    print("file size:" , file_path.stat().st_size)
    print("file path:",file_path)

    resume_text = read_resume(file_path)
    print("RESUME TEXT:",resume_text[:1000])
    if not resume_text:
      return {
        "error": "could not read resume"
      }
    parsed_resume = parse_resume(resume_text)
    print("PARSED RESUME:", parsed_resume)
    result = final_score(job_description,
                         parsed_resume)
    return {
      "name":
      parsed_resume.name,
      "email":
      parsed_resume.email,
      "phone":
      parsed_resume.phone,
      "experience":
      parsed_resume.total_experience_years,
      "skills":
      parsed_resume.skills,
      "education":
      parsed_resume.education,
      "score":result.score,
      "details":result.details
    }
    