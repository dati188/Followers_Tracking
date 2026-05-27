# Privacy-First Instagram Connection Analyzer

A secure, "bring-your-own-data" application that analyzes Instagram follower and following relationships without requiring account credentials, scraping, or live API tracking. Users retain full ownership of their data by manually exporting their official Instagram data packages and uploading them to the platform.

## 👁️ Core Philosophy: Transparency & Control

* **No Credentials:** The application never asks for or stores Instagram passwords or session tokens.
* **Zero Tracking:** The app does not connect to Meta's servers or monitor accounts in real-time.
* **Plain-Text Snapshots:** Usernames are stored directly as plain text arrays. This approach eliminates cryptographic complexity, drastically improves performance, and enables the application to display exact names for account changes (e.g., listing specific unfollowers).

---

## 🔄 How It Works

1.  **Export:** The user requests their data download in **JSON** format via the Instagram/Meta Accounts Center.
2.  **Upload:** The user uploads the resulting `.zip` file into the application.
3.  **Process:** The backend unzips the archive in memory, extracts the raw arrays from `followers_1.json` and `following.json`, and records them.
4.  **Compare:** The app runs instant set-difference operations between the newly uploaded snapshot and the previous database entry to isolate relationship deltas.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React / Next.js (or Flutter/React Native for mobile deployment)
* **Backend:** Python (FastAPI / Flask) or Node.js
* **Database:** PostgreSQL (utilizing native `TEXT[]` array columns)
* **Data Processing:** Native zip file systems and JSON parsers

---

## 📁 Repository Structure

```text
├── backend/
│   ├── app/
│   │   ├── main.py              # Application entrypoint
│   │   ├── parser.py            # ZIP extractor & JSON collection loader
│   │   └── models.py            # Database schemas (Snapshots table)
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── OnboardingWizard.jsx  # Step-by-step export instructions
│   │   │   └── FileUploader.jsx      # ZIP file drag-and-drop target
│   │   └── pages/
│   │       └── Dashboard.jsx         # Insights display (lists of names)
└── README.md
