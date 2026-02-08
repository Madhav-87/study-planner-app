import React, { useEffect, useState } from 'react'
import './Dashboard.css';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { upload } from '@testing-library/user-event/dist/upload';
import Loader from './components/Loader';
import StudyPlan from './StudyPlan';
import {isMobile} from "react-device-detect"
export default function DashBoard() {
  const navigate = useNavigate();
  let [createPlan, setPlan] = useState(false);
  let [plans, setlistPlans] = useState(false);
  let [pdf, setpdf] = useState(null);
  let [loader,setLoader]=useState(false);
  let [view,setView]=useState(false);
  let [studyPlan,setStudyPlan]=useState(null);

  let [inputData, setInputData] = useState({
    subjects: "",
    examDate: "",
    hoursPerDay: "",
    learningStyle: "",
    todayDate:new Date().toISOString().slice(0, 10),
    pdfFile: pdf
  })
  const updateData = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let obj = { ...inputData };
    obj[name] = value;
    setInputData(obj);

  }
  useEffect(()=>{
    if(view===false){
    clearStorage()
  }
  },[view]);
  function clearStorage(){
    localStorage.removeItem("hoursPerDay")
  }
  const submitForm = (e) => {
    e.preventDefault();
    if (!pdf) {
      toast.error("Upload Syllabus before submission..!");
      return;
    }
    setLoader(true);
    localStorage.setItem("subjects",(inputData.subjects).split(","));
    localStorage.setItem("examDate",inputData.examDate);
    localStorage.setItem("hoursPerDay",inputData.hoursPerDay);

    const formData=new FormData();
    formData.append("subjects", inputData.subjects);
    formData.append("examDate", inputData.examDate);
    formData.append("hoursPerDay", inputData.hoursPerDay);
    formData.append("learningStyle", inputData.learningStyle);
    formData.append("todayDate", inputData.todayDate);

    // file
    formData.append("syllabus", pdf); // 👈 KEY PART
    axios.post(`${process.env.REACT_APP_API}/chatbot/input`, formData).then((res) => {
      if (res.data.message === "Fail") {
        toast.error("Fail to load!");
      }
      else if(res.data.message==="Fail to process"){
        setLoader(false);
        toast.error("Please upload a text-based PDF.");
      }
      else {
        setLoader(false);
        setlistPlans(true);
        toast.success("Plan Generated..!");
        setStudyPlan(res.data.message);
      }

    }).catch((err) => {
      console.log(err);
      toast.error("Something is broken...!");
      setLoader(false);
    })
  }
  //--------Creating Form------------//

  //---------Ending of form component---------------------//
  function NoPlanBox() {
    return (
      <div className='no-plan-body'>
        <div className='no-plan-body-icon'>
          <span class="material-symbols-outlined">
            calendar_today
          </span>
        </div>
        <div>
          <h4>No Study Plans yet</h4>
        </div>
        <div className='subtxt'>
          create your first AI-powered study plan to get started
        </div>
      </div>
    )
  }


  return (
    <div >
      <ToastContainer/>
      <Header />
      {
        view
        ?
        (<StudyPlan studyPlan={studyPlan} view={view} setView={setView}></StudyPlan>)
        :
        null
      }

      {
        loader
        ?
        <Loader/>
        :
        null
      }
      <div className='dash-body'>
        <div className='login-title-section'>
          <div className='login-header'>
            Welcome back!
          </div>
          <div className='login-subtxt'>
            Create and manage your personalized study plans with AI assistance
          </div>
        </div>
        <div className='dash-box-section'>
          <div className='dash-box'>
            <div className='dash-txt-section'>
              <div className='dash-subtxt'>
                Total Plans limit
              </div>
              <div className='dash-icon'>
                <span class="material-symbols-outlined">
                  add
                </span>
              </div>
            </div>
            <div className='dash-icon'>
              1
            </div>
          </div>
          <div className='dash-box'>
            <div className='dash-txt-section'>
              <div className='dash-subtxt'>
                Active Plans limit
              </div>
              <div className='dash-icon'>
                <span class="material-symbols-outlined">
                  calendar_check
                </span>
              </div>
            </div>
            <div className='dash-icon'>
              1
            </div>
          </div>
          <div className='dash-box'>
            <div className='dash-txt-section'>
              <div className='dash-subtxt'>
                Study Hours limit
              </div>
              <div className='dash-icon'>
                <span class="material-symbols-outlined">
                  nest_clock_farsight_analog
                </span>
              </div>
            </div>
            <div className='dash-icon'>
              {localStorage.getItem("hoursPerDay")?localStorage.getItem("hoursPerDay"):0}
            </div>
          </div>
        </div>
        {
          createPlan
            ?
            <CreateForm
              inputData={inputData}
              updateData={updateData}
              setPlan={setPlan}
              submitForm={submitForm}
              pdf={setpdf} />
            :
            (
              <div className='start-btn-section'>
                <div className='create-btn' onClick={() => { setPlan(true) }}>

                  <span class="material-symbols-outlined">
                    add
                  </span>

                  <span>Create Plan</span>
                </div>
                <div className='pormodoro-btn' onClick={() => { navigate("/dashboard/timer") }}>

                  <span class="material-symbols-outlined">
                    bolt
                  </span>

                  <span>Start pormodoro</span>
                </div>
              </div>
            )
        }
        <div>
          {
            plans
              ?
              (
                <>
                  <div className='heading'>Your Study Plans</div>
                  <div className='plan-box'>
                    <div className='plan-box-plane1'>
                      <div className='sub-plan-txt'>{
                      localStorage.getItem("subjects").length>2
                      ?
                      `${localStorage.getItem("subjects").split(",")[0]+"..." }` 
                      :
                      localStorage.getItem("subjects")}</div>
                      <div className='plan-box-opt-section'>
                        <div className='plan-box-opt' onClick={()=>{setView(true)}}>
                          <span class="material-symbols-outlined">
                            visibility
                          </span>
                          {isMobile?null:<span>View</span>}
                        </div>
                        <div className='plan-box-opt'>
                          <span class="material-symbols-outlined">
                            download
                          </span>
                          {isMobile?null:<span>Download</span>}
                        </div>
                        <div className='plan-box-opt'>
                          <span class="material-symbols-outlined text-danger">
                            delete_forever
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='plan-box-plane2'>
                      <div className='d-flex gap-2'>
                        <div className='d-flex vertical-alignment-middle gap-1'>
                          <span class="material-symbols-outlined">
                            calendar_check
                          </span>
                          <span>Exam:</span>
                        </div>

                        <div>
                          {localStorage.getItem("examDate")}
                        </div>
                      </div>
                      <div >
                        <div className='timer-sec'>
                          <span class="material-symbols-outlined">
                            av_timer
                          </span>
                          <span>{localStorage.getItem("hoursPerDay")}hr/Day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
              :
              <NoPlanBox />
          }
        </div>
      </div>
    </div>
  )
}
function CreateForm({ updateData, inputData, setPlan, submitForm, pdf }) {
  const handlePDF = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.type !== 'application/pdf') {
      toast.error("Upload pdf file format only...!");
      return;
    }
    pdf(file)
  }
  return (
    <div className='form-body'>
      <div className='form-heading'>Create New Study Plan</div>
      <form onSubmit={(event) => { submitForm(event) }}>
        <div className='form-div'>
          <label>Subjects (Comma-separted)</label>
          <input
            type='text'
            placeholder='e.g., Physics, Chemistry, Mathematics'
            name="subjects"
            onChange={(e) => { updateData(e) }}
            value={inputData.subjects}
          />
        </div>
        <div className='form-div form-div-middle'>
          <div className='w-50'>
            <label>Exam Date</label>
            <input
              type="date"
              placeholder='e.g., Physics, Chemistry, Mathematics'
              name="examDate"
              onChange={(e) => { updateData(e) }}
              value={inputData.examDate}
            />
          </div>
          <div className='w-50'>
            <label>Hours Per Day</label>
            <input
              type='number'
              name='hoursPerDay'
              onChange={(e) => { updateData(e) }}
              value={inputData.hoursPerDay}
            />
          </div>
        </div>
        <div className='form-div form-div-middle'>
          <div className='w-100'>
            <label>Upload Syllabus in pdf format</label>
            <input
              type="file"
              className="file-input"
              accept='application/pdf'
              name="syllabus"
              onChange={(e) => { handlePDF(e) }}
            />
          </div>
        </div>
        <div className='form-div'>
          <label>Learning Style</label>
          <select
            name="learningStyle"
            value={inputData.learningStyle}
            onChange={(e) => { updateData(e) }}
          >
            <option value="">--- Select Learning Style ---</option>
            <option value="Learn by seeing">Learn by seeing</option>
            <option value="Learn by listening">Learn by listening</option>
            <option value="Learn by doing">Learn by doing</option>
            <option value="Learn by reading">Learn by reading</option>
          </select>
        </div>
        <div className='w-100 form-btn'>
          <button className='gen-btn'>Generate Study Plan</button>
          <button type="button" className='gen-btn cancl-btn' onClick={() => { setPlan(false) }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
