#!/usr/bin/env node

const fs = require("fs")
const dayjs = require("dayjs")
const { parse } = require("json2csv")

const [fileJSON, fileCSV] = process.argv.slice(2)

const json = fs.readFileSync(fileJSON, "utf8")
const parsed = JSON.parse(json)

const newData = parsed.map(item => {
  let watchlistName = `.${item.symbol}${dayjs(item.expiry).format("YY")}${
    item.expiryString.split("/")[0]
  }${item.expiryString.split("/")[1]}${item.optionType}${item.strike}`

  return {
    Time: item.timeString,
    Date: item.dateString,
    Symbol: item.symbol,
    Expiry: item.expiryString,
    Strike: item.strike,
    OTM: item.outOfMoney,
    Type: item.optionType === "C" ? "Call" : "Put",
    Spot: Math.round(item.spot * 100) / 100,
    Size: item.size,
    Price: Math.round(item.price * 100) / 100,
    Side: item.side === 3 ? "Above Ask" : item.side === 2 ? "Ask" : "Near Ask",
    IVol: Math.round(item.ivol * 1000) / 1000,
    Premium: item.premiumString,
    OrderType: item.type,
    Volume: item.volume,
    OI: item.oi,
    Section: item.section,
    Unusual: item.unusual,
    HighlyUnusual: item.highlyUnusual,
    WatchlistName: watchlistName,
  }
})

try {
  const csv = parse(newData)
  fs.writeFileSync(fileCSV, csv)
} catch (err) {
  console.error(err)
}
