import database from '../firebase/firebase'

export const firebaseLoad = (fixturesData, done) => {
  const data = {};
  fixturesData.fixtures.forEach((fixture) => {
    const uid = fixture.uid
    const fixtureWithoutId = {...fixture}
    delete fixtureWithoutId.uid
    data[uid] = {
      ...fixtureWithoutId
    }
  })
  database.ref(fixturesData.firebaseRef).set(data).then(() => done()).catch(e => console.log(e))
  return fixturesData.fixtures
}
