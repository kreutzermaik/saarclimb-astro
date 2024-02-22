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

}