
function count(list, filed= []) {

  const _list = [...list];

  const counts = filed.reduce((count, key) => ({ ...count, [key]: {}}), {});

  while (_list.length) {
    const node = _list.pop();

    filed.forEach(key => {

      counts[key][node[key]]
        ? counts[key][node[key]] ++
        : counts[key][node[key]] = 1;
    })
  }

  return counts;
}

export default count;
