const Sortarray = require("../sortarray")

describe("new csv file", () => {
  it("should be created", () => {
    const fileJSON = "./test/sortarray.test.json"
    const fileCSV = "./test/sortarray.test.csv"
    Sortarray(fileJSON, fileCSV)
    expect(fs.existsSync(fileCSV)).toBe(true)
  })
})
