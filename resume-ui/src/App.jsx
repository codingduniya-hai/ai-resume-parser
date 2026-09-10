 import { useState } from "react";
import "./App.css";

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [resume, setResume] = useState(null);
  const[activePage, setActivePage] = useState("Dashboard");
  const [jobDescription, setJobDescription] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleResume = (e) => {
    const file = e.target.files[0];

    if (file) {
      setResume(file);
    }
  };
   
  
  const handleAnalyze= async () => {
    if (!resume) {
    alert("Please upload your resume first.");
    return;
  }

  if (!jobDescription.trim()) {
    alert("Please enter a job description.");
    return;
  }

  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("job_description", jobDescription);

  try {
    const response = await fetch("https://ai-resume-parser-40sy.onrender.com/analyze", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const data = await response.json();

    console.log("Backend Response:", data);
    setAnalysisData(data);

    setAnalyzed(true);

    alert("Resume successfully sent to backend! 🚀");
  } catch (error) {
    console.error(error);
    alert("Backend se connection nahi ho raha.");
  }
};

  

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo-section">
          <div className="logo-icon">🤖</div>

          <div>
            <h2>ResumeAI</h2>
            <span>Smart Screening</span>
          </div>
        </div>
        <nav className="nav-menu">

  <div
    className={activePage === "Dashboard" ? "nav-item active" : "nav-item"}
    onClick={() => setActivePage("Dashboard")}
  >
    🏠 <span>Dashboard</span>
  </div>

  <div
    className={activePage === "History" ? "nav-item active" : "nav-item"}
    onClick={() => setActivePage("History")}
  >
    🕘 <span>History</span>
  </div>

  <div
    className={activePage === "Analytics" ? "nav-item active" : "nav-item"}
    onClick={() => setActivePage("Analytics")}
  >
    📊 <span>Analytics</span>
  </div>

  <div
    className={activePage === "Saved Results" ? "nav-item active" : "nav-item"}
    onClick={() => setActivePage("Saved Results")}
  >
    📁 <span>Saved Results</span>
  </div>

  <div
    className={activePage === "Settings" ? "nav-item active" : "nav-item"}
    onClick={() => setActivePage("Settings")}
  >
    ⚙️ <span>Settings</span>
  </div>

</nav>

        <div className="upgrade-card">
          <h3>👑 Upgrade to Pro</h3>
          <p>Unlock advanced AI insights and priority processing.</p>
          <button>Upgrade Now</button>
        </div>

      </aside>


      
      <main className="main-content">
        {activePage === "Dashboard" && (
          <>

        
        <header className="top-header">

          <div>
            <h1>Hi, Prince 👋</h1>
            <p>
              Upload a resume and job description to get AI-powered insights.
            </p>
          </div>

          <div className="profile">
            <div className="profile-circle">P</div>
            <span>Prince</span>
            <span>⌄</span>
          </div>

        </header>


        
        <section className="workspace">

          
          <div className="left-column">

            
            <div className="panel">

              <div className="panel-title">
                <span className="step-number">1</span>
                <h2>Upload Resume</h2>
              </div>

              <label className="upload-box">

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResume}
                  hidden
                />

                <div className="upload-icon">☁️</div>

                <h3>
                  {resume ? resume.name : "Drag & drop your resume here"}
                </h3>

                <p>
                  {resume
                    ? 
                   '$ {Math.round(resume.size / 1024)} KB'
                    : "or"}
                </p>

                <span className="browse-button">
                  {resume ? "Change File" : "Browse File"}
                </span>

                {!resume && (
                  <small>PDF files only</small>
                )}

              </label>

              {resume && (
                <div className="file-preview">
                  <div className="pdf-icon">📄</div>

                  <div className="file-info">
                    <strong>{resume.name}</strong>
                    <span>
                      {Math.round(resume.size / 1024)} KB
                    </span>
                  </div>

                  <div className="success">✓</div>
                </div>
              )}

            </div>


            
            <div className="panel">

              <div className="panel-title">
                <span className="step-number">2</span>
                <h2>Job Description</h2>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                maxLength={2000}
              />

              <div className="character-count">
                {jobDescription.length}/2000 characters
              </div>

            </div>


            
            <button
              className="analyze-button"
              onClick={handleAnalyze}
            >
              ✨ Analyze Resume
            </button>

            <div className="security">
              🔒 Your data is secure and confidential
            </div>

          </div>


          
          <div className="results-column">

            
            <div className="panel results-panel">

              <div className="results-header">
                <h2>✨ Analysis Results</h2>

                {analyzed && (
                  <button className="small-button">
                    ⬇ Download
                  </button>
                )}
              </div>

              {!analyzed ? (

                <div className="empty-results">
                  <div className="empty-icon">✨</div>
                  <h3>Your analysis will appear here</h3>
                  <p>
                    Upload your resume, add a job description,
                    and click Analyze Resume.
                  </p>
                </div>

              ) : (

                <>
                  <div className="score-section">

                    <div className="score-circle">
                      <strong>{analysisData?.score ?? 0}%
                     </strong>
                      <span>Match Score</span>
                    </div>

                    <div className="score-content">
                      <h2>Great Fit! 🎉</h2>

                      <p>
                        This candidate is a strong match for the role
                        based on skills, experience and job requirements.
                      </p>

                      <div className="stats">

                        <div>
                          <strong>{analysisData?.experience ?? 0}</strong>
                          <span>Years Experience</span>
                        </div>

                        <div>
                          <strong>{analysisData?.skills?.length ?? 0}</strong>
                          <span>Skills Found</span>
                        </div>

                        <div>
                          <strong>{analysisData?.details?.matching_skills?.length ??0}</strong>
                          <span>Matched Skills</span>
                        </div>

                      </div>
                    </div>

                  </div>


                  
                  <div className="result-grid">

                    
                    <div className="result-card">
                      <h2>👤 Candidate Information</h2>

                      <div className="info-row">
                        <span>Name</span>
                        <strong>{analysisData?.name ?? "unknown"}
                          </strong>
                      </div>

                      <div className="info-row">
                        <span>Email</span>
                        <strong>{analysisData?.email ?? "Not Provided"}</strong>
                      </div>

                      <div className="info-row">
                        <span>Phone</span>
                        <strong>{analysisData?.phone ?? "Not Provided"}</strong>
                      </div>

                      <div className="info-row">
                        <span>Location</span>
                        <strong>India</strong>
                      </div>
                    </div>


                    
                    <div className="result-card">
                      <h2>💡 Top Skills</h2>
                      <div className="tags">
                        <span>React</span>
                        <span>JavaScript</span>
                        <span>HTML</span>
                        <span>CSS</span>
                        <span>Node.js</span>
                        <span>Git</span>
                        <span>Python</span>
                        <span>FastAPI</span>
                      </div>
                    </div>


                    
                    <div className="result-card">
                      <h2>⚠️ Missing Skills</h2>

                      <div className="tags missing">
                        {analysisData?.details?.missing_important_skills?.map((skill, index) => (

                        
                      <span key={index} >{skill} </span>))}
                      </div>
                    </div>


                    
                    <div className="result-card">
                      <h2>💼 Experience</h2>

                      <h3>{analysisData?.experience ?? 0} years </h3>
                      <p>Total Experience</p>

                      <div className="progress">
                        <div></div>
                      </div>

                      <small>Relevant Experience: 2.0 Years</small>
                    </div>


                    
                    <div className="result-card">
                      <h2>🎓 Education</h2>

                      <h3>B.Tech in Computer Science</h3>

                      <p>
                        Computer Science & Engineering
                      </p>

                      <small>2018 - 2022</small>
                    </div>


                
                    <div className="result-card">
                      <h2>🚀 Projects</h2>

                      <div className="project">
                        <strong>AI Resume Parser</strong>
                        <span>Python · FastAPI</span>
                      </div>

                      <div className="project">
                        <strong>E-Commerce Application</strong>
                        <span>React · Node.js</span>
                      </div>

                      <div className="project">
                        <strong>Portfolio Website</strong>
                        <span>HTML · CSS · JS</span>
                      </div>
                    </div>

                  </div>


                  
                  <div className="recommendation">

                    <div className="recommendation-icon">
                      🧠
                    </div>

                    <div>
                      <h2>AI Recommendation</h2>
                      
                        <p>
  {analysisData?.score >= 80
    ? "This candidate is an excellent match for the role. Their skills and experience strongly align with the job requirements."
    : analysisData?.score >= 60
    ? "This candidate is a good match for the role. Most important requirements are covered, but some areas should be validated during the interview."
    : analysisData?.score >= 40
    ? "This candidate is a moderate match for the role. Several relevant skills are present, but there are important gaps in the job requirements."
    : "This candidate is a weak match for the role. Significant skills or experience are missing compared with the job requirements."}
</p>
                      
                    </div>

                  </div>

                </>

              )}

            </div>

          </div>

        </section>
        </>
        )}
        {activePage === "History" && (
  <div className="page-content">

    <div className="page-header">
      <div>
        <h1>Resume History</h1>
        <p>View your previously analyzed resumes.</p>
      </div>

      <button className="small-button">
        🔍 Search
      </button>
    </div>

    <div className="history-card">

      <div className="history-item">
        <div className="history-icon">📄</div>

        <div className="history-info">
          <h3>Frontend Developer Resume</h3>
          <p>Analyzed recently</p>
        </div>

        <div className="history-score">
          <strong>87%</strong>
          <span>Match</span>
        </div>

        <button className="view-button">
          View
        </button>
      </div>

      <div className="history-item">
        <div className="history-icon">📄</div>

        <div className="history-info">
          <h3>React Developer Resume</h3>
          <p>Analyzed recently</p>
        </div>

        <div className="history-score">
          <strong>78%</strong>
          <span>Match</span>
        </div>

        <button className="view-button">
          View
        </button>
      </div>

      <div className="history-item">
        <div className="history-icon">📄</div>

        <div className="history-info">
          <h3>Software Engineer Resume</h3>
          <p>Analyzed recently</p>
        </div>

        <div className="history-score">
          <strong>72%</strong>
          <span>Match</span>
        </div>

        <button className="view-button">
          View
        </button>
      </div>

    </div>

  </div>
)}

      </main>

    </div>
  );
}

export default App;