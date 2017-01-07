import { Ps2RtmapDevLatestPage } from './app.po';

describe('ps2-rtmap-dev-latest App', function() {
  let page: Ps2RtmapDevLatestPage;

  beforeEach(() => {
    page = new Ps2RtmapDevLatestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
