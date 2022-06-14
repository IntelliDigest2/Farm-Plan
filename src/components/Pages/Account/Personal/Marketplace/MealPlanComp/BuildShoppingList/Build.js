export default function buildShoppingList(value) {
  const startDay = value.clone().startOf("week").add(7, "days");
  const endDay = value.clone().endOf("week").add(7, "days");
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];

  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  return calendar;
}
