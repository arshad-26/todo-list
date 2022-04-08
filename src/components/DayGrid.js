import React from "react"

// Others
import GLOBAL from "../GlobalVar"

// Styles
import "./DayGrid.css"

const DAYS_OF_WEEK = GLOBAL.DAYS_OF_WEEK

const isTodayDate = (sampleDate) => {
    const todayDate = new Date()

    return sampleDate.getDate() === todayDate.getDate() 
    && sampleDate.getMonth() === todayDate.getMonth()
    && sampleDate.getFullYear() === todayDate.getFullYear()
}

const DayGrid = ({ grid }) => {
    return (
        <>
            <div className="DayGrid-dayList">
                {
                    DAYS_OF_WEEK.map((day, index) => <p key={index} className="DayGrid-dayName">{day}</p>)
                }
            </div>
            <div className="DayGrid-dateList">
                {
                    grid.map((block, index) => {
                        const { date, isCurrentMonth } = block

                        if(isCurrentMonth){
                            return <a href="#" key={index} 
                                className={`DayGrid-date CurrentMonth ${isTodayDate(date) && "CurrentDay"}`}>{date.getDate()}</a>
                        }
                        else{
                            return <p key={index} className="DayGrid-date">{date.getDate()}</p>
                        }
                    })
                }
            </div>
        </>
    )
}

export default DayGrid