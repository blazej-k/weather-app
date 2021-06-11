const useDateValidation = (date: Date, format: 'hourly' | 'daily') => {
    if(format === 'daily'){
        const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
        const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
        return `${day}/${month}`
    }
    else{
        const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
        const minutes = date.getMinutes() > 9 ? date.getMinutes() + 1 : `0${date.getMinutes()}`
        return `${hour}:${minutes}`
    }
}

export default useDateValidation