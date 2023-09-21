// pdf-worker.js
// This file contains the code to generate the PDF using Puppeteer in a Web Worker.

import puppeteer from 'puppeteer-core';

self.addEventListener('message', async (event) => {
  const playerData = event.data;

  const browser = await puppeteer.launch({ executablePath: 'chrome' });
  const page = await browser.newPage();

  // Construct the table content
  let tableRows = '';
  playerData.forEach((player, index) => {
    tableRows += `
      <tr>
        <td>${index + 1}</td>
        <td>${player.username}</td>
        <td>${player.gamename}</td>
        <td>${player.status}</td>
        <td>${player.totalscore}</td>
      </tr>
    `;
  });

  const tableContent = `
    <h1>Leaderboard Report</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Game Name</th>
          <th>Status</th>
          <th>Total Score</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  const content = `<html><body>${tableContent}</body></html>`;

  await page.setContent(content);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  self.postMessage(pdfBuffer);
});
