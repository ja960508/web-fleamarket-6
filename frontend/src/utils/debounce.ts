function debounce(cb: CallableFunction, delay: number) {
  let debounceTimer: NodeJS.Timer | null = null;

  return function (...args: unknown[]) {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export default debounce;
