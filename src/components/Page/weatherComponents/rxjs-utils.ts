import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs'

const subject = new Subject<string>();
const subscription = subject.pipe(
    debounceTime(800),
    distinctUntilChanged()
)

export {subject, subscription}