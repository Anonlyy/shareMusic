import { ShareMusicPage } from './app.po';

describe('share-music App', () => {
  let page: ShareMusicPage;

  beforeEach(() => {
    page = new ShareMusicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
