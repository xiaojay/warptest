import {WarpFactory, SourceType} from 'warp-contracts';
import path from 'path';
import * as fs from 'fs';
const contractId = 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw';
const warp = WarpFactory.forMainnet()

const c = warp.contract(contractId).setEvaluationOptions({
 internalWrites: true,
 allowBigInt: true,
 unsafeClient: "skip",
 sourceType: SourceType.BOTH,
 whitelistSources: [
    // https://docs.google.com/spreadsheets/d/1F9T1Vyk3geEsrU8wVSdsPj9drO48Ae9f2UpkuE0ralI/edit#gid=0
    "Of9pi--Gj7hCTawhgxOwbuWnFI1h24TTgO5pw8ENJNQ", // Atomic Asset
    "W78KEzU8vIODFHzwa9ab7SS7Pjchc7KenivCiwSHxBY", // STAMP
    "kP1Ed8AMvaaBrEFjatP4pSmiE_fsRrGS0EcBMQYYiyc", // STAMP-evolve
    "mGxosQexdvrvzYCshzBvj18Xh1QmZX16qFJBuh4qobo", // U
    "7qv5x9A0NgAlTdMnBc1H2HFvN-te0kzzuT9RNt_66g8", // UCM contract old
    "eIAyBgHH-H7Qzw9fj7Austj30QKPQn27eaakvpOUSR8", // Facts
    "Of9pi--Gj7hCTawhgxOwbuWnFI1h24TTgO5pw8ENJNQ", // Pages
    "ovWCp0xKuHtq-bADXbtiNr6umwb_AE73kVZWtfHlX3w", // VouchDAO
    "1hDZBRSptTNgnACuO9qGHLbaOfnAcMBKCHcHPRhMWUY", // VouchDAO-evolve
    "LBcYEl2zwKDApj1Cow1_BYyiicxVV7OCZTexsjk6mB4", // UCM contract new
    "dRTFmLwJ3cNqdNvFK4yUvwc13CrJtFOmLymLxL4HWOE", // UCM contract evolve
    "yXPm9-9VyxH9otGf7xim0EJsnt21IJN8qJjanFTC_kc", // UCM contract evolve
    // "37n5Z9NZUUPuXPdbbjXa2iYb9Wl39nAjkaSoz5DsxZQ", // FAIR - needs fixes and audit
  ]
});

async function getState() {
  try {
    const { sortKey, cachedValue } = await c.readState();
    saveResultsToFile(cachedValue.state, cachedValue.validity, contractId);

    console.log(sortKey, cachedValue.errorMessages, cachedValue.state, cachedValue.validity)
  } catch (error) {
    console.log('readState error:', error, 'contractId:', contractId);
  }
}

function saveResultsToFile(state: unknown, validity: Record<string, boolean>, txId: string) {
  const resultFolderPath = path.join(__dirname, 'result');
  if (!fs.existsSync(resultFolderPath)) {
    console.log('Creating result folder');
    fs.mkdirSync(resultFolderPath);
  }
  //save state
  const statePath = path.join(resultFolderPath, `${txId}_state.json`);
  saveToFile(state, statePath);
  // save validity
  const validityPath = path.join(resultFolderPath, `${txId}_validity.json`);
  saveToFile(validity, validityPath);
}

function saveToFile(data: unknown, path: string) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

getState()