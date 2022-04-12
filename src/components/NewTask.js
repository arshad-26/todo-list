import React, { useState, useEffect, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import DatePicker from "react-datepicker"

// Others
import { TaskValidation, DatetimeValidation } from "../others/Validations"

// Styles
import "./NewTask.css"
import "react-datepicker/dist/react-datepicker.css"

const NewTask = ({setDisplayModal}) => {
    const [selectedDate, setSelectedDate] = useState()
    const [taskErrors, setTaskErrors] = useState({})

    const didMount = useRef(false)  // To prevent useEffect from calling in intial render
    const taskRef = useRef()

    const handleSubmit = (e) => {
        const dateTime = document.getElementById("datetime").value
        const task = taskRef.current.value

        const taskErrorsObj = {}

        const [datetimeIsValid, datetimeErrorMsg] = DatetimeValidation(dateTime)
        const [taskIsValid, taskErrorMsg] = TaskValidation(task)

        if(!datetimeIsValid){
            taskErrorsObj.datetime = datetimeErrorMsg
            e.preventDefault()
        }

        if(!taskIsValid){
            taskErrorsObj.task = taskErrorMsg
            e.preventDefault()
        }

        if(Object.keys(taskErrorsObj).length)
            setTaskErrors(taskErrorsObj)
    }

    const taskChange = () => {
        const task = taskRef.current.value

        const [taskIsValid, taskErrorMsg] = TaskValidation(task)

        if(!taskIsValid){
            setTaskErrors({ ...taskErrors, task : taskErrorMsg })
        }
        else{
            // delete taskErrors.task      Can somebody help why this doesn't work but the below one does
            // setTaskErrors(taskErrors)

            const { task, ...restOfErrors } = taskErrors
            setTaskErrors(restOfErrors)
        }
    }

    useEffect(() => {
        if(!didMount.current){
            didMount.current = true
        }
        else{
            const dateTime = document.getElementById("datetime").value
            const [datetimeIsvalid, datetimeErrorMsg] = DatetimeValidation(dateTime)

            if(!datetimeIsvalid){
                setTaskErrors({ ...taskErrors, datetime : datetimeErrorMsg })
            }
            else{
                // delete taskErrors.datetime
                // setTaskErrors(taskErrors)

                const { datetime, ...restOfErrors } = taskErrors
                setTaskErrors(restOfErrors)
            }
        }
    }, [selectedDate])

    return (
        <section className="NewTask-modal">
            <div className="NewTask-popup">
                <div className="NewTask-popupHeader">
                    <h3>New Task</h3>
                    <AiOutlineClose size="1.5em" className="NewTask-closebtn" onClick={() => setDisplayModal(false)} />
                </div>
                <div className="NewTask-popupBody">
                    {
                        Object.keys(taskErrors).length !== 0 && (
                            <ul className="NewTask-validationMsg">
                                {
                                    Object.values(taskErrors).map((error, index) => <li key={index}>{error}</li>)
                                }
                            </ul>
                        )
                    }
                    <form method="POST" action="/" onSubmit={handleSubmit}>
                        <div className="NewTask-formContainer">
                            <div className="NewTask-inputContainer">
                                <label htmlFor="datetime">Date and Time:</label>
                                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="NewTask-input"
                                 name="datetime" id="datetime" dateFormat="dd/MM/yyyy HH:mm" timeFormat="HH:mm" minDate={new Date()} showTimeSelect />
                            </div>
                            <div className="NewTask-inputContainer">
                                <label htmlFor="task">Task:</label>
                                <textarea className="txtArea" name="task" id="task" ref={taskRef} onChange={taskChange}></textarea>
                            </div>
                        </div>
                        <button type="submit" className="NewTask-submitBtn">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewTask