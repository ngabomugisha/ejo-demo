import React from 'react'
import { connect } from 'react-redux'
import './style.css'
import { Accordion, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const index = (props) => {
    return (
        <div className="plan-container">
            <div className="titl">
                <h1>Syllabus</h1>
                <div className='titl2'><h4>1. Topic Area:</h4><h5>Trigonometry</h5></div>
                <div className='titl2'><h4>2. Sub Topic Area:</h4><h5>Sed ut perspiciatis undeomnis iste natus error sit voluptatem</h5></div>
                <div className='titl2'><h4>3. Unit:</h4><h5>Sed ut perspiciatis unde omnis iste</h5></div>
                <div className='titl2'><h4>4. Unit Competency:</h4><h5>Key Unit Competency: Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,</h5></div>
            </div>
            <div className="titl">
                <h1>Instructional Objective</h1>
            </div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        1.Syllabus Unit Content
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div className="in-card-title"><h4>Knowledge:</h4><h5>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                            <div className="in-card-title"><h4>Attitude:</h4><h5> Sed ut perspiciatis </h5></div>
                            <div className="in-card-title"><h4>Skills:</h4><h5> Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        2.Expecting student action(s)/standard & Criteria Performance
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>

                            <div className="in-card-title"><h4>Knowledge:</h4><h5>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                            <div className="in-card-title"><h4>Attitude:</h4><h5> Sed ut perspiciatis </h5></div>
                            <div className="in-card-title"><h4>Skills:</h4><h5> Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        3.Instructional Material & References
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <div className="in-card-title"><h4>Knowledge:</h4><h5>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                            <div className="in-card-title"><h4>Attitude:</h4><h5> Sed ut perspiciatis </h5></div>
                            <div className="in-card-title"><h4>Skills:</h4><h5> Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <div className="titl">
                <h1>Teaching Activity</h1>
            </div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Introduction: 10 min
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div className="in-card-title"><h4>Content Focus:</h4><h5> Live Lecturing Assigned Reading/Text </h5></div>
                            <div className="in-card-title"><h4>Interactivity Focus:</h4><h5> Sed ut perspiciatis </h5></div>
                            <div className="in-card-title"><h4>Critical Thinking: Production: Problem Solving: Reflection:</h4><h5></h5></div>
                       </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    Development: 20 min
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            Conclusion: 10 min
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
            </Accordion>
                <div className="titl">
                    <h1>Learning Activities</h1>
                </div>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Introduction: 10 min
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body> </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Development: 20 min
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div className="in-card-title"><h4>Knowledge:</h4><h5>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo Attitude: Sed ut perspiciatis Skills: Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            Conclusion: 10 min
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
        </div>
    )
}

const mapStateToProps = (state) => ({

            })

const mapDispatchToProps = {

            }

export default connect(mapStateToProps, mapDispatchToProps)(index)
