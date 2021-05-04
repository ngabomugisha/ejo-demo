import React from 'react'
import './Slide4.css'

function Slide4() {
    return (
        <div className="slide4-container">
            <h3>Answer Format</h3>
            <div className='radio-groups'>
                <form>
                    <div className='radio-group'>
                        <fieldset id="group1">
                            <div className='option'><label>Multiple Choice</label><input type="radio" value="Multiple Choice" name="group1" /></div>
                            <div className='option'><label>True/False</label><input type="radio" value="True/False" name="group1" /></div>
                            <div className='option'><label>Matching</label><input type="radio" value="Matching" name="group1" /></div>
                            <div className='option'><label>Fill in the Blank</label><input type="radio" value="Fill in the Blank" name="group1" /></div>
                            <div className='option'><label>Short Answer</label><input type="radio" value="Short Answer" name="group1" /></div>
                            <div className='option'><label>Long Answer</label><input type="radio" value="Long Answer" name="group1" /></div>
                        </fieldset>
                    </div>
                </form>
            </div>
            <div className='option'><label>Allow Hints on Question</label><input type="radio" value="Evaluating" name="group1" /></div>

            <h3>Answer Format</h3>
            <div className='radio-groups'>
                <form>
                    <div className='radio-group'>
                        <fieldset id="group1">
                            <div className='option'><label>Manual</label><input type="radio" value="Manual" name="group1" /></div>
                            <div className='option'><label>Automaticse</label><input type="radio" value="Automatic" name="group1" /></div>
                           </fieldset>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Slide4
