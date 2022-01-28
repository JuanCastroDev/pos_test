export const validatorDay = (textDays: string): boolean => {
  const nowDay: number = new Date().getDay();
  const days: number[] = textDays.split(',').map(num => Number(num))
  const turn: number | undefined = days.find(day => day == nowDay);
  if (!turn) return false;
  return true;
}

export const validatorHours = (start_turn: string, end_turn: string): boolean => {
  const datetime: Date = new Date();
  const now: number[] = [datetime.getHours(), datetime.getMinutes()];
  const start: number[] = start_turn.split(':').map(num => Number(num))
  const end: number[] = end_turn.split(':').map(num => Number(num))
  if (!(now[0] >= start[0] && now[0] <= end[0])) {
    return false;
  }
  if (now[0] == start[0]) {
    if (now[1] <= start[1]) {
      return false;
    }
  }
  if (now[0] == end[0]) {
    if (now[1] >= end[1]) {
      return false;
    }
  }
  return true;
}