/* eslint-disable no-undef */
const streamDays = [4, 5, 6];
const date = new Date();
const CurrentDay = date.getDay();
function createAlarm() {
  const itsDay = streamDays.find((day) => day === CurrentDay);
  const timestamp = +new Date(date.getFullYear(), date.getMonth(), date.getDay(), 18, 20, 0, 0);
  console.log(timestamp);
  chrome.alarms.create('Stream', {
    when: timestamp,
  });
  // // Create
}
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'Stream') {
    console.log('its time');
  }
});
createAlarm();
