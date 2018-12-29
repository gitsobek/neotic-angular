import { Observable } from "rxjs";

export function createHttpObservable(url: string) {
  const controller = new AbortController();
  const signal = controller.signal;
  return Observable.create(observer => {
    fetch(url, {signal})
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          observer.error('Request failed with code: ' + res.status);
        }
      })
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });

      return () => controller.abort;
  });
}
