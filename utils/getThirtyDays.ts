export const getThirtyDays = () => {
    // includes today's date
    let thirtyDays = [];
    let temp;
    let date = new Date();
    for (let i = 0; i < 30; i++) {
      date.setDate(date.getDate() - 1);
      temp = date.toLocaleDateString('en-US');
      thirtyDays.push(temp);
    }
    thirtyDays.reverse();
    return thirtyDays;
}