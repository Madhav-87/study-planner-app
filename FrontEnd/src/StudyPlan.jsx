import './studyPlan.css';
import { jsPDF } from 'jspdf';
export default function StudyPlan({ studyPlan ,setView}) {
    if (!studyPlan) {
        return (<div>
            Study Plan is Loading...
        </div>)
    }

    async function download(name) {
        const pdf = new jsPDF("p", "mm", "a4");

        const PDFREF = document.getElementById('pdf');
        PDFREF.style.visibility = 'visible';
        PDFREF.style.position = 'fixed';
        PDFREF.style.left = '0';
        PDFREF.style.top = '0';
        PDFREF.style.zIndex = '9999';
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            await pdf.html(PDFREF, {
                x: 10,
                y: 10,
                width: 190,
                windowWidth: 794,
                autoPaging: "text",
            });

            pdf.save(`${name}.pdf`);
        } catch (error) {
            console.error("PDF generation error:", error);
        } finally {
            // Hide it again
            PDFREF.style.visibility = 'hidden';
            PDFREF.style.zIndex = '-1';
        }
    }
    return (
        <div>
            <div className='blur-background'></div>
            <div className='study-plan-box'>
                <div className='study-plan-view'>
                    <div className='heading-txt'>{studyPlan.title}</div>
                    <div className="buttons-block">
                        <button type="button" onClick={() => { download(studyPlan.title) }}>Download</button>
                        <button type="button" onClick={()=>{setView(false)}}>Close</button>
                    </div>
                    <div className='heading-subtxt'>Generated on {studyPlan.generatedOn}</div>
                    {
                        Object.keys(studyPlan["weeklyPlan"]).map((weekNum) => {
                            return (
                                <div key={weekNum}>
                                    <div className='week-heading'>Week {weekNum}</div>
                                    {
                                        studyPlan.weeklyPlan[weekNum].map((dayPlan, indx) => {
                                            return (
                                                <div key={indx}>
                                                    <div className='days-section'>
                                                        <div className='days-box '>
                                                            <div className='days-section-heading'>
                                                                <div className='day-title'>
                                                                    <div>{dayPlan.day}</div>
                                                                    <div className='grey'>{dayPlan.date}</div>
                                                                </div>
                                                                <div className='time-title'>
                                                                    {dayPlan.break}
                                                                </div>
                                                            </div>

                                                            {
                                                                dayPlan.subjects.map((subject, subIndx) => {
                                                                    return (
                                                                        <div key={subIndx}>
                                                                            <div className='subject-section'>
                                                                                <div className='subject'>
                                                                                    <div>
                                                                                        {subject.name}
                                                                                    </div>
                                                                                    <div className='subject-info'>{subject.topic}</div>
                                                                                </div>
                                                                                <div className='subject-time'> {subject.duration}</div>

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div><div >
                <div className='study-plan-pdf' id="pdf">
                    <div className='heading-txt'>{studyPlan.title}</div>
                    <div className='heading-subtxt'>Generated on {studyPlan.generatedOn}</div>
                    {
                        Object.keys(studyPlan["weeklyPlan"]).map((weekNum) => {
                            return (
                                <div key={weekNum}>
                                    <div className='week-heading'>Week {weekNum}</div>
                                    {
                                        studyPlan.weeklyPlan[weekNum].map((dayPlan, indx) => {
                                            return (
                                                <div key={indx}>
                                                    <div className='days-section'>
                                                        <div className='days-box '>
                                                            <div className='days-section-heading'>
                                                                <div className='day-title'>
                                                                    <div>{dayPlan.day}</div>
                                                                    <div className='grey'>{dayPlan.date}</div>
                                                                </div>
                                                                <div className='time-title'>
                                                                    {dayPlan.break}
                                                                </div>
                                                            </div>

                                                            {
                                                                dayPlan.subjects.map((subject, subIndx) => {
                                                                    return (
                                                                        <div key={subIndx}>
                                                                            <div className='subject-section'>
                                                                                <div className='subject'>
                                                                                    <div>
                                                                                        {subject.name}
                                                                                    </div>
                                                                                    <div className='subject-info'>{subject.topic}</div>
                                                                                </div>
                                                                                <div className='subject-time'> {subject.duration}</div>

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
