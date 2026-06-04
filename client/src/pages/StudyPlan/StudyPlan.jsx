import './studyPlan.css';
import { jsPDF } from 'jspdf';

// ─────────────────────────────────────────────
// Small helper: renders the plan content once.
// Used by BOTH the on-screen view AND the PDF div.
// ─────────────────────────────────────────────
function PlanContent({ studyPlan }) {
  return (
    <>
      <div className="heading-txt">{studyPlan.title}</div>
      <div className="heading-subtxt">Generated on {studyPlan.generatedOn}</div>

      {Object.keys(studyPlan.weeklyPlan).map((weekNum) => (
        <div key={weekNum}>

          <div className="week-heading">Week {weekNum}</div>

          {studyPlan.weeklyPlan[weekNum].map((dayPlan, dayIndex) => (
            <div className="days-box" key={dayIndex}>

              {/* Day header: name + break badge */}
              <div className="days-section-heading">
                <div className="day-title">
                  <div>{dayPlan.day}</div>
                  <div className="grey">{dayPlan.date}</div>
                </div>
                <div className="time-title">{dayPlan.break}</div>
              </div>

              {/* Subject rows */}
              {dayPlan.subjects.map((subject, subIndex) => (
                <div className="subject-section" key={subIndex}>
                  <div className="subject">
                    <div>{subject.name}</div>
                    <div className="subject-info">{subject.topic}</div>
                  </div>
                  <div className="subject-time">{subject.duration}</div>
                </div>
              ))}

            </div>
          ))}

        </div>
      ))}
    </>
  );
}

export default function StudyPlan({ studyPlan, setView }) {

  // Show a simple message while data loads
  if (!studyPlan) {
    return <div>Study Plan is Loading...</div>;
  }

  // Download the hidden PDF div as a PDF file
  async function download(name) {
    const pdf    = new jsPDF("p", "mm", "a4");
    const pdfDiv = document.getElementById("pdf");

    // Make the hidden div briefly visible so jsPDF can read it
    pdfDiv.style.visibility = "visible";
    pdfDiv.style.zIndex     = "9999";

    // Small delay so the browser paints it before we capture
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      await pdf.html(pdfDiv, {
        x: 10,
        y: 10,
        width: 190,
        windowWidth: 794,
        autoPaging: "overflow",
      });
      pdf.save(`${name}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      // Hide the div again after saving
      pdfDiv.style.visibility = "hidden";
      pdfDiv.style.zIndex     = "-1";
    }
  }

  return (
    <div>
      {/* Dark overlay behind the modal */}
      <div className="blur-background"></div>

      {/* ── On-screen modal ── */}
      <div className="study-plan-box">
        <div className="study-plan-view">

          {/* Buttons at the top */}
          <div className="buttons-block">
            <button type="button" onClick={() => download(studyPlan.title)}>
              Download PDF
            </button>
            <button type="button" onClick={() => setView(false)}>
              Close
            </button>
          </div>

          {/* Plan content (title, weeks, days) */}
          <PlanContent studyPlan={studyPlan} />

        </div>
      </div>

      {/* ── Hidden PDF div (invisible, only used during download) ── */}
      <div className="study-plan-pdf" id="pdf">
        <PlanContent studyPlan={studyPlan} />
      </div>
    </div>
  );
}