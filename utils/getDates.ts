export const getDates = (start: Date, end: Date) => {
    let dates = [];
    let temp;
    let date = new Date(start);
    const timeDiff = end.getTime() - start.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    dates.push(date.toLocaleDateString('en-US'));
    for (let i = 0; i < dayDiff; i++) {
      date.setDate(date.getDate()+1);
      temp = date.toLocaleDateString('en-US');
      dates.push(temp);
    }
    return dates;
}