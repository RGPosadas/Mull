export const geolocationStub = {
  onBeforeLoad(win) {
    const latitude = 45.494822;
    const longitude = -73.578121;
    cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
      return cb({ coords: { latitude, longitude } });
    });
  },
};
