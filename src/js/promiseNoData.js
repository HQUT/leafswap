
export function promiseNoData(promise, data, error) {
  if (!promise && !error) {
    return;
  } else if (promise && !data && !error) {
    return <img src="https://brfenergi.se/iprog/loading.gif"></img>;
  } else if (promise && !data && error) {
    return <span> Error </span>;
  }
}
