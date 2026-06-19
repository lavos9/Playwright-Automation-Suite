import fs from "fs";
import path from "path";

const CREDENTIALS_FILE = path.join(process.cwd(), "test-credentials.json");

export interface StoredCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const saveCredentials = (credentials: StoredCredentials) => {
  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 2));
  console.log(`✅ Credentials saved: ${credentials.email}`);
};

export const getCredentials = (): StoredCredentials => {
  if (!fs.existsSync(CREDENTIALS_FILE)) {
    throw new Error("Credentials file not found. Run Test Case 1 first!");
  }
  const data = fs.readFileSync(CREDENTIALS_FILE, "utf-8");
  const credentials = JSON.parse(data);
  console.log(`✅ Credentials loaded: ${credentials.email}`);
  return credentials;
};

export const clearCredentials = () => {
  if (fs.existsSync(CREDENTIALS_FILE)) {
    fs.unlinkSync(CREDENTIALS_FILE);
    console.log("✅ Credentials cleared");
  }
};
