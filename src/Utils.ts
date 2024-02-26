export default class Utils {

    static getDateByDayString(day: string) {
        const today = new Date();
        const dayIndex = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'].indexOf(day);
        const difference = dayIndex - today.getDay() + 1;
        today.setDate(today.getDate() + difference);
        return today;
    }

    static formatDate(date: Date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    static formatDateToShortString(date: string) {
        let newDate = new Date(date);
        return newDate.toLocaleDateString('de-DE', { year: 'numeric', month: 'short', day: '2-digit' });
    }

    /**
     * get sorted array by date string
     * descending order
     * @param array
     */
    static sortDates(array: any[] | null) {
        return array?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    static navigateByUrl(url: string) {
        if (window) window.location.href = url;
    }
}