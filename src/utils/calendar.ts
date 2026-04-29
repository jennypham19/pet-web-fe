import { CalendarDay } from "@/types/date";

export const generateCalendar = (month: number, year: number): CalendarDay[] => {
    const result: CalendarDay[] = [];

    // Tháng hiện tại
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0).getDate();
    
    // getDay(): CN = 0 -> convert thành thứ 2 = 1 ... CN = 7
    let startWeekday = firstDay.getDay(); // CN = 0
    startWeekday = startWeekday === 0 ? 7 : startWeekday // convert Monday start

    // Previous month - ngày tháng trước
    const prevLastDay = new Date(year, month - 1, 0).getDate();

    for (let i = startWeekday - 1; i > 0; i--){
        result.push({
            day: prevLastDay - i + 1,
            currentMonth: false,
            month: month - 1
        })
    }

    // Current month - ngày tháng hiện tại
    for(let i = 1; i <= lastDay; i++) {
        result.push({
            day: i,
            currentMonth: true,
            month: month
        })
    }
    
    // Next month - ngày tháng sau
    let nextDay = 1;
    while (result.length < 42) {
        // luôn đủ 6 hàng
        result.push({
            day: nextDay,
            currentMonth: false,
            month: month + 1
        });

        nextDay ++ ;
    }
    return result;
}

export const selectedDate = (year: number, month: number, day: number, currentMonth: boolean): any => {
    let cellDate: Date;

    // ===== xác định đúng tháng của ô =====
    if (currentMonth) {
        // tháng hiện tại
        cellDate = new Date(year, month - 1, day);
    } else {
        // ngày tháng trước (thường 25 -> 31)
        if (day > 20) {
            cellDate = new Date(year, month - 2, day);
        } 
        // ngày tháng sau (1 -> 14)
        else {
            cellDate = new Date(year, month, day);
        }
    }
    return cellDate;
}