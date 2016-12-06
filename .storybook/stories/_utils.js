export function randomGroups(count) {
  const groups = [];
  let total = 0;
  for (let i=0; i<count; ++i) {
    const value = Math.random();
    total += value;
    groups[i] = { label: 'group-'+(i+1), value };
  }
  groups.forEach(g => {
    g.value = Math.floor(100 * g.value / total);
  });
  const newTotal = groups.reduce((t, g) => t + g.value, 0);
  groups[0].value += 100 - newTotal;
  return groups;
}

export function randomSeries(count, positive) {
  const values = [];
  for (let i=0; i<count; ++i) {
    const prev = i > 0 ? values[i-1].y : 0;
    const delta = Math.random() - 0.5;
    const value = positive ? Math.abs(prev + delta) : prev + delta;
    values[i] = {x: i , y: value};
  }
  return values;
}

export function randomTimeseries(count, positive) {
  const start = Date.now();
  const values = [];
  for (let i=0; i<count; ++i) {
    const prev = i > 0 ? values[i-1].y : 0;
    const delta = Math.random() - 0.5;
    const value = positive ? Math.abs(prev + delta) : prev + delta;
    values[i] = {x: new Date(start + i * 60000) , y: value};
  }
  return values;
}
