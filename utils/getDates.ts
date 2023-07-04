export const getDates = (length: number) => {
    let dates = [];
    let temp;
    let date = new Date();
    for (let i = 0; i < length; i++) {
      date.setDate(date.getDate() - 1);
      temp = date.toLocaleDateString('en-US');
      dates.push(temp);
    }
    dates.reverse();
    return dates;
}