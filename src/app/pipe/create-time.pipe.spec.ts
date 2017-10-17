import { CreateTimePipe } from './create-time.pipe';

describe('CreateTimePipe', () => {
  it('create an instance', () => {
    const pipe = new CreateTimePipe();
    expect(pipe).toBeTruthy();
  });
});
