const fs = require("fs");
require("dotenv").config();

module.exports = {
  //==========================================- MAIN - CONFIGS -==================================================================
  SESSION_ID: process.env.SESSION_ID || "Adams-2024;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUFpekdmRThtcDBIbnladzMrdmloVjlRd0NxdkRCVFNVWnR5NFFsNTcwQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR2tRQ3RoQldyQUlpakJWbGlscjlYVHI1cXZMZnRiL0hRMnRDQVdiZzkybz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTQkJzOGJUeGpIL1Y5UVZ1WnpuNmpjdFExMk9Eb3U2N1ZNQmtGMEJTVEVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQlhBTjcwc2o3VUJvY2FEclBVRWpHWG9VV2puZzdUKzdYYitiTW0wRnlFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVCNHdOVVVWNExhN3ZlR0doMmNBczlhSElZc0JXWEhiQTVISGdZVEc5blU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFQOUFaL0pWRHZKT1VQQTZhSllCVGdFY2xiQmszcGFpbmc4UEFweWZpQkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUVrVlhxbnNJYTh3cVc0MVpKbHZMVWk5Rm5nU2FobmVRN2FrTkEzaU5XVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWXhhdmdJTUV5Q1N5WjFlUDFNY0wzOEZjc1JLODNkYVJhc3VGZHZHaTJDTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRjQ2FtV3hFYzhGR1pRT3kvQ1o4TWg2Q3h6bWtTM1lCS1R0VzBEcUJZTC9YZW5xci9BdHg4TDY3R3hESGkvcGI1OUhvVWJjVVJWTG1sWnNndkY1cmlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg3LCJhZHZTZWNyZXRLZXkiOiJ1REtlMnlGSWxuTXBJTWdBS2lrK3dMZndsaFM4MWZNUnlHL2RSOGx4TTVZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnOXN2b2J3MFJEbWVLaDkya3FNR0pRIiwicGhvbmVJZCI6IjRiMjI2NDM1LTI4MmYtNDcyOC05Mjk0LWU5MDVjY2M3NjBjMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmOElIdkp0WDJRWno5MnV4dDFhNW9xWHJjM1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiazdVTkNDY2swWkJoanR3ODk0K0dlVndZbUNvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik5IUThORkhLIiwibWUiOnsiaWQiOiI5NDcxNzczMzI3Mzo0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IsmqXG7itJUgXCLhtKIg4bSN4bSHICDhtIvKn+G0oVxuX19fX1xu4bSPXG7Kn1xu4bSFXG5fX19fXG7htItcbsmqXG7JtFxuyaJcbl9fX19cblxuyp9cbuG0j1xu4bSLXG7htJwgXG5fX19fXG5cbuG0gFxuyplcbsmqXG7Kj1xu4bSAXG5cbsqcXG5fXyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2Z3dE9BR0VNeVpzYnNHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUW8xZ2JXblVmUHBlUHhkaGVISXFKRVd1ci9qajB4R29OdURwSXBjNm5FRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoieXhDWFRrTUpUQ21VUTlXaEM0YmtPZlpXWFBIY3htdE5XSE9KMXVDSWhTYVdsS25LbUZ0ZEJVYzhxN09rWHpyZ0JzTlVRQnIzY2pMYjM2eFVWbGI1Q1E9PSIsImRldmljZVNpZ25hdHVyZSI6ImlOalI5LzAvMHIxaDQ0MWlOeElFSGxnenpWWG5hWUdndXp2VlRQVklQNTVNTTRoUzE3dTNRUHcweitMak1ZaEtvNzNNcTd3MlhwOWl6cWZHVXlmaGpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MTc3MzMyNzM6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVS05ZRzFwMUh6NlhqOFhZWGh5S2lSRnJxLzQ0OU1ScURiZzZTS1hPcHhCIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1MTUwODEwfQ==",
  // ADD Your Session Id 
  MONGODB: process.env.MONGODB || "-------------ADD YOUR MONGODB URL-------------",
    // ADD Your MongoDB Database URL
  PREFIX: process.env.PREFIX || ".",
  // Add Your Custom Prefix 
  mode: process.env.mode || "public",
  // Add Your Bot Mode 
  // private = Only Working For Owner Number
  // public = AnyOne Working
  // inbox = Only Working  Inbox
  // groups = only working in group
  OWNER_NUMBER: process.env.OWNER_NUMBER || "94717733273",
  //========================================- OTHER - CONFIGS -=====================================================================
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
  ANTI_BAD_WORDS_ENABLED: process.env.ANTI_BAD_WORDS_ENABLED || "true",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  ANTI_BAD_WORDS: (process.env.ANTI_BAD_WORDS || "pakayo,huththo").split(','),
  ANTI_LINK: process.env.ANTILINK || "true",
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
  AUTO_READ_CMD: process.env.AUTO_READ_CMD || "true",
  ALWAYS_TYPING: process.env.ALWAYS_TYPING || "true",
  ALWAYS_RECORDING: process.env.ALWAYS_RECORDING || "true",
  ANTI_BOT: process.env.ANTI_BOT || "true",
  ANTI_DELETE: process.env.ANTI_DELETE || "true",
  packname: process.env.packname || "Thenux",
  author: process.env.author || "MAC MD",
  //==========================================- API-CONFIGS -==========================================================
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || "2d61a72574c11c4f36173b627f8cb177", //openweathermap.org
  ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY || "sk_6438bcc100d96458f8de0602aec662f4ba14b905fd090ad3", //elevenlabs.io
  SHODAN_API: process.env.SHODAN_API || "cbCkidr6qd7AFVaYs56MuCouGfM8gFki", //developer.shodan.io
  PEXELS_API_KEY: process.env.PEXELS_API_KEY || "39WCzaHAX939xiH22NCddGGvzp7cgbu1VVjeYUaZXyHUaWlL1LFcVFxH", // pexels.com
  OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
  PIXABAY_API_KEY: process.env.PIXABAY_API_KEY || "23378594-7bd620160396da6e8d2ed4d53", // pixabay.com
  ZIPCODEBASE_API_KEY: process.env.ZIPCODEBASE_API_KEY || "0f94a5f0-6ea4-11ef-81da-579be4fb031c", // zipcodebase.com
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "AIzaSyD93IeJsouK51zjKgyHAwBIAlqr-a8mnME", 
  GOOGLE_CX: process.env.GOOGLE_CX || "AIzaSyD93IeJsouK51zjKgyHAwBIAlqr-a8mnME", 
  PASTEBIN_API_KEY: process.env.PASTEBIN_API_KEY || "uh8QvO6vQJGtIug9WvjdTAPx_ZAFJAxn",


//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

  


};
